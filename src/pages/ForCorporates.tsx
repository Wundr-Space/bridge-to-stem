import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight, X, Check, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

// Animated counter hook
function useAnimatedCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number;
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return { count, ref };
}

const challenges = [
  "Generic schools outreach lacks relatable connections",
  "Diverse employees want to give back, no structured pathway",
  "Work placements blocked by safeguarding/insurance",
  "CSR spend on education has no measurable ROI",
  "Can't prove authentic D&I impact to stakeholders"
];

const stats = [
  { value: 65, suffix: "%", label: "STEM workforce = White men", isProblem: true },
  { value: 9, suffix: "%", label: "Low SES backgrounds in tech", isProblem: true },
  { value: 16.9, suffix: "%", label: "Women in engineering/tech roles", isProblem: true }
];

function StatCard({ stat }: { stat: typeof stats[0] }) {
  const { count, ref } = useAnimatedCounter(Math.floor(stat.value), 2000);
  const hasDecimal = stat.value % 1 !== 0;
  
  return (
    <div ref={ref} className="text-center p-6 bg-card rounded-xl border border-border/50">
      <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
        {count}{hasDecimal ? '.9' : ''}{stat.suffix}
      </div>
      <p className="text-sm text-muted-foreground">{stat.label}</p>
    </div>
  );
}

const ForCorporates = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6">
                <Building2 className="w-4 h-4" />
                For Corporates
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Activate Your Employees for{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Authentic Social Mobility Impact
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                We partner with Social Mobility Index companies to turn diverse employees into relatable mentors, proving measurable D&I outcomes beyond donations
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="brand" className="text-base" asChild>
                  <Link to="/contact?type=corporate">
                    Request Pilot Information
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-base">
                  <Download className="w-5 h-5 mr-2" />
                  Download Impact Framework
                </Button>
              </div>
            </div>

            {/* Right - Hero Image Placeholder */}
            <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl border border-border/50 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 rounded-full bg-muted/80 mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-border">
                    <Building2 className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-sm">Hero Image Placeholder</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">Diverse professionals in tech environment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section - The Authenticity Gap */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              The Authenticity Gap
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Why traditional approaches fail to create lasting social mobility impact
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 max-w-6xl mx-auto">
            {/* Left - Current Challenges */}
            <div className="bg-card rounded-2xl border border-border/50 p-8">
              <h3 className="text-xl font-semibold text-foreground mb-6">
                Current Challenges
              </h3>
              <ul className="space-y-4">
                {challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-4 h-4 text-destructive" />
                    </div>
                    <span className="text-foreground/80">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right - The Numbers Tell the Story */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-6">
                The Numbers Tell the Story
              </h3>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {stats.map((stat, index) => (
                  <StatCard key={index} stat={stat} />
                ))}
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                These gaps exist because generic outreach doesn't create relatable connections. 
                <span className="text-foreground font-medium"> Your diverse employees are the solution.</span>
              </p>

              {/* Callout Box */}
              <div className="bg-accent/10 border border-accent/30 rounded-xl p-6">
                <p className="text-sm font-medium text-foreground mb-3">
                  Built for companies on the <span className="text-primary">Social Mobility Index Top 75</span>
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-accent" />
                    <span className="text-sm text-muted-foreground">Our pilot target:</span>
                  </div>
                  <span className="text-2xl font-bold text-accent">40%</span>
                  <span className="text-sm text-muted-foreground">of students change STEM perception through relatable mentorship</span>
                </div>
                <span className="inline-block mt-2 px-2 py-0.5 bg-accent/20 text-accent text-xs font-semibold rounded-full">
                  PILOT TARGET
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ForCorporates;
