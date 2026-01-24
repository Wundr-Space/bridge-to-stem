import { 
  ClipboardCheck, 
  Users, 
  Building2, 
  Compass, 
  TrendingUp,
  CheckCircle2
} from "lucide-react";

const ofstedCriteria = [
  { icon: Users, text: "Community links and partnerships" },
  { icon: ClipboardCheck, text: "Alumni engagement" },
  { icon: Building2, text: "Employer connections" },
  { icon: Compass, text: "Career guidance quality" },
  { icon: TrendingUp, text: "Social mobility outcomes" },
];

const howWeHelp = [
  "Documented corporate partnerships",
  "Alumni-style professional network",
  "Major employer engagement",
  "Structured careers program",
  "Measurable student outcomes",
];

export function SchoolOfsted() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Strengthen Your OFSTED Community Engagement Score
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our program directly supports key OFSTED criteria for community engagement
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Left - OFSTED Criteria */}
          <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <ClipboardCheck className="w-5 h-5 text-primary" />
              </div>
              OFSTED Criteria
            </h3>
            <ul className="space-y-4">
              {ofstedCriteria.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <li key={index} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{item.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right - How We Help */}
          <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl p-8 border border-accent/20 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-accent" />
              </div>
              How We Help
            </h3>
            <ul className="space-y-4">
              {howWeHelp.map((item, index) => (
                <li key={index} className="flex items-center gap-4 p-3 bg-card/50 rounded-lg">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-foreground font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
