import { X, Check } from "lucide-react";

const currentState = [
  "CSR donations with no outcome visibility",
  "Work placements restricted by compliance burden",
  "Employee volunteering ad-hoc and unmeasured",
  "Generic outreach lacking relatability",
  "No student-level impact data for reporting"
];

const withWundrSpace = [
  "Quantifiable student outcomes (career pathway changes)",
  "Scalable placements, fully compliant (we handle everything)",
  "Structured employee activation with personal connection",
  "Relatable mentors matched by background",
  "Quarterly ESG/D&I reports with real impact data"
];

export function CorporateComparison() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Your Complete Solution for Authentic Social Mobility Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We don't replace your CSR programs — we make them measurable and meaningful
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Current State */}
          <div className="bg-card border border-border/50 rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-foreground mb-6 pb-4 border-b border-border">
              What You're Doing Now
            </h3>
            <ul className="space-y-4">
              {currentState.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-4 h-4 text-destructive" />
                  </div>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* With Wundr Space */}
          <div className="bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/30 rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-foreground mb-6 pb-4 border-b border-accent/20">
              What You'll Achieve
            </h3>
            <ul className="space-y-4">
              {withWundrSpace.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
