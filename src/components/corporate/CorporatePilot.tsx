import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

const included = [
  "10-20 student placements (2-week each)",
  "Full compliance handling (DBS, safeguarding, insurance)",
  "Employee mentor recruitment & training",
  "School partnership coordination",
  "Pre/post impact measurement",
  "6-month outcome tracking (A-Level choices)",
  "Quarterly impact reports",
  "Co-branded case study"
];

const investment = [
  "Pilot pricing: £50K-£100K",
  "Aligned with existing CSR budgets",
  "Measurable ROI on social mobility spend",
  "Flexible payment terms",
  "Employee time: 2 weeks + optional ongoing"
];

const outcomes = [
  "40% of students change STEM perception (pilot target)",
  "15% increase in STEM A-Level uptake (target)",
  "90%+ employee satisfaction with experience",
  "Quantifiable ESG/D&I reporting data",
  "Competitive advantage in Social Mobility Index"
];

export function CorporatePilot() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-accent text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Limited Availability
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Q2 2026 Pilot: Limited Founding Partner Spots
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join Social Mobility Index leaders in proving relatable mentorship works
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-10">
          {/* What's Included */}
          <Card className="border-border/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">What's Included</h3>
              <ul className="space-y-3">
                {included.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Your Investment */}
          <Card className="border-accent/30 bg-accent/5">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Your Investment</h3>
              <ul className="space-y-3 mb-4">
                {investment.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-accent/20">
                <p className="text-xs text-muted-foreground italic">
                  "This isn't an expense — it's making your current CSR spend accountable"
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Expected Outcomes */}
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Expected Outcomes</h3>
              <ul className="space-y-3">
                {outcomes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Trust Signal */}
        <div className="text-center">
          <div className="inline-block bg-card border border-border/50 rounded-xl px-6 py-3">
            <p className="text-sm font-medium text-foreground">
              Limited to <span className="text-primary">5 companies</span> for personalized attention
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
