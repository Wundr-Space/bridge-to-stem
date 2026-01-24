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
} from "lucide-react";

interface CorporateProfile {
  id: string;
  company_name: string;
  industry: string | null;
  company_size: string | null;
}

interface DashboardStats {
  activeMentors: number;
  partnerSchools: number;
  placements: number;
}

interface RecentActivity {
  id: string;
  date: string;
  type: "mentor" | "school";
  name: string;
  status: "Active" | "Pending";
}

export default function CorporateDashboard() {
  const { user, signOut, isLoading: authLoading } = useRequireRole("corporate");
  const { toast } = useToast();
  const [profile, setProfile] = useState<CorporateProfile | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    activeMentors: 0,
    partnerSchools: 0,
    placements: 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
        // Fetch mentor count
        const { count: mentorCount } = await supabase
          .from("mentor_profiles")
          .select("*", { count: "exact", head: true })
          .eq("corporate_id", profileData.id);

        // Fetch school count
        const { count: schoolCount } = await supabase
          .from("school_profiles")
          .select("*", { count: "exact", head: true })
          .eq("corporate_id", profileData.id);

        setStats({
          activeMentors: mentorCount || 0,
          partnerSchools: schoolCount || 0,
          placements: 0, // Future functionality
        });

        // Fetch recent mentors and schools for activity
        const { data: mentors } = await supabase
          .from("mentor_profiles")
          .select("id, full_name, created_at")
          .eq("corporate_id", profileData.id)
          .order("created_at", { ascending: false })
          .limit(5);

        const { data: schools } = await supabase
          .from("school_profiles")
          .select("id, school_name, created_at")
          .eq("corporate_id", profileData.id)
          .order("created_at", { ascending: false })
          .limit(5);

        // Combine and sort recent activity
        const activity: RecentActivity[] = [
          ...(mentors || []).map((m) => ({
            id: m.id,
            date: new Date(m.created_at).toLocaleDateString(),
            type: "mentor" as const,
            name: m.full_name,
            status: "Active" as const,
          })),
          ...(schools || []).map((s) => ({
            id: s.id,
            date: new Date(s.created_at).toLocaleDateString(),
            type: "school" as const,
            name: s.school_name,
            status: "Active" as const,
          })),
        ];

        activity.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setRecentActivity(activity.slice(0, 5));
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
            <div className="grid sm:grid-cols-3 gap-4">
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

          {/* Section 3: Recent Activity */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
            <div className="bg-background rounded-xl border border-border overflow-hidden">
              {recentActivity.length > 0 ? (
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">
                        Date
                      </th>
                      <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">
                        Type
                      </th>
                      <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">
                        Name
                      </th>
                      <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivity.map((activity) => (
                      <tr key={activity.id} className="border-t border-border">
                        <td className="px-4 py-3 text-sm text-foreground">{activity.date}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                              activity.type === "mentor" ? "text-primary" : "text-accent"
                            }`}
                          >
                            {activity.type === "mentor" ? (
                              <Users className="w-4 h-4" />
                            ) : (
                              <School className="w-4 h-4" />
                            )}
                            {activity.type === "mentor" ? "Mentor" : "School"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-foreground">{activity.name}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                              activity.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {activity.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="px-4 py-8 text-center text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p className="text-sm">No recent activity yet</p>
                  <p className="text-xs mt-1">
                    Share your invitation links to start building your program
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Section 4: Quick Actions */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline">
                <Users className="w-4 h-4 mr-2" />
                View All Mentors
              </Button>
              <Button variant="outline">
                <School className="w-4 h-4 mr-2" />
                View All Schools
              </Button>
              <Button variant="outline">
                <Briefcase className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </div>
          </section>
        </main>
      </div>
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
