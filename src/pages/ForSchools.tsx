import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SchoolBenefits } from "@/components/schools/SchoolBenefits";
import { SchoolProcess } from "@/components/schools/SchoolProcess";
import { SchoolOfsted } from "@/components/schools/SchoolOfsted";
import { SchoolForm } from "@/components/forms/SchoolForm";
import { 
  Users, 
  Building2, 
  GraduationCap,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ChevronDown
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Animated counter hook
function useAnimatedCounter(target: number, duration: number = 2000, suffix: string = "") {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const startTime = performance.now();
            
            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeOut = 1 - Math.pow(1 - progress, 3);
              setCount(Math.floor(easeOut * target));
              
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return { count, ref, displayValue: `${count}${suffix}` };
}

const challenges = [
  "Limited careers staff capacity (0.5 FTE for 1,500 students)",
  "Difficulty finding quality STEM work placements",
  "No alumni network or professional connections",
  "OFSTED criticism of community engagement",
  "Students lack exposure to diverse career paths",
  "Generic STEM outreach doesn't create relatability"
];

const benefits = [
  "Access to diverse STEM professionals willing to mentor",
  "Quality work placements at major tech companies",
  "Zero administrative burden (we handle logistics)",
  "Relatable role models from similar backgrounds",
  "OFSTED-relevant community engagement metrics",
  "Turn-key solution requiring minimal staff time"
];

export default function ForSchools() {
  const stat1 = useAnimatedCounter(9, 2000, "%");
  const stat2 = useAnimatedCounter(31, 2000, "%");
  const stat3 = useAnimatedCounter(8, 2000, "%");

  const scrollToRegister = () => {
    document.getElementById('register-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToImpact = () => {
    document.getElementById('value-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="School Partnerships | Free STEM Mentors & Work Placements"
        description="Free access to diverse STEM professionals and quality work placements. Zero admin burden, OFSTED-relevant community engagement metrics."
        keywords="school partnerships, STEM mentors, work placements, OFSTED engagement, careers education, free for schools"
      />
      <Navbar />
      
      <main id="main-content">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          <div className="absolute top-20 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Content */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
                  <GraduationCap className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-accent">For Schools</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Connect Your Students with{" "}
                  <span className="text-primary">Relatable STEM Role Models</span>
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Free access to diverse professionals from major tech companies who can show 
                  students that "people like me" succeed in STEM
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="text-lg px-8 py-6"
                    onClick={scrollToRegister}
                  >
                    Register Your School
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-lg px-8 py-6"
                    onClick={scrollToImpact}
                  >
                    See Impact Data
                    <ChevronDown className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
              
              {/* Right - Hero Image */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                    alt="Students collaborating in a modern classroom environment"
                    className="w-full h-[400px] md:h-[500px] object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                </div>
                
                {/* Floating card */}
                <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">100% Free</p>
                      <p className="text-sm text-muted-foreground">For qualifying schools</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition Section */}
        <section id="value-section" className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                What We Solve
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Understanding your challenges and providing real solutions
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left - Challenges */}
              <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-destructive" />
                  </div>
                  Your Challenges
                </h3>
                <ul className="space-y-4">
                  {challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right - Stats & Barriers */}
              <div className="space-y-8">
                <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
                  <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    The Barriers Your Students Face
                  </h3>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div ref={stat1.ref} className="text-center p-4 bg-muted/50 rounded-xl">
                      <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                        {stat1.displayValue}
                      </div>
                      <p className="text-xs text-muted-foreground leading-tight">
                        Working-class students in tech workforce
                      </p>
                    </div>
                    <div ref={stat2.ref} className="text-center p-4 bg-muted/50 rounded-xl">
                      <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                        {stat2.displayValue}
                      </div>
                      <p className="text-xs text-muted-foreground leading-tight">
                        Core STEM students who are women/non-binary
                      </p>
                    </div>
                    <div ref={stat3.ref} className="text-center p-4 bg-muted/50 rounded-xl">
                      <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                        {stat3.displayValue}
                      </div>
                      <p className="text-xs text-muted-foreground leading-tight">
                        Ethnic minority representation in STEM
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-center italic border-t border-border pt-4">
                    "Your students don't lack ability — they lack exposure to people 'like them' 
                    who've succeeded in STEM. We provide that connection."
                  </p>
                </div>
              </div>
            </div>

            {/* What You Get - FREE */}
            <div className="mt-12 bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-8 border border-accent/20">
              <div className="text-center mb-8">
                <span className="inline-block px-4 py-1 bg-accent text-accent-foreground rounded-full text-sm font-semibold mb-4">
                  COMPLETELY FREE
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  What You Get
                </h3>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 bg-card/50 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              
              {/* Callout */}
              <div className="mt-8 text-center">
                <div className="inline-block bg-primary/10 border border-primary/20 rounded-xl px-6 py-4">
                <p className="text-primary font-semibold">
                  Purpose-built for state secondary schools focusing on Alumni connections
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <SchoolBenefits />

        {/* How It Works Section */}
        <SchoolProcess />

        {/* OFSTED Section */}
        <SchoolOfsted />

        {/* Registration Form */}
        <section id="register-form" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Register Your School
                </h2>
                <p className="text-lg text-muted-foreground">
                  Join our network and give your students access to relatable STEM mentors
                </p>
              </div>
              
              <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
                <SchoolForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
