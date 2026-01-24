import { Card, CardContent } from "@/components/ui/card";
import { Settings, Puzzle, BarChart3, Check } from "lucide-react";

const benefits = [
  {
    icon: Settings,
    title: "Full-Service Delivery",
    items: [
      "Complete DBS & safeguarding compliance",
      "Insurance coverage provided",
      "School partnership coordination",
      "Platform onboarding for employees & students",
      "Ongoing program management"
    ],
    bottomLine: "Zero internal headcount required"
  },
  {
    icon: Puzzle,
    title: "Strategic Matching",
    items: [
      "Match mentors to students by shared background",
      "Alumni connections (same school type, similar area)",
      "Demographic alignment (gender, ethnicity, SES)",
      "Interest & career path matching",
      "Optional ongoing mentorship beyond placement"
    ],
    bottomLine: "Relatability drives results"
  },
  {
    icon: BarChart3,
    title: "Measurable Outcomes",
    items: [
      "Pre/post student surveys (perception change)",
      "Career pathway tracking (A-Level choices, university applications)",
      "Employee engagement metrics",
      "Quarterly impact reports for ESG/D&I",
      "ROI on CSR investment"
    ],
    bottomLine: "Prove impact to stakeholders"
  }
];

export function CorporateBenefits() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Partnership Benefits: Everything Handled, Impact Delivered
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="border-border/50 hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {benefit.title}
                  </h3>
                  <ul className="space-y-3 mb-6">
                    {benefit.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-semibold text-primary">
                      {benefit.bottomLine}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
