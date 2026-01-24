import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRequireRole } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import {
  LogOut,
  Settings,
  LayoutDashboard,
  Loader2,
  Users,
  Calendar,
  TrendingUp,
  MessageSquare,
} from "lucide-react";

interface MentorProfile {
  full_name: string;
  job_title: string | null;
  company: string | null;
}

export default function MentorDashboard() {
  const { user, signOut, isLoading: authLoading } = useRequireRole("mentor");
  const [profile, setProfile] = useState<MentorProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("mentor_profiles")
        .select("full_name, job_title, company")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
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

  const upcomingFeatures = [
    { icon: Users, text: "View student placements" },
    { icon: Calendar, text: "Manage your availability" },
    { icon: TrendingUp, text: "Track mentorship progress" },
    { icon: MessageSquare, text: "Communicate with schools" },
  ];

  return (
    <>
      <SEO
        title="Mentor Dashboard"
        description="Manage your mentorship activities and connect with students."
        keywords="mentor dashboard, STEM mentorship"
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
                  to="/mentor-dashboard"
                  className="flex items-center gap-2 text-sm font-medium text-primary"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link
                  to="/mentor-dashboard/settings"
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
              </nav>

              {/* User Info & Logout */}
              <div className="flex items-center gap-4">
                <span className="hidden sm:block text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{profile?.full_name}</span>
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
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="bg-background rounded-2xl shadow-card p-8 text-center">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Welcome, {profile?.full_name || "Mentor"}!
              </h1>
              {profile?.job_title && profile?.company && (
                <p className="text-muted-foreground mb-6">
                  {profile.job_title} at {profile.company}
                </p>
              )}

              <div className="bg-primary/5 rounded-xl p-6 mb-8">
                <p className="text-lg text-foreground mb-4">
                  Your mentor dashboard is coming soon.
                </p>
                <p className="text-muted-foreground">
                  We're building powerful tools to help you make a real impact.
                </p>
              </div>

              <div className="text-left">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  You'll be able to:
                </h2>
                <ul className="space-y-3">
                  {upcomingFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <feature.icon className="w-4 h-4 text-primary" />
                      </div>
                      {feature.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
