import { ArrowDown, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-mentorship.jpg";

export function HeroSection() {
  const scrollToAudience = () => {
    document.getElementById("audience")?.scrollIntoView({ behavior: "smooth" });
  };

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
              Bridging the gap between major tech companies, public schools, STEM professionals, and students who need to see 'someone like me' succeed.
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

            {/* Stats - Research-backed, honest pre-launch messaging */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-border/50">
              <div className="text-center lg:text-left">
                <p className="text-3xl lg:text-4xl font-bold text-primary">9%</p>
                <p className="text-sm text-muted-foreground">Low SES representation in UK tech</p>
                <p className="text-xs text-muted-foreground/70 mt-1">The gap we're solving</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-3xl lg:text-4xl font-bold text-primary">75+</p>
                <p className="text-sm text-muted-foreground">Social Mobility Index companies</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Our target partners</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-3xl lg:text-4xl font-bold text-accent">Q2 2026</p>
                <p className="text-sm text-muted-foreground">Pilot launch</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Limited founding spots</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-3xl lg:text-4xl font-bold text-primary">40%</p>
                <p className="text-sm text-muted-foreground">Target: STEM perception shift</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Our pilot impact goal</p>
              </div>
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
