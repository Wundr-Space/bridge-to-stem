import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { User, Briefcase, Building2, School, Calendar, FileText } from "lucide-react";

interface MentorProfile {
  id: string;
  full_name: string;
  company: string | null;
  job_title: string | null;
  background_info: string | null;
  created_at: string;
  school_name?: string | null;
  pending_school_name?: string | null;
}

interface MentorDetailDialogProps {
  mentor: MentorProfile | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MentorDetailDialog({ mentor, open, onOpenChange }: MentorDetailDialogProps) {
  if (!mentor) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            {mentor.full_name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Professional Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Professional Information
            </h3>
            <div className="grid gap-3 pl-6">
              {mentor.job_title && (
                <div>
                  <p className="text-xs text-muted-foreground">Job Title</p>
                  <p className="text-sm font-medium">{mentor.job_title}</p>
                </div>
              )}
              {mentor.company && (
                <div>
                  <p className="text-xs text-muted-foreground">Company</p>
                  <p className="text-sm font-medium">{mentor.company}</p>
                </div>
              )}
            </div>
          </div>

          {/* School Association */}
          {(mentor.school_name || mentor.pending_school_name) && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <School className="w-4 h-4" />
                Associated School
              </h3>
              <div className="pl-6">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">
                    {mentor.school_name || mentor.pending_school_name}
                  </p>
                  {mentor.pending_school_name && !mentor.school_name && (
                    <Badge variant="secondary" className="text-xs">Pending</Badge>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Background */}
          {mentor.background_info && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Background
              </h3>
              <p className="text-sm text-foreground pl-6 whitespace-pre-wrap">
                {mentor.background_info}
              </p>
            </div>
          )}

          {/* Joined Date */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Member Since
            </h3>
            <p className="text-sm pl-6">
              {new Date(mentor.created_at).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
