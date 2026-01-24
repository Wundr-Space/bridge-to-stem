import { 
  Briefcase, 
  Lightbulb,
  Users,
  Code,
  Coffee,
  HelpCircle,
  Route,
  GraduationCap,
  Building2,
  Calendar,
  Sparkles,
  Target
} from "lucide-react";

const dailyActivities = [
  { icon: Briefcase, text: "Shadow your mentor's work" },
  { icon: Users, text: "Attend team meetings" },
  { icon: Code, text: "Work on mini-projects" },
  { icon: Sparkles, text: "Meet other professionals" },
  { icon: Coffee, text: "Lunch with the team" },
  { icon: HelpCircle, text: "Ask questions about everything" },
];

const learnings = [
  { icon: Lightbulb, text: "What tech jobs really involve (not stereotypes)" },
  { icon: Route, text: "Different career paths in STEM" },
  { icon: GraduationCap, text: "What university/training you'd need" },
  { icon: Calendar, text: "Day-to-day reality of the work" },
  { icon: Building2, text: "Company culture and environment" },
  { icon: Target, text: "Whether this path is for you" },
];

export function PlacementActivities() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What You'll Do During Placement
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Two weeks of real experience at a real tech company
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Daily Activities */}
          <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Daily Activities
              </h3>
            </div>
            
            <ul className="space-y-4">
              {dailyActivities.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <li key={index} className="flex items-center gap-4 p-3 bg-muted/50 rounded-xl">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-foreground">{item.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* What You'll Learn */}
          <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                What You'll Learn
              </h3>
            </div>
            
            <ul className="space-y-4">
              {learnings.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <li key={index} className="flex items-center gap-4 p-3 bg-muted/50 rounded-xl">
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-foreground">{item.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
