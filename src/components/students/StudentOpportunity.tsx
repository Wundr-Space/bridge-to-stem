import { Building2, Heart, Rocket } from "lucide-react";

const opportunities = [
  {
    title: "Real Companies",
    icon: Building2,
    points: [
      "Work experience at Microsoft, Google, Amazon, Meta",
      "See what tech jobs actually involve",
      "Not your typical \"work experience\"",
      "Professional environment, real projects"
    ]
  },
  {
    title: "Relatable Mentors",
    icon: Heart,
    points: [
      "Mentors who \"went to schools like mine\"",
      "Understand your background",
      "Share their real journey",
      "Answer honest questions"
    ]
  },
  {
    title: "Your Future",
    icon: Rocket,
    points: [
      "Help with GCSE and A-Level choices",
      "University application support",
      "Career pathway guidance",
      "Prove \"I can do this\""
    ]
  }
];

export function StudentOpportunity() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            This Could Change Everything
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real opportunities that open real doors
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {opportunities.map((opp, index) => {
            const IconComponent = opp.icon;
            return (
              <div 
                key={index} 
                className="bg-card rounded-2xl p-8 border-2 border-border shadow-lg hover:border-accent/50 transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-6">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {opp.title}
                </h3>
                
                <ul className="space-y-3">
                  {opp.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{point}</span>
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
