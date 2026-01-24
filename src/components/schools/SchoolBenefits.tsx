import { Briefcase, Users, Compass, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Briefcase,
    title: "Quality Placements",
    items: [
      "2-week work experience at major STEM companies",
      "Microsoft, Google, Amazon, Meta, etc.",
      "Safe, supervised environments",
      "Goes beyond \"local shop\" work experience"
    ]
  },
  {
    icon: Users,
    title: "Relatable Mentors",
    items: [
      "Mentors from similar backgrounds",
      "\"Went to schools like mine\"",
      "Shared experiences and identities",
      "Challenges limited perceptions"
    ]
  },
  {
    icon: Compass,
    title: "Career Guidance",
    items: [
      "Guidance at critical decision points",
      "GCSE options (Year 9)",
      "A-Level choices (Year 11)",
      "University applications support"
    ]
  },
  {
    icon: TrendingUp,
    title: "Long-term Support",
    items: [
      "Optional ongoing mentorship",
      "Through A-Levels and beyond",
      "Build lasting professional relationships",
      "Pathway to STEM careers"
    ]
  }
];

export function SchoolBenefits() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Real Opportunities, Real Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Benefits that transform your students' futures
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={index} 
                className="bg-card rounded-2xl p-6 border border-border shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {benefit.title}
                </h3>
                <ul className="space-y-2">
                  {benefit.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-muted-foreground text-sm flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
