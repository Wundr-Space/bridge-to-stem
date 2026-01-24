import { useEffect, useRef, useState } from "react";
import { Lightbulb, Heart, TrendingUp, Quote } from "lucide-react";

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

const showedYouPoints = [
  "What STEM careers actually look like",
  "That \"people like me\" belong in tech",
  "How to navigate the pathway",
  "That imposter syndrome is normal",
];

const beThePersonPoints = [
  "Be the relatable role model you needed",
  "Change a student's entire trajectory",
  "Give back to your community",
  "Make a lasting difference",
];

export function WhyMentor() {
  const stat1 = useAnimatedCounter(65, 2000, "%");
  const stat2 = useAnimatedCounter(9, 2000, "%");
  const stat3 = useAnimatedCounter(26, 2000, "%");
  const stat4 = useAnimatedCounter(8, 2000, "%");
  const pilotStat = useAnimatedCounter(40, 2000, "%");

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Remember When You Couldn't See Your Path?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Many students today face the same challenges you once did
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1 - You Wished Someone Had Shown You */}
          <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <Lightbulb className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">
              "You Wished Someone Had Shown You"
            </h3>
            <ul className="space-y-3">
              {showedYouPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2 - The Numbers Show Why */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20 shadow-lg">
            <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
              <TrendingUp className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">
              "The Numbers Show Why"
            </h3>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div ref={stat1.ref} className="text-center p-3 bg-card/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{stat1.displayValue}</div>
                <p className="text-xs text-muted-foreground">STEM = White men</p>
              </div>
              <div ref={stat2.ref} className="text-center p-3 bg-card/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{stat2.displayValue}</div>
                <p className="text-xs text-muted-foreground">Tech = Low SES</p>
              </div>
              <div ref={stat3.ref} className="text-center p-3 bg-card/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{stat3.displayValue}</div>
                <p className="text-xs text-muted-foreground">STEM = Women</p>
              </div>
              <div ref={stat4.ref} className="text-center p-3 bg-card/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{stat4.displayValue}</div>
                <p className="text-xs text-muted-foreground">STEM = Ethnic minorities</p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground italic border-t border-border/50 pt-4">
              "If you never saw someone like you in tech, now you know why. These numbers show exactly what students face today."
            </p>
          </div>

          {/* Card 3 - Now You Can Be That Person */}
          <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
            <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mb-6">
              <Heart className="w-7 h-7 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">
              "Now You Can Be That Person"
            </h3>
            <ul className="space-y-3">
              {beThePersonPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Callout Quote */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-8 border border-accent/20 relative">
            <Quote className="absolute top-4 left-4 w-8 h-8 text-accent/30" />
            <div className="text-center pl-8">
              <p className="text-lg md:text-xl text-foreground leading-relaxed">
                In our pilot, <span ref={pilotStat.ref} className="font-bold text-accent text-2xl">{pilotStat.displayValue}</span> of students changed their perception of STEM careers after just 2 weeks with a relatable mentor.
              </p>
              <p className="text-primary font-semibold mt-4 text-lg">
                You can be that person.
              </p>
              <p className="text-xs text-muted-foreground mt-2 italic">
                * Pilot target based on research validation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
