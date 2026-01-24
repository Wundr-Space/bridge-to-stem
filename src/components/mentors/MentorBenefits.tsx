import { 
  Heart, 
  TrendingUp, 
  Building2, 
  CheckCircle2,
  Shield,
  Users,
  BookOpen,
  MessageSquare,
  Headphones
} from "lucide-react";

const benefits = [
  {
    title: "Personal Fulfillment",
    icon: Heart,
    color: "accent",
    points: [
      "Make tangible difference",
      "Help someone like you",
      "See direct impact",
      "Overcome barriers you faced"
    ]
  },
  {
    title: "Professional Growth",
    icon: TrendingUp,
    color: "primary",
    points: [
      "Develop mentoring skills",
      "Give back through work",
      "Strengthen communication",
      "Fresh perspectives from students"
    ]
  },
  {
    title: "Company Support",
    icon: Building2,
    color: "primary",
    points: [
      "Use your impact hours to inspire people like you",
      "Fully supported by employer",
      "Insurance coverage",
      "Part of D&I initiatives"
    ]
  }
];

const supportItems = [
  { icon: Shield, text: "Full DBS and safeguarding training" },
  { icon: BookOpen, text: "Mentor orientation and guidelines" },
  { icon: Headphones, text: "Dedicated support contact" },
  { icon: MessageSquare, text: "Platform tools and resources" },
  { icon: Users, text: "Community of fellow mentors" },
  { icon: Building2, text: "Company HR/D&I team backing" },
];

export function MentorBenefits() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What You Get
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mentoring is rewarding - and we make sure you're fully supported
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            const bgColor = benefit.color === "accent" ? "bg-accent/20" : "bg-primary/10";
            const iconColor = benefit.color === "accent" ? "text-accent" : "text-primary";
            const bulletColor = benefit.color === "accent" ? "bg-accent" : "bg-primary";
            
            return (
              <div 
                key={index} 
                className="bg-card rounded-2xl p-8 border border-border shadow-lg text-center"
              >
                <div className={`w-16 h-16 ${bgColor} rounded-xl flex items-center justify-center mx-auto mb-6`}>
                  <IconComponent className={`w-8 h-8 ${iconColor}`} />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {benefit.title}
                </h3>
                
                <ul className="space-y-3 text-left">
                  {benefit.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-3">
                      <div className={`w-2 h-2 ${bulletColor} rounded-full mt-2 flex-shrink-0`} />
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Support You'll Receive */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-xl font-bold text-foreground mb-6 text-center">
              Support You'll Receive
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {supportItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="flex items-center gap-3 bg-card/50 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-foreground text-sm">{item.text}</span>
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
