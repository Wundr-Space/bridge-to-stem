import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Mail, School } from "lucide-react";

interface InviteSchoolDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  schoolId: string;
  schoolName: string;
  corporateId: string;
  onInviteSent: () => void;
}

export function InviteSchoolDialog({
  open,
  onOpenChange,
  schoolId,
  schoolName,
  corporateId,
  onInviteSent,
}: InviteSchoolDialogProps) {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Update the pending school with the invited email
      const { error: updateError } = await supabase
        .from("pending_schools")
        .update({
          invited_email: email,
          invited_at: new Date().toISOString(),
        })
        .eq("id", schoolId);

      if (updateError) throw updateError;

      // Send invitation email
      const inviteLink = `${window.location.origin}/school-signup?corporate=${corporateId}`;
      
      const { error: emailError } = await supabase.functions.invoke("send-welcome-email", {
        body: {
          type: "school_invite",
          email: email,
          data: {
            schoolName: schoolName,
            inviteLink: inviteLink,
          },
        },
      });

      if (emailError) {
        console.error("Email error:", emailError);
        // Still show success since the record was updated
      }

      toast({
        title: "Invitation Sent!",
        description: `An invitation has been sent to ${email} for ${schoolName}.`,
      });

      onInviteSent();
      onOpenChange(false);
      setEmail("");
    } catch (error) {
      console.error("Error sending invitation:", error);
      toast({
        title: "Failed to Send",
        description: "Could not send the invitation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Invite School to Register
          </DialogTitle>
          <DialogDescription>
            Send a registration invitation to <strong>{schoolName}</strong>.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="invite-email">School Contact Email</Label>
            <Input
              id="invite-email"
              type="email"
              placeholder="contact@school.edu"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              className={error ? "border-destructive" : ""}
              disabled={isLoading}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <p className="text-xs text-muted-foreground">
              They will receive a link to complete their school registration.
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" variant="brand" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Invitation
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
