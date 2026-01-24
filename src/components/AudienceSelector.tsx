import { Building2, School, Heart, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const audiences = [
  {
    id: "corporates",
    icon: Building2,
    headline: "Tech & STEM Companies",
    description: "Activate your diverse employees as mentors and demonstrate authentic social mobility impact",
    benefits: [
      "Measurable ESG/D&I outcomes",
      "Employee engagement programs",
      "We handle all compliance"
    ],
    cta: "Explore Corporate Solutions",
    link: "/for-corporates",
    accentClass: "from-primary to-primary/80"
  },
  {
    id: "schools",
    icon: School,
    headline: "Secondary Schools",
    description: "Connect your students with quality STEM placements and relatable role models from major companies",
    benefits: [
      "Free access to mentor network",
      "Quality work placements",
      "Zero admin burden"
    ],
    cta: "Explore School Partnerships",
    link: "/for-schools",
    accentClass: "from-accent to-accent/80"
  },
  {
    id: "mentors",
    icon: Heart,
    headline: "STEM Professionals",
    description: "Give back to students from similar backgrounds and help them see that STEM careers are achievable",
    benefits: [
      "Meaningful volunteering",
      "Flexible commitment",
      "Company-supported"
    ],
    cta: "Become a Mentor",
    link: "/for-mentors",
    accentClass: "from-secondary to-secondary/80"
  },
  {
    id: "students",
    icon: Rocket,
    headline: "Students (Ages 14-18)",
    description: "Get real work experience with mentors who share your background and prove that STEM is for you",
    benefits: [
      "2-week work placements",
      "Relatable mentors",
      "Career guidance support"
    ],
    cta: "Start Your Journey",
    link: "/for-students",
    accentClass: "from-accent to-primary"
  }
];

export function AudienceSelector() {
  return (
    <section id="audience" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose Your Pathway
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how Wundr Space creates impact for your role
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {audiences.map((audience) => {
            const Icon = audience.icon;
            return (
              <Link 
                key={audience.id} 
                to={audience.link}
                className="group block"
              >
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/50 bg-card overflow-hidden">
                  {/* Accent Bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${audience.accentClass}`} />
                  
                  <CardContent className="p-6 md:p-8">
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${audience.accentClass} mb-5`}>
                      <Icon className="w-7 h-7 text-primary-foreground" />
                    </div>

                    {/* Headline */}
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {audience.headline}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground mb-5 leading-relaxed">
                      {audience.description}
                    </p>

                    {/* Benefits */}
                    <ul className="space-y-2 mb-6">
                      {audience.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-foreground/80">
                          <span className="text-accent mt-0.5">•</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all"
                    >
                      {audience.cta}
                      <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
