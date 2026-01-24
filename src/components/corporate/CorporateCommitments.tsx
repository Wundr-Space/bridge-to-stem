import { Card, CardContent } from "@/components/ui/card";
import { Target, Coins, Users, HelpCircle, Check } from "lucide-react";

const commitments = [
  {
    icon: Target,
    title: "D&I Targets",
    items: [
      "Public social mobility pledges",
      "ERGs for underrepresented groups",
      "Diversity hiring initiatives"
    ],
    tagline: "You have the commitment ✓"
  },
  {
    icon: Coins,
    title: "CSR Investment",
    items: [
      "Education & social mobility budgets",
      "Donations to STEM charities",
      "Community investment programs"
    ],
    tagline: "You have the budget ✓"
  },
  {
    icon: Users,
    title: "Employee Engagement",
    items: [
      "Employee volunteering programs",
      "'Impact hours' measured",
      "Diverse workforce ready to give back"
    ],
    tagline: "You have the people ✓"
  },
  {
    icon: HelpCircle,
    title: "What's Missing?",
    items: [
      "Measurable outcomes",
      "Direct employee activation",
      "Real student pathway changes"
    ],
    tagline: "We provide the results ✓",
    highlight: true
  }
];

export function CorporateCommitments() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            You've Made the Commitment. We Help You Prove the Impact.
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Social Mobility Index companies have the right intentions — but struggle to demonstrate authentic, measurable outcomes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {commitments.map((commitment, index) => {
            const Icon = commitment.icon;
            return (
              <Card 
                key={index} 
                className={`border-border/50 hover:shadow-lg transition-shadow ${
                  commitment.highlight ? 'border-accent/50 bg-accent/5' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    commitment.highlight 
                      ? 'bg-gradient-to-br from-accent to-accent/70' 
                      : 'bg-gradient-to-br from-primary/20 to-primary/10'
                  }`}>
                    <Icon className={`w-6 h-6 ${commitment.highlight ? 'text-accent-foreground' : 'text-primary'}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {commitment.title}
                  </h3>
                  <ul className="space-y-2 mb-4">
                    {commitment.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-primary/50 rounded-full flex-shrink-0 mt-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className={`text-sm font-medium ${
                    commitment.highlight ? 'text-accent' : 'text-primary'
                  }`}>
                    {commitment.tagline}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Callout */}
        <div className="mt-10 text-center">
          <div className="inline-block bg-card border border-border/50 rounded-xl px-8 py-4">
            <p className="text-foreground font-medium">
              You're spending the money. You have engaged employees.{" "}
              <span className="text-primary">But can you prove it's working?</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
