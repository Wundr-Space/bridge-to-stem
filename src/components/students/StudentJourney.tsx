import { 
  ClipboardCheck, 
  Puzzle, 
  BookOpen, 
  Building2, 
  Map,
  CheckCircle2
} from "lucide-react";

const steps = [
  {
    step: 1,
    title: "Apply",
    icon: ClipboardCheck,
    points: [
      "Fill out simple application",
      "Tell us about your interests",
      "Your school nominates you",
      "Takes 10 minutes"
    ]
  },
  {
    step: 2,
    title: "Get Matched",
    icon: Puzzle,
    points: [
      "We match you with a mentor",
      "Someone from similar background",
      "Working at a major tech company",
      "You'll get their story before you meet"
    ]
  },
  {
    step: 3,
    title: "Prepare",
    icon: BookOpen,
    points: [
      "Quick orientation session",
      "What to expect during placement",
      "How to make the most of it",
      "Questions you might want to ask"
    ]
  },
  {
    step: 4,
    title: "Your Placement",
    duration: "2 Weeks",
    icon: Building2,
    points: [
      "Shadow your mentor at work",
      "See what they actually do",
      "Work on real projects",
      "Ask ALL your questions"
    ]
  },
  {
    step: 5,
    title: "What's Next?",
    duration: "Your Choice",
    icon: Map,
    points: [
      "Reflect on what you learned",
      "Get help with GCSE/A-Level choices",
      "Stay in touch with mentor (if you want)",
      "Optional ongoing support"
    ]
  }
];

export function StudentJourney() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
            Your Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What to Expect
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From application to placement - here's how it works
          </p>
        </div>

        {/* Journey Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Connecting line - visible on md and up */}
            <div className="hidden md:block absolute top-8 left-8 right-8 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full" />
            
            {/* Steps */}
            <div className="grid md:grid-cols-5 gap-6">
              {steps.map((step) => {
                const IconComponent = step.icon;
                return (
                  <div key={step.step} className="relative">
                    {/* Step card */}
                    <div className="bg-card rounded-2xl p-5 border border-border shadow-lg h-full">
                      {/* Step number circle */}
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4 mx-auto relative z-10 shadow-lg">
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      
                      <div className="text-center mb-3">
                        <h3 className="text-lg font-bold text-foreground">
                          {step.title}
                        </h3>
                        {step.duration && (
                          <p className="text-sm text-accent font-medium">
                            {step.duration}
                          </p>
                        )}
                      </div>
                      
                      <ul className="space-y-2">
                        {step.points.map((point, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
