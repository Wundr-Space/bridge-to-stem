import { ArrowDown, Play, Briefcase, Users, UserCircle, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import heroImage from "@/assets/hero-mentorship.jpg";

// Animated counter hook
function useAnimatedCounter(target: number, duration: number = 2000, suffix: string = "") {
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
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * target));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return { count, ref, displayValue: `${count}${suffix}` };
}

export function HeroSection() {
  const scrollToAudience = () => {
    document.getElementById("audience")?.scrollIntoView({ behavior: "smooth" });
  };

  // Animated counters for each stat
  const stat1 = useAnimatedCounter(9, 1500, "%");
  const stat2 = useAnimatedCounter(26, 1500, "%");
  const stat3 = useAnimatedCounter(65, 1500, "%");
  const stat4 = useAnimatedCounter(40, 1500, "%");

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Decorative shapes */}
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm font-medium text-accent">Launching Q2 2026 • Pilot Phase</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Connecting Relatable STEM Mentors with the{" "}
              <span className="text-gradient-brand">Next Generation</span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
              We activate diverse professionals as role models for students from similar backgrounds, proving that STEM careers are{" "}
              <span className="text-foreground font-semibold">for everyone</span>.
            </p>

            <p className="text-base text-muted-foreground/80 max-w-lg mx-auto lg:mx-0">
              Bridging the gap between major tech companies, state schools, STEM professionals, and students who need to see 'someone like me' succeed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Button 
                variant="brand" 
                size="lg" 
                onClick={scrollToAudience}
                className="group"
              >
                Find Your Pathway
                <ArrowDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="group">
                <Play className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                Watch How It Works
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in-up">
            <div className="relative rounded-2xl overflow-hidden shadow-hero">
              <img
                src={heroImage}
                alt="Diverse STEM mentor guiding students in a modern tech environment"
                className="w-full h-auto object-cover aspect-[4/3]"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-background rounded-xl p-4 shadow-card border border-border/50 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-brand flex items-center justify-center">
                  <span className="text-white text-xl">🎯</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Mission Driven</p>
                  <p className="text-xs text-muted-foreground">Social Mobility Focus</p>
                </div>
              </div>
            </div>

            {/* Floating card 2 */}
            <div className="absolute -top-4 -right-4 bg-background rounded-xl p-4 shadow-card border border-border/50 animate-float-delayed">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">STEM Careers</p>
                  <p className="text-xs text-muted-foreground">Accessible to All</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Diversity Gap Stats Section */}
        <div className="mt-16 lg:mt-24 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              The Diversity Gap We're Addressing
            </h2>
            <p className="text-muted-foreground">The challenge is clear. Our solution is focused.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Stat 1 - Problem */}
            <div 
              ref={stat1.ref}
              className="bg-card/50 backdrop-blur-sm rounded-xl p-5 border border-primary/20 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-medium text-primary/80 uppercase tracking-wider">Problem</span>
              </div>
              <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                {stat1.displayValue}
              </p>
              <p className="text-sm font-semibold text-foreground mb-1">Low SES representation in UK tech</p>
              <p className="text-xs text-muted-foreground">Students from working-class backgrounds are severely underrepresented</p>
            </div>

            {/* Stat 2 - Problem */}
            <div 
              ref={stat2.ref}
              className="bg-card/50 backdrop-blur-sm rounded-xl p-5 border border-primary/20 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserCircle className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-medium text-primary/80 uppercase tracking-wider">Problem</span>
              </div>
              <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                {stat2.displayValue}
              </p>
              <p className="text-sm font-semibold text-foreground mb-1">Women in STEM workforce</p>
              <p className="text-xs text-muted-foreground">Fewer than 1 in 4 STEM workers are women</p>
            </div>

            {/* Stat 3 - Problem */}
            <div 
              ref={stat3.ref}
              className="bg-card/50 backdrop-blur-sm rounded-xl p-5 border border-primary/20 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-medium text-primary/80 uppercase tracking-wider">Problem</span>
              </div>
              <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                {stat3.displayValue}
              </p>
              <p className="text-sm font-semibold text-foreground mb-1">White men dominate STEM</p>
              <p className="text-xs text-muted-foreground">Lack of diverse role models perpetuates the cycle</p>
            </div>

            {/* Stat 4 - YOUR Target (Different styling) */}
            <div 
              ref={stat4.ref}
              className="bg-gradient-to-br from-accent/10 to-accent/5 backdrop-blur-sm rounded-xl p-5 border border-accent/30 hover:border-accent/50 transition-colors relative overflow-hidden"
            >
              <div className="absolute top-2 right-2">
                <span className="text-[10px] font-bold text-accent bg-accent/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Pilot Target
                </span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-accent" />
                </div>
                <span className="text-xs font-medium text-accent uppercase tracking-wider">Our Goal</span>
              </div>
              <p className="text-4xl lg:text-5xl font-bold text-accent mb-2">
                {stat4.displayValue}
              </p>
              <p className="text-sm font-semibold text-foreground mb-1">STEM perception shift</p>
              <p className="text-xs text-muted-foreground">Students who change their view after relatable mentorship</p>
            </div>
          </div>

          {/* Source citation */}
          <p className="text-center text-xs text-muted-foreground/60 mt-6">
            Source: UK Government, HESA, APPG on STEM Diversity, STEM Women Research (2024)
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-muted-foreground/50 rounded-full animate-scroll-indicator" />
        </div>
      </div>
    </section>
  );
}
