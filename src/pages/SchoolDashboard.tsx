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
  UserPlus,
  Users,
  Calendar,
  BarChart3,
} from "lucide-react";

interface SchoolProfile {
  school_name: string;
  location: string | null;
  contact_name: string | null;
}

export default function SchoolDashboard() {
  const { user, signOut, isLoading: authLoading } = useRequireRole("school");
  const [profile, setProfile] = useState<SchoolProfile | null>(null);
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
        .from("school_profiles")
        .select("school_name, location, contact_name")
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
    { icon: UserPlus, text: "Nominate students for placements" },
    { icon: Users, text: "View available mentors" },
    { icon: Calendar, text: "Schedule work experience" },
    { icon: BarChart3, text: "Track student outcomes" },
  ];

  return (
    <>
      <SEO
        title="School Dashboard"
        description="Manage your school's participation in the Gen-Connect program."
        keywords="school dashboard, student placements, STEM mentorship"
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
                  to="/school-dashboard"
                  className="flex items-center gap-2 text-sm font-medium text-primary"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link
                  to="/school-dashboard/settings"
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
              </nav>

              {/* User Info & Logout */}
              <div className="flex items-center gap-4">
                <span className="hidden sm:block text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{profile?.school_name}</span>
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
                Welcome, {profile?.school_name || "Partner School"}!
              </h1>
              {profile?.location && (
                <p className="text-muted-foreground mb-6">{profile.location}</p>
              )}

              <div className="bg-accent/5 rounded-xl p-6 mb-8">
                <p className="text-lg text-foreground mb-4">
                  Your school dashboard is coming soon.
                </p>
                <p className="text-muted-foreground">
                  We're building powerful tools to help connect your students with STEM mentors.
                </p>
              </div>

              <div className="text-left">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  You'll be able to:
                </h2>
                <ul className="space-y-3">
                  {upcomingFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                        <feature.icon className="w-4 h-4 text-accent" />
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
