import { useState } from "react";
import { Handshake, Network, School, Briefcase, TrendingUp, Building2, Heart, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: 1,
    icon: Handshake,
    title: "Corporates Partner",
    description: "Major STEM companies sponsor the program and identify diverse employee mentors",
    audiences: ["corporates"]
  },
  {
    id: 2,
    icon: Network,
    title: "We Match & Facilitate",
    description: "Our platform connects mentors with students from similar backgrounds and handles all compliance",
    audiences: ["corporates", "schools", "mentors", "students"]
  },
  {
    id: 3,
    icon: School,
    title: "Schools Connect Students",
    description: "State schools nominate students who benefit from relatable STEM role models",
    audiences: ["schools", "students"]
  },
  {
    id: 4,
    icon: Briefcase,
    title: "Placements Happen",
    description: "Students complete 2-week work placements with supportive mentors",
    audiences: ["mentors", "students"]
  },
  {
    id: 5,
    icon: TrendingUp,
    title: "Everyone Wins",
    description: "Corporates get measurable impact, students change career paths, mentors give back, schools improve outcomes",
    audiences: ["corporates", "schools", "mentors", "students"]
  }
];

const perspectives = [
  { 
    id: "all", 
    label: "All", 
    icon: null,
    outcome: "A complete ecosystem connecting corporates, schools, mentors, and students for lasting social mobility impact."
  },
  { 
    id: "corporates", 
    label: "Corporate", 
    icon: Building2,
    outcome: "Demonstrate authentic ESG impact with measurable outcomes, engage employees meaningfully, and build diverse talent pipelines."
  },
  { 
    id: "schools", 
    label: "School", 
    icon: School,
    outcome: "Access quality work placements for students, connect with major STEM employers, and improve student outcomes—all at zero cost."
  },
  { 
    id: "mentors", 
    label: "Mentor", 
    icon: Heart,
    outcome: "Give back to students from similar backgrounds, develop leadership skills, and make a meaningful difference in young lives."
  },
  { 
    id: "students", 
    label: "Student", 
    icon: Rocket,
    outcome: "Experience real STEM work, meet mentors who share your background, and discover that careers in tech are achievable for you."
  }
];

export function HowItWorks() {
  const [activePerspective, setActivePerspective] = useState("all");

  const isStepHighlighted = (step: typeof steps[0]) => {
    if (activePerspective === "all") return true;
    return step.audiences.includes(activePerspective);
  };

  const activeOutcome = perspectives.find(p => p.id === activePerspective)?.outcome;

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Complete Ecosystem
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connecting four audiences to create lasting social mobility impact
          </p>
        </div>

        {/* Perspective Toggle */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <span className="text-sm text-muted-foreground self-center mr-2 hidden sm:inline">View from:</span>
          {perspectives.map((perspective) => {
            const Icon = perspective.icon;
            return (
              <button
                key={perspective.id}
                onClick={() => setActivePerspective(perspective.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2",
                  activePerspective === perspective.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                )}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {perspective.label}
              </button>
            );
          })}
        </div>

        {/* Flow Diagram */}
        <div className="relative max-w-6xl mx-auto mb-12">
          {/* Connection Line (desktop only) */}
          <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-30" />
          
          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isHighlighted = isStepHighlighted(step);
              
              return (
                <div
                  key={step.id}
                  className={cn(
                    "relative flex flex-col items-center text-center transition-all duration-300",
                    isHighlighted ? "opacity-100" : "opacity-30"
                  )}
                >
                  {/* Step Number & Icon */}
                  <div className={cn(
                    "relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300",
                    isHighlighted 
                      ? "bg-gradient-to-br from-primary to-accent shadow-lg" 
                      : "bg-muted"
                  )}>
                    <Icon className={cn(
                      "w-9 h-9 transition-colors",
                      isHighlighted ? "text-primary-foreground" : "text-muted-foreground"
                    )} />
                    
                    {/* Step number badge */}
                    <span className={cn(
                      "absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center",
                      isHighlighted 
                        ? "bg-accent text-accent-foreground" 
                        : "bg-muted-foreground/20 text-muted-foreground"
                    )}>
                      {step.id}
                    </span>
                  </div>

                  {/* Arrow (mobile/tablet) */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden absolute -bottom-3 left-1/2 -translate-x-1/2 text-muted-foreground/30">
                      ↓
                    </div>
                  )}

                  {/* Title */}
                  <h3 className={cn(
                    "font-semibold text-base mb-2 transition-colors",
                    isHighlighted ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className={cn(
                    "text-sm leading-relaxed transition-colors",
                    isHighlighted ? "text-muted-foreground" : "text-muted-foreground/50"
                  )}>
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Outcome Message */}
        <div className="max-w-3xl mx-auto text-center p-6 bg-muted/50 rounded-2xl border border-border/50">
          <p className="text-foreground/80 leading-relaxed">
            {activeOutcome}
          </p>
        </div>

        {/* Diagram Placeholder */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="aspect-video bg-muted/30 rounded-2xl border-2 border-dashed border-border flex items-center justify-center">
            <div className="text-center p-8">
              <Network className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground font-medium">Ecosystem Diagram Placeholder</p>
              <p className="text-sm text-muted-foreground/70 mt-1">Insert your existing ecosystem diagram here</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
