import { useEffect, useRef, useState } from "react";
import { Users, UserX, User, HelpCircle } from "lucide-react";

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

const doubts = [
  {
    doubt: "\"I don't know anyone in tech\"",
    counter: "That's the problem - only 9% of tech workers come from backgrounds like yours. You're about to meet one.",
    icon: Users,
  },
  {
    doubt: "\"Tech is for posh kids, not people like me\"",
    counter: "65% of STEM workers are white men. We're proving it doesn't have to stay that way.",
    icon: UserX,
  },
  {
    doubt: "\"I'd be the only [girl/minority] there\"",
    counter: "Women are just 26% of STEM. Your mentor was 'the only one' too - they'll help you navigate that.",
    icon: User,
  },
  {
    doubt: "\"I don't even know what tech jobs involve\"",
    counter: "That's exactly why you should apply. See the reality, not the stereotype.",
    icon: HelpCircle,
  },
];

export function WhyThisMatters() {
  const stat1 = useAnimatedCounter(9, 2000, "%");
  const stat2 = useAnimatedCounter(26, 2000, "%");
  const stat3 = useAnimatedCounter(8, 2000, "%");
  const stat4 = useAnimatedCounter(65, 2000, "%");
  const pilotStat = useAnimatedCounter(40, 2000, "%");

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            It's Not Just You - The Numbers Tell the Story
          </h2>
        </div>

        {/* Narrative Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12 border border-border">
            <div className="prose prose-lg max-w-none text-foreground leading-relaxed space-y-6">
              <p>
                Right now, only{" "}
                <span ref={stat1.ref} className="text-2xl font-bold text-primary">{stat1.displayValue}</span>{" "}
                of people working in tech come from backgrounds like yours.
              </p>
              
              <p>
                Just{" "}
                <span ref={stat2.ref} className="text-2xl font-bold text-primary">{stat2.displayValue}</span>{" "}
                of STEM workers are women. Only{" "}
                <span ref={stat3.ref} className="text-2xl font-bold text-primary">{stat3.displayValue}</span>{" "}
                are from ethnic minority backgrounds.
              </p>
              
              <p>
                Here's what that really means:{" "}
                <span ref={stat4.ref} className="text-2xl font-bold text-destructive">{stat4.displayValue}</span>{" "}
                of STEM jobs are held by white men.
              </p>
              
              <p className="text-muted-foreground italic border-l-4 border-accent pl-4">
                So if you've never seen someone who looks like you, sounds like you, or went 
                to a school like yours working in tech - <strong className="text-foreground">that's exactly the problem we're solving.</strong>
              </p>
              
              <p>
                Because it's not that you can't do it. It's that you've never seen proof that 
                someone like you can.
              </p>
              
              <div className="text-center py-6 border-y border-border my-6">
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
                  That changes with us.
                </p>
              </div>
              
              <p>
                In our pilot program, we're proving that{" "}
                <span ref={pilotStat.ref} className="text-2xl font-bold text-accent">{pilotStat.displayValue}</span>{" "}
                of students completely change how they see STEM careers after just 2 weeks 
                with a mentor from a similar background.
              </p>
              
              <p className="font-semibold">
                Not because the work changed. Because they finally saw themselves in it.
              </p>
              
              <p className="text-xs text-muted-foreground italic text-center mt-4">
                * Pilot target based on research validation
              </p>
            </div>
          </div>
        </div>

        {/* Doubt Cards */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Sound familiar? Let's address that.
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {doubts.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={index} 
                  className="bg-card rounded-xl p-6 border-2 border-border hover:border-accent/50 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-destructive group-hover:text-accent transition-colors" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-2">{item.doubt}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.counter}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
