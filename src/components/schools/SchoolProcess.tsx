import { ClipboardCheck, UserCheck, Building2, BarChart3, CheckCircle2 } from "lucide-react";

const processSteps = [
  {
    icon: ClipboardCheck,
    title: "Register Your School",
    timeline: "Week 1",
    items: [
      "Simple online application",
      "Tell us about your students",
      "Identify target year groups (typically Year 10)"
    ]
  },
  {
    icon: UserCheck,
    title: "We Match Students",
    timeline: "Week 2-3",
    items: [
      "Based on background, interests, demographics",
      "Match with relatable corporate mentors",
      "We handle all safeguarding/DBS checks"
    ]
  },
  {
    icon: Building2,
    title: "Placements Happen",
    timeline: "Ongoing",
    items: [
      "2-week work experience during term breaks",
      "Company handles insurance and logistics",
      "Your staff involvement: minimal"
    ]
  },
  {
    icon: BarChart3,
    title: "Track Impact",
    timeline: "Post-placement",
    items: [
      "Student feedback surveys",
      "Career pathway tracking",
      "Data for OFSTED reporting",
      "Measurable community engagement"
    ]
  }
];

const zeroCostBenefits = [
  "Fully funded by corporate partners",
  "No admin overhead for your team",
  "We coordinate everything",
  "You focus on education"
];

export function SchoolProcess() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works for Schools
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A simple process designed to minimize your workload
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/30 transform md:-translate-x-1/2" />

          <div className="space-y-8">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={index} 
                  className={`relative flex items-start gap-6 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline node */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 mt-6 ring-4 ring-background z-10" />
                  
                  {/* Content card */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="bg-card rounded-2xl p-6 border border-border shadow-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground">{step.title}</h3>
                          <span className="text-xs font-medium text-accent">{step.timeline}</span>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {step.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-muted-foreground text-sm flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Zero Cost, Zero Burden */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-8 border border-accent/20 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Zero Cost, Zero Burden
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {zeroCostBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 justify-center">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground font-medium text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
