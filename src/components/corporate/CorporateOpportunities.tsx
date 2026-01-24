import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Heart, ShieldCheck, Check } from "lucide-react";

const opportunities = [
  {
    icon: TrendingUp,
    title: "Measurable, Reportable Impact",
    items: [
      "Quantifiable outcomes for ESG/D&I reporting",
      "Track: X students influenced, Y% changed A-Level choices, Z career pathways",
      "Pre/post student surveys showing perception change",
      "Quarterly impact reports ready for stakeholders",
      "Answer the board's question: \"What did our investment achieve?\""
    ],
    exampleMetric: "In our pilot: 40% of students changed their perception of STEM careers after 2 weeks with a relatable mentor",
    jobToBeDone: "When reporting on ESG/D&I metrics, I can show quantifiable social mobility outcomes"
  },
  {
    icon: Heart,
    title: "Employee Engagement That Matters",
    items: [
      "Activate your diverse employees for personally meaningful work",
      "Connect employees with students who \"went to their school\" or share their background",
      "Structured, company-sanctioned volunteering (counts toward impact hours)",
      "Boost retention: employees feel purpose-driven impact",
      "ERG members become ambassadors for your social mobility commitment"
    ],
    exampleUseCase: "Your Black employees mentor Black students. Your first-gen university grads mentor first-gen students. Your alumni from state schools mentor students at similar schools.",
    jobsToBeDone: [
      "When employees ask for meaningful volunteering, I connect them with students who share their background",
      "When we want to improve outcomes, I activate diverse employees as relatable mentors"
    ]
  },
  {
    icon: ShieldCheck,
    title: "Zero Operational Burden",
    items: [
      "We handle ALL compliance: DBS checks, safeguarding, insurance",
      "No internal headcount required to manage program",
      "Scalable model (10 students or 100 students, same effort from you)",
      "Legal/HR teams approve once, we handle ongoing operations",
      "Focus on strategy, not logistics"
    ],
    exampleTransformation: {
      from: "We can only offer placements to employees' children due to safeguarding complexity",
      to: "We're offering 50+ placements to students from underrepresented backgrounds, fully compliant"
    },
    jobToBeDone: "When facing safeguarding barriers, I have a trusted partner handling operational complexity"
  }
];

export function CorporateOpportunities() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What If You Could Solve All Four Challenges At Once?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Here's what's possible when you activate your diverse employees strategically
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {opportunities.map((opportunity, index) => {
            const Icon = opportunity.icon;
            return (
              <Card key={index} className="border-accent/30 bg-accent/5 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    {opportunity.title}
                  </h3>
                  
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">What You Get</p>
                    <ul className="space-y-2">
                      {opportunity.items.map((item, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Example or Use Case */}
                  {opportunity.exampleMetric && (
                    <div className="bg-background/50 rounded-lg p-3 mb-4 border border-accent/20">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">Example Metric</p>
                      <p className="text-sm text-foreground">{opportunity.exampleMetric}</p>
                    </div>
                  )}
                  
                  {opportunity.exampleUseCase && (
                    <div className="bg-background/50 rounded-lg p-3 mb-4 border border-accent/20">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">Example Use Case</p>
                      <p className="text-sm text-foreground">{opportunity.exampleUseCase}</p>
                    </div>
                  )}
                  
                  {opportunity.exampleTransformation && (
                    <div className="bg-background/50 rounded-lg p-3 mb-4 border border-accent/20">
                      <p className="text-xs font-semibold text-muted-foreground mb-2">Transformation</p>
                      <p className="text-xs text-destructive mb-1">From: "{opportunity.exampleTransformation.from}"</p>
                      <p className="text-xs text-accent">To: "{opportunity.exampleTransformation.to}"</p>
                    </div>
                  )}
                  
                  {/* Jobs to be Done */}
                  <div className="pt-3 border-t border-accent/20">
                    <p className="text-xs font-semibold text-accent mb-1">✓ Your Jobs-to-be-Done</p>
                    {opportunity.jobToBeDone && (
                      <p className="text-xs text-muted-foreground italic">"{opportunity.jobToBeDone}"</p>
                    )}
                    {opportunity.jobsToBeDone && opportunity.jobsToBeDone.map((job, idx) => (
                      <p key={idx} className="text-xs text-muted-foreground italic mb-1">"{job}"</p>
                    ))}
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
