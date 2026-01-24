import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRequireRole } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";
import {
  Users,
  School,
  Briefcase,
  Copy,
  Mail,
  LogOut,
  Settings,
  LayoutDashboard,
  Loader2,
  UserPlus,
  Building2,
  Eye,
  Send,
} from "lucide-react";
import { MentorDetailDialog } from "@/components/corporate/MentorDetailDialog";
import { SchoolDetailDialog } from "@/components/corporate/SchoolDetailDialog";
import { InviteSchoolDialog } from "@/components/corporate/InviteSchoolDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CorporateProfile {
  id: string;
  company_name: string;
  industry: string | null;
  company_size: string | null;
}

interface DashboardStats {
  activeMentors: number;
  partnerSchools: number;
  pendingSchools: number;
  placements: number;
}

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
  invited_email?: string | null;
  invited_at?: string | null;
}

export default function CorporateDashboard() {
  const { user, signOut, isLoading: authLoading } = useRequireRole("corporate");
  const { toast } = useToast();
  const [profile, setProfile] = useState<CorporateProfile | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    activeMentors: 0,
    partnerSchools: 0,
    pendingSchools: 0,
    placements: 0,
  });
  const [mentors, setMentors] = useState<MentorProfile[]>([]);
  const [schools, setSchools] = useState<SchoolProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Dialog states
  const [selectedMentor, setSelectedMentor] = useState<MentorProfile | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<SchoolProfile | null>(null);
  const [mentorDialogOpen, setMentorDialogOpen] = useState(false);
  const [schoolDialogOpen, setSchoolDialogOpen] = useState(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [schoolToInvite, setSchoolToInvite] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      // Fetch corporate profile
      const { data: profileData, error: profileError } = await supabase
        .from("corporate_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (profileError) throw profileError;
      setProfile(profileData);

      if (profileData) {
        // Fetch all mentors with school info
        const { data: mentorData } = await supabase
          .from("mentor_profiles")
          .select(`
            id, 
            full_name, 
            company, 
            job_title, 
            background_info, 
            created_at,
            school_id,
            pending_school_id
          `)
          .eq("corporate_id", profileData.id)
          .order("created_at", { ascending: false });

        // Fetch school names for mentors
        const mentorsWithSchools: MentorProfile[] = [];
        for (const mentor of mentorData || []) {
          let schoolName = null;
          let pendingSchoolName = null;

          if (mentor.school_id) {
            const { data: schoolData } = await supabase
              .from("school_profiles")
              .select("school_name")
              .eq("id", mentor.school_id)
              .maybeSingle();
            schoolName = schoolData?.school_name || null;
          }

          if (mentor.pending_school_id) {
            const { data: pendingData } = await supabase
              .from("pending_schools")
              .select("school_name")
              .eq("id", mentor.pending_school_id)
              .maybeSingle();
            pendingSchoolName = pendingData?.school_name || null;
          }

          mentorsWithSchools.push({
            id: mentor.id,
            full_name: mentor.full_name,
            company: mentor.company,
            job_title: mentor.job_title,
            background_info: mentor.background_info,
            created_at: mentor.created_at,
            school_name: schoolName,
            pending_school_name: pendingSchoolName,
          });
        }
        setMentors(mentorsWithSchools);

        // Fetch registered schools
        const { data: schoolData } = await supabase
          .from("school_profiles")
          .select("*")
          .eq("corporate_id", profileData.id)
          .order("created_at", { ascending: false });

        // Fetch pending schools
        const { data: pendingSchoolData } = await supabase
          .from("pending_schools")
          .select("*")
          .eq("corporate_id", profileData.id)
          .order("created_at", { ascending: false });

        // Combine schools
        const allSchools: SchoolProfile[] = [
          ...(schoolData || []).map((s) => ({
            ...s,
            is_pending: false,
          })),
          ...(pendingSchoolData || []).map((s) => ({
            id: s.id,
            school_name: s.school_name,
            location: null,
            school_type: null,
            student_count: null,
            fsm_percentage: null,
            contact_name: null,
            contact_role: null,
            phone: null,
            created_at: s.created_at,
            is_pending: true,
            invited_email: s.invited_email,
            invited_at: s.invited_at,
          })),
        ];
        setSchools(allSchools);

        // Update stats
        setStats({
          activeMentors: mentorsWithSchools.length,
          partnerSchools: (schoolData || []).length,
          pendingSchools: (pendingSchoolData || []).length,
          placements: 0,
        });
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getInvitationLinks = () => {
    if (!profile) return { mentorUrl: "", schoolUrl: "" };
    const baseUrl = window.location.origin;
    return {
      mentorUrl: `${baseUrl}/mentor-signup?corporate=${profile.id}`,
      schoolUrl: `${baseUrl}/school-signup?corporate=${profile.id}`,
    };
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Link Copied!",
        description: `${type} signup link copied to clipboard`,
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Please copy the link manually",
        variant: "destructive",
      });
    }
  };

  const sendInvitationEmail = (type: "mentor" | "school", link: string) => {
    const subject =
      type === "mentor"
        ? "Invitation to Join as a Mentor - Gen-Connect"
        : "Invitation to Join as Partner School - Gen-Connect";

    const body = `You've been invited to join our social mobility program.\n\nSignup link: ${link}\n\nThis link is unique to ${profile?.company_name || "our organization"}.`;

    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const handleViewMentor = (mentor: MentorProfile) => {
    setSelectedMentor(mentor);
    setMentorDialogOpen(true);
  };

  const handleViewSchool = (school: SchoolProfile) => {
    setSelectedSchool(school);
    setSchoolDialogOpen(true);
  };

  const handleInviteSchool = (school: SchoolProfile) => {
    setSchoolToInvite({ id: school.id, name: school.school_name });
    setInviteDialogOpen(true);
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const { mentorUrl, schoolUrl } = getInvitationLinks();

  return (
    <>
      <SEO
        title="Corporate Dashboard"
        description="Manage your Gen-Connect program, invite mentors and schools, and track your social mobility impact."
        keywords="corporate dashboard, mentor management, school partnerships"
      />

      <div className="min-h-screen bg-muted/30">
        {/* Header */}
        <header className="bg-background border-b border-border sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-brand">
                  <span className="text-white font-bold text-lg">G</span>
                </div>
                <span className="text-xl font-bold text-foreground">
                  Gen<span className="text-primary">-Connect</span>
                </span>
              </Link>

              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-6">
                <Link
                  to="/corporate-dashboard"
                  className="flex items-center gap-2 text-sm font-medium text-primary"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link
                  to="/corporate-dashboard/settings"
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
              </nav>

              {/* User Info & Logout */}
              <div className="flex items-center gap-4">
                <span className="hidden sm:block text-sm text-muted-foreground">
                  Welcome, <span className="font-medium text-foreground">{profile?.company_name}</span>
                </span>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Manage your social mobility program</p>
          </div>

          {/* Section 1: Quick Stats */}
          <section className="mb-8">
            <div className="grid sm:grid-cols-4 gap-4">
              <StatCard
                icon={Users}
                label="Active Mentors"
                value={stats.activeMentors}
                color="text-primary"
              />
              <StatCard
                icon={School}
                label="Partner Schools"
                value={stats.partnerSchools}
                color="text-accent"
              />
              <StatCard
                icon={Building2}
                label="Pending Schools"
                value={stats.pendingSchools}
                color="text-yellow-600"
              />
              <StatCard
                icon={Briefcase}
                label="Placements"
                value={stats.placements}
                color="text-green-600"
              />
            </div>
          </section>

          {/* Section 2: Invitation Links */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Invite Schools and Mentors
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Share these secure links to allow schools and mentors to join your program
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Mentor Invitation Card */}
              <div className="bg-background rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <UserPlus className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Invite Mentors</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Share this link with your employees who want to become mentors:
                </p>
                <div className="bg-muted rounded-lg p-3 mb-4">
                  <code className="text-xs text-foreground break-all">{mentorUrl}</code>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(mentorUrl, "Mentor")}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Link
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => sendInvitationEmail("mentor", mentorUrl)}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send via Email
                  </Button>
                </div>
              </div>

              {/* School Invitation Card */}
              <div className="bg-background rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground">Invite Schools</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Share this link with partner schools:
                </p>
                <div className="bg-muted rounded-lg p-3 mb-4">
                  <code className="text-xs text-foreground break-all">{schoolUrl}</code>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(schoolUrl, "School")}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Link
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => sendInvitationEmail("school", schoolUrl)}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send via Email
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Mentors and Schools Lists */}
          <section className="mb-8">
            <Tabs defaultValue="mentors" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="mentors" className="gap-2">
                  <Users className="w-4 h-4" />
                  Mentors ({mentors.length})
                </TabsTrigger>
                <TabsTrigger value="schools" className="gap-2">
                  <School className="w-4 h-4" />
                  Schools ({schools.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="mentors">
                <div className="bg-background rounded-xl border border-border overflow-hidden">
                  {mentors.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Job Title</TableHead>
                          <TableHead>School</TableHead>
                          <TableHead>Joined</TableHead>
                          <TableHead className="w-[80px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mentors.map((mentor) => (
                          <TableRow key={mentor.id}>
                            <TableCell className="font-medium">{mentor.full_name}</TableCell>
                            <TableCell>{mentor.job_title || "-"}</TableCell>
                            <TableCell>
                              {mentor.school_name ? (
                                mentor.school_name
                              ) : mentor.pending_school_name ? (
                                <div className="flex items-center gap-2">
                                  {mentor.pending_school_name}
                                  <Badge variant="secondary" className="text-xs">Pending</Badge>
                                </div>
                              ) : (
                                "-"
                              )}
                            </TableCell>
                            <TableCell>
                              {new Date(mentor.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewMentor(mentor)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="px-4 py-8 text-center text-muted-foreground">
                      <Users className="w-12 h-12 mx-auto mb-3 opacity-20" />
                      <p className="text-sm">No mentors registered yet</p>
                      <p className="text-xs mt-1">
                        Share your mentor invitation link to get started
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="schools">
                <div className="bg-background rounded-xl border border-border overflow-hidden">
                  {schools.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>School Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Added</TableHead>
                          <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {schools.map((school) => (
                          <TableRow key={school.id}>
                            <TableCell className="font-medium">{school.school_name}</TableCell>
                            <TableCell>{school.school_type || "-"}</TableCell>
                            <TableCell>{school.location || "-"}</TableCell>
                            <TableCell>
                              {school.is_pending ? (
                                school.invited_at ? (
                                  <Badge variant="outline" className="text-xs">
                                    Invited
                                  </Badge>
                                ) : (
                                  <Badge variant="secondary" className="text-xs">
                                    Pending
                                  </Badge>
                                )
                              ) : (
                                <Badge className="text-xs bg-green-100 text-green-700 hover:bg-green-100">
                                  Registered
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              {new Date(school.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleViewSchool(school)}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                {school.is_pending && !school.invited_at && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleInviteSchool(school)}
                                    title="Send invitation email"
                                  >
                                    <Send className="w-4 h-4 text-primary" />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="px-4 py-8 text-center text-muted-foreground">
                      <School className="w-12 h-12 mx-auto mb-3 opacity-20" />
                      <p className="text-sm">No schools registered yet</p>
                      <p className="text-xs mt-1">
                        Share your school invitation link or have mentors add schools during signup
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </section>
        </main>
      </div>

      {/* Dialogs */}
      <MentorDetailDialog
        mentor={selectedMentor}
        open={mentorDialogOpen}
        onOpenChange={setMentorDialogOpen}
      />
      <SchoolDetailDialog
        school={selectedSchool}
        open={schoolDialogOpen}
        onOpenChange={setSchoolDialogOpen}
      />
      {schoolToInvite && profile && (
        <InviteSchoolDialog
          open={inviteDialogOpen}
          onOpenChange={setInviteDialogOpen}
          schoolId={schoolToInvite.id}
          schoolName={schoolToInvite.name}
          corporateId={profile.id}
          onInviteSent={fetchDashboardData}
        />
      )}
    </>
  );
}

// Stat Card Component
function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-background rounded-xl border border-border p-6">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  );
}
