import { useState, useEffect } from "react";
import { Check, ChevronsUpDown, School, Plus, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SchoolOption {
  id: string;
  name: string;
  type: "registered" | "pending";
}

interface AssignSchoolDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mentorId: string;
  mentorName: string;
  corporateId: string;
  currentSchoolName?: string | null;
  currentPendingSchoolName?: string | null;
  onAssigned: () => void;
}

export function AssignSchoolDialog({
  open,
  onOpenChange,
  mentorId,
  mentorName,
  corporateId,
  currentSchoolName,
  currentPendingSchoolName,
  onAssigned,
}: AssignSchoolDialogProps) {
  const { toast } = useToast();
  const [schools, setSchools] = useState<SchoolOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [comboboxOpen, setComboboxOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedSchool, setSelectedSchool] = useState<SchoolOption | null>(null);
  
  // For creating new pending school with invite
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [newSchoolName, setNewSchoolName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [isSendingInvite, setIsSendingInvite] = useState(false);

  useEffect(() => {
    if (open) {
      fetchSchools();
      setSelectedSchool(null);
      setShowInviteForm(false);
      setNewSchoolName("");
      setInviteEmail("");
    }
  }, [open, corporateId]);

  const fetchSchools = async () => {
    setIsLoading(true);
    try {
      // Fetch registered schools for this corporate
      const { data: registeredSchools } = await supabase
        .from("school_profiles")
        .select("id, school_name")
        .eq("corporate_id", corporateId);

      // Fetch pending schools for this corporate
      const { data: pendingSchools } = await supabase
        .from("pending_schools")
        .select("id, school_name")
        .eq("corporate_id", corporateId);

      const allSchools: SchoolOption[] = [
        ...(registeredSchools || []).map((s) => ({
          id: s.id,
          name: s.school_name,
          type: "registered" as const,
        })),
        ...(pendingSchools || []).map((s) => ({
          id: s.id,
          name: s.school_name,
          type: "pending" as const,
        })),
      ];

      // Sort: registered first, then alphabetically
      allSchools.sort((a, b) => {
        if (a.type !== b.type) return a.type === "registered" ? -1 : 1;
        return a.name.localeCompare(b.name);
      });

      setSchools(allSchools);
    } catch (error) {
      console.error("Error fetching schools:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSchool = (school: SchoolOption) => {
    setSelectedSchool(school);
    setComboboxOpen(false);
  };

  const handleAddNewSchool = () => {
    setNewSchoolName(searchValue.trim());
    setShowInviteForm(true);
    setComboboxOpen(false);
  };

  const handleAssignSchool = async () => {
    if (!selectedSchool) return;

    setIsSaving(true);
    try {
      const updateData: Record<string, string | null> = {
        school_id: null,
        pending_school_id: null,
      };

      if (selectedSchool.type === "registered") {
        updateData.school_id = selectedSchool.id;
      } else {
        updateData.pending_school_id = selectedSchool.id;
      }

      const { error } = await supabase
        .from("mentor_profiles")
        .update(updateData)
        .eq("id", mentorId);

      if (error) throw error;

      toast({
        title: "School Assigned",
        description: `${mentorName} has been linked to ${selectedSchool.name}`,
      });

      onAssigned();
      onOpenChange(false);
    } catch (error) {
      console.error("Error assigning school:", error);
      toast({
        title: "Error",
        description: "Failed to assign school. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateAndInvite = async () => {
    if (!newSchoolName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a school name",
        variant: "destructive",
      });
      return;
    }

    setIsSendingInvite(true);
    try {
      // 1. Add to school directory
      await supabase
        .from("school_directory")
        .upsert({ school_name: newSchoolName.trim() }, { onConflict: "school_name" });

      // 2. Create pending school
      const { data: newPending, error: pendingError } = await supabase
        .from("pending_schools")
        .insert({
          school_name: newSchoolName.trim(),
          corporate_id: corporateId,
          invited_email: inviteEmail.trim() || null,
          invited_at: inviteEmail.trim() ? new Date().toISOString() : null,
        })
        .select("id")
        .single();

      if (pendingError) throw pendingError;

      // 3. Link mentor to the new pending school
      const { error: updateError } = await supabase
        .from("mentor_profiles")
        .update({
          school_id: null,
          pending_school_id: newPending.id,
        })
        .eq("id", mentorId);

      if (updateError) throw updateError;

      // 4. Send invite email if provided
      if (inviteEmail.trim()) {
        const inviteLink = `${window.location.origin}/school-signup?corporate=${corporateId}`;
        await supabase.functions.invoke("send-welcome-email", {
          body: {
            type: "school_invite",
            email: inviteEmail.trim(),
            data: {
              schoolName: newSchoolName.trim(),
              inviteLink,
            },
          },
        });

        toast({
          title: "School Created & Invite Sent",
          description: `${newSchoolName} has been created and invitation sent to ${inviteEmail}`,
        });
      } else {
        toast({
          title: "School Created",
          description: `${newSchoolName} has been created and linked to ${mentorName}`,
        });
      }

      onAssigned();
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating school:", error);
      toast({
        title: "Error",
        description: "Failed to create school. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSendingInvite(false);
    }
  };

  const showAddNew = searchValue.trim().length > 0 && 
    !schools.some((s) => s.name.toLowerCase() === searchValue.toLowerCase().trim());

  const currentSchoolDisplay = currentSchoolName || currentPendingSchoolName;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <School className="w-5 h-5 text-primary" />
            Assign School to {mentorName}
          </DialogTitle>
          <DialogDescription>
            {currentSchoolDisplay ? (
              <>Currently linked to: <strong>{currentSchoolDisplay}</strong></>
            ) : (
              "This mentor is not currently linked to any school."
            )}
          </DialogDescription>
        </DialogHeader>

        {!showInviteForm ? (
          <div className="space-y-4 mt-4">
            {/* School Combobox */}
            <div className="space-y-2">
              <Label>Select School</Label>
              <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={comboboxOpen}
                    className="w-full justify-between font-normal"
                    disabled={isLoading}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <School className="w-4 h-4 shrink-0" />
                      {selectedSchool ? (
                        <span className="flex items-center gap-2">
                          {selectedSchool.name}
                          {selectedSchool.type === "pending" && (
                            <Badge variant="secondary" className="text-xs">Not Registered</Badge>
                          )}
                        </span>
                      ) : (
                        "Select or add a school..."
                      )}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                  <Command shouldFilter={false}>
                    <CommandInput 
                      placeholder="Search or type a new school name..." 
                      value={searchValue}
                      onValueChange={setSearchValue}
                    />
                    <CommandList>
                      {isLoading ? (
                        <div className="py-6 text-center text-sm text-muted-foreground">
                          Loading schools...
                        </div>
                      ) : (
                        <>
                          <CommandEmpty>
                            <div className="py-2 text-center text-sm text-muted-foreground">
                              No schools found.
                            </div>
                          </CommandEmpty>
                          
                          {schools.filter((s) => 
                            s.name.toLowerCase().includes(searchValue.toLowerCase())
                          ).length > 0 && (
                            <CommandGroup heading="Schools">
                              {schools
                                .filter((s) => s.name.toLowerCase().includes(searchValue.toLowerCase()))
                                .map((school) => (
                                  <CommandItem
                                    key={school.id}
                                    value={school.name}
                                    onSelect={() => handleSelectSchool(school)}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        selectedSchool?.id === school.id ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                    <span className="flex-1">{school.name}</span>
                                    {school.type === "pending" ? (
                                      <Badge variant="secondary" className="text-xs">Not Registered</Badge>
                                    ) : (
                                      <Badge className="text-xs bg-accent/20 text-accent">Registered</Badge>
                                    )}
                                  </CommandItem>
                                ))}
                            </CommandGroup>
                          )}

                          {showAddNew && (
                            <CommandGroup heading="Add New">
                              <CommandItem onSelect={handleAddNewSchool} className="text-primary">
                                <Plus className="mr-2 h-4 w-4" />
                                Add "{searchValue.trim()}" and send invite
                              </CommandItem>
                            </CommandGroup>
                          )}
                        </>
                      )}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Assign Button */}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleAssignSchool} 
                disabled={!selectedSchool || isSaving}
              >
                {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Assign School
              </Button>
            </div>
          </div>
        ) : (
          // Create new school with invite form
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>New School Name</Label>
              <Input
                value={newSchoolName}
                onChange={(e) => setNewSchoolName(e.target.value)}
                placeholder="School name"
              />
            </div>

            <div className="space-y-2">
              <Label>
                Invite Email <span className="text-xs text-muted-foreground">(optional)</span>
              </Label>
              <Input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="contact@school.edu"
              />
              <p className="text-xs text-muted-foreground">
                If provided, an invitation email will be sent to register the school.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowInviteForm(false)}>
                Back
              </Button>
              <Button 
                onClick={handleCreateAndInvite} 
                disabled={!newSchoolName.trim() || isSendingInvite}
              >
                {isSendingInvite ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Send className="w-4 h-4 mr-2" />
                )}
                {inviteEmail.trim() ? "Create & Send Invite" : "Create School"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
