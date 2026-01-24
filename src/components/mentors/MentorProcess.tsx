import { 
  UserPlus, 
  Users, 
  Briefcase, 
  MessageCircle
} from "lucide-react";

const steps = [
  {
    step: 1,
    title: "Sign Up",
    duration: "15 mins",
    icon: UserPlus,
    points: [
      "Complete mentor profile",
      "Share your background and journey",
      "We handle DBS check",
      "Company-approved volunteering"
    ]
  },
  {
    step: 2,
    title: "Get Matched",
    duration: "We do this",
    icon: Users,
    points: [
      "Matched with students from similar backgrounds",
      "Same school type, similar demographics",
      "Aligned interests and career aspirations",
      "You review and approve match"
    ]
  },
  {
    step: 3,
    title: "Change a Life",
    duration: "2 weeks",
    icon: Briefcase,
    points: [
      "Be the proof they've been waiting for",
      "Show them what's possible for 'someone like me'",
      "Share your real story - struggles and all",
      "Watch their confidence transform"
    ]
  },
  {
    step: 4,
    title: "Optional Ongoing",
    duration: "Your choice",
    icon: MessageCircle,
    points: [
      "Stay connected if you want",
      "A-Level guidance",
      "University application support",
      "Or just the 2-week placement"
    ]
  }
];


export function MentorProcess() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Simple, Supported, Flexible
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Low Commitment, High Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We've designed the process to be as simple as possible for you
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div 
                key={step.step} 
                className="bg-card rounded-2xl p-6 border border-border shadow-lg relative"
              >
                {/* Step number badge */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                  {step.step}
                </div>
                
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-accent font-medium mb-4">
                  {step.duration}
                </p>
                
                <ul className="space-y-2">
                  {step.points.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{point}</span>
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
