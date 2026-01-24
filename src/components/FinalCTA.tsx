import { Building2, School, Heart, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ctaButtons = [
  {
    id: "corporates",
    icon: Building2,
    label: "Corporates: Request Pilot Info",
    link: "/for-corporates"
  },
  {
    id: "schools",
    icon: School,
    label: "Schools: Partner With Us",
    link: "/for-schools"
  },
  {
    id: "mentors",
    icon: Heart,
    label: "Mentors: Get Involved",
    link: "/for-mentors"
  },
  {
    id: "students",
    icon: Rocket,
    label: "Students: Apply for Placement",
    link: "/for-students"
  }
];

export function FinalCTA() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Create Impact?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your pathway and register your interest
          </p>
        </div>

        {/* CTA Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {ctaButtons.map((cta) => {
            const Icon = cta.icon;
            return (
              <Button
                key={cta.id}
                asChild
                size="lg"
                variant="outline"
                className="h-auto py-5 px-6 justify-start gap-4 text-left hover:bg-primary hover:text-primary-foreground hover:border-primary group transition-all"
              >
                <Link to={cta.link}>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary-foreground/20 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-base block">{cta.label}</span>
                    <span className="text-sm opacity-70">→</span>
                  </div>
                </Link>
              </Button>
            );
          })}
        </div>

        {/* Launch Badge */}
        <div className="text-center mt-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-accent text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Pilot Launching Q2 2026 • Limited Founding Partner Spots
          </span>
        </div>
      </div>
    </section>
  );
}
