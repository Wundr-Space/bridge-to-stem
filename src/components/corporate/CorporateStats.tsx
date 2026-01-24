import { useEffect, useRef, useState } from "react";

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

const stats = [
  { 
    value: 65, 
    suffix: "%", 
    label: "STEM workforce = White men", 
    context: "Your diverse employees are the solution to representation gaps",
    isProblem: true 
  },
  { 
    value: 9, 
    suffix: "%", 
    label: "Low SES backgrounds in UK tech", 
    context: "Students need to see 'someone like me' succeed",
    isProblem: true 
  },
  { 
    value: 16.9, 
    suffix: "%", 
    label: "Women in engineering/tech roles", 
    context: "Girls don't pursue STEM because they don't see women doing it",
    isProblem: true,
    hasDecimal: true
  },
  { 
    value: 40, 
    suffix: "%", 
    label: "Our pilot target: Students changing perception", 
    context: "Relatable mentors make the measurable difference",
    isProblem: false,
    isTarget: true
  }
];

function StatCard({ stat }: { stat: typeof stats[0] }) {
  const { count, ref } = useAnimatedCounter(Math.floor(stat.value), 2000);
  
  return (
    <div 
      ref={ref} 
      className={`text-center p-6 rounded-xl border ${
        stat.isTarget 
          ? 'bg-accent/10 border-accent/30' 
          : 'bg-card border-border/50'
      }`}
    >
      {stat.isTarget && (
        <span className="inline-block px-2 py-0.5 bg-accent/20 text-accent text-xs font-semibold rounded-full mb-2">
          PILOT TARGET
        </span>
      )}
      <div className={`text-4xl md:text-5xl font-bold mb-2 ${
        stat.isTarget ? 'text-accent' : 'text-primary'
      }`}>
        {count}{stat.hasDecimal ? '.9' : ''}{stat.suffix}
      </div>
      <p className="text-sm font-medium text-foreground mb-2">{stat.label}</p>
      <p className="text-xs text-muted-foreground">{stat.context}</p>
    </div>
  );
}

export function CorporateStats() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Diversity Gaps Your Program Will Address
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-lg text-muted-foreground">
            These aren't just statistics.{" "}
            <span className="text-foreground font-medium">They're the students your employees can reach.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
