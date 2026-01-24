import { useState, useEffect } from "react";
import { Check, ChevronsUpDown, School, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { supabase } from "@/integrations/supabase/client";

interface SchoolOption {
  id: string;
  name: string;
  type: "registered" | "pending";
}

interface SchoolComboboxProps {
  corporateId: string;
  value: string;
  onSelect: (school: { id: string; name: string; type: "registered" | "pending" | "new" } | null) => void;
  disabled?: boolean;
  error?: string;
}

export function SchoolCombobox({ corporateId, value, onSelect, disabled, error }: SchoolComboboxProps) {
  const [open, setOpen] = useState(false);
  const [schools, setSchools] = useState<SchoolOption[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchSchools();
  }, [corporateId]);

  const fetchSchools = async () => {
    if (!corporateId) return;
    
    setIsLoading(true);
    try {
      // Fetch registered schools
      const { data: registeredSchools } = await supabase
        .from("school_profiles")
        .select("id, school_name")
        .eq("corporate_id", corporateId);

      // Fetch pending schools
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

      setSchools(allSchools);
    } catch (error) {
      console.error("Error fetching schools:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedSchool = schools.find((s) => s.name === value);
  const showAddNew = searchValue.trim().length > 0 && 
    !schools.some((s) => s.name.toLowerCase() === searchValue.toLowerCase().trim());

  const handleSelect = (schoolName: string) => {
    const school = schools.find((s) => s.name === schoolName);
    if (school) {
      onSelect({ id: school.id, name: school.name, type: school.type });
    }
    setOpen(false);
  };

  const handleAddNew = () => {
    const newSchoolName = searchValue.trim();
    if (newSchoolName) {
      onSelect({ id: "", name: newSchoolName, type: "new" });
      setOpen(false);
      setSearchValue("");
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between font-normal",
            !value && "text-muted-foreground",
            error && "border-destructive"
          )}
          disabled={disabled}
        >
          <span className="flex items-center gap-2 truncate">
            <School className="w-4 h-4 shrink-0" />
            {value || "Select or add a school..."}
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
                          onSelect={() => handleSelect(school.name)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === school.name ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <span className="flex-1">{school.name}</span>
                          {school.type === "pending" && (
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                              Pending
                            </span>
                          )}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                )}

                {showAddNew && (
                  <CommandGroup heading="Add New">
                    <CommandItem onSelect={handleAddNew} className="text-primary">
                      <Plus className="mr-2 h-4 w-4" />
                      Add "{searchValue.trim()}" as new school
                    </CommandItem>
                  </CommandGroup>
                )}
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
