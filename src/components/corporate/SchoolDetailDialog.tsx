import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { School, MapPin, Users, Phone, User, Calendar, Percent } from "lucide-react";

interface SchoolProfile {
  id: string;
  school_name: string;
  location: string | null;
  school_type: string | null;
  student_count: string | null;
  fsm_percentage: string | null;
  contact_name: string | null;
  contact_role: string | null;
  phone: string | null;
  created_at: string;
  is_pending?: boolean;
}

interface SchoolDetailDialogProps {
  school: SchoolProfile | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SchoolDetailDialog({ school, open, onOpenChange }: SchoolDetailDialogProps) {
  if (!school) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <School className="w-5 h-5 text-accent" />
            </div>
            <div className="flex items-center gap-2">
              {school.school_name}
              {school.is_pending && (
                <Badge variant="secondary" className="text-xs">Pending Registration</Badge>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* School Info */}
          {(school.school_type || school.location) && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <School className="w-4 h-4" />
                School Information
              </h3>
              <div className="grid gap-3 pl-6">
                {school.school_type && (
                  <div>
                    <p className="text-xs text-muted-foreground">Type</p>
                    <p className="text-sm font-medium">{school.school_type}</p>
                  </div>
                )}
                {school.location && (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <p className="text-sm">{school.location}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Demographics */}
          {(school.student_count || school.fsm_percentage) && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="w-4 h-4" />
                Demographics
              </h3>
              <div className="grid grid-cols-2 gap-3 pl-6">
                {school.student_count && (
                  <div>
                    <p className="text-xs text-muted-foreground">Student Count</p>
                    <p className="text-sm font-medium">{school.student_count}</p>
                  </div>
                )}
                {school.fsm_percentage && (
                  <div className="flex items-start gap-2">
                    <Percent className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">FSM %</p>
                      <p className="text-sm font-medium">{school.fsm_percentage}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Contact Info */}
          {(school.contact_name || school.phone) && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <User className="w-4 h-4" />
                Contact
              </h3>
              <div className="grid gap-3 pl-6">
                {school.contact_name && (
                  <div>
                    <p className="text-xs text-muted-foreground">Contact Name</p>
                    <p className="text-sm font-medium">
                      {school.contact_name}
                      {school.contact_role && (
                        <span className="text-muted-foreground"> - {school.contact_role}</span>
                      )}
                    </p>
                  </div>
                )}
                {school.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm">{school.phone}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Joined Date */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {school.is_pending ? "Added" : "Registered"}
            </h3>
            <p className="text-sm pl-6">
              {new Date(school.created_at).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Pending Notice */}
          {school.is_pending && (
            <div className="bg-muted/50 rounded-lg p-4 text-sm">
              <p className="text-muted-foreground">
                This school was added by a mentor but hasn't registered yet. 
                Use the invite button to send them a registration link.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
