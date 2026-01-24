import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Building2, School, Heart, Rocket, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

// Animated counter hook
function useAnimatedCounter(end: number, duration: number = 2000, suffix: string = "") {
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

  return { count, ref, suffix };
}

const stats = [
  {
    value: 9,
    suffix: "%",
    label: "Low SES representation in UK tech",
    context: "Students from working-class backgrounds are severely underrepresented",
    isProblem: true
  },
  {
    value: 26,
    suffix: "%",
    label: "Women in STEM workforce",
    context: "Fewer than 1 in 4 STEM workers are women",
    isProblem: true
  },
  {
    value: 65,
    suffix: "%",
    label: "White men dominate STEM roles",
    context: "Lack of diverse role models perpetuates the cycle",
    isProblem: true
  },
  {
    value: 40,
    suffix: "%",
    label: "Students changing STEM perception",
    context: "Our pilot target: Relatable mentors make the difference",
    isProblem: false
  }
];

const testimonialCategories = [
  { id: "corporate", label: "Corporate Leader", icon: Building2 },
  { id: "school", label: "School Rep", icon: School },
  { id: "mentor", label: "Mentor", icon: Heart },
  { id: "student", label: "Student", icon: Rocket }
];

const testimonials = [
  {
    category: "corporate",
    quote: "Placeholder for validation interview insight from corporate D&I leader discussing authentic social mobility impact.",
    name: "[Name]",
    role: "[Title]",
    organization: "[Company]",
    isPlaceholder: true
  },
  {
    category: "school",
    quote: "Placeholder for validation interview insight from school careers lead discussing student access to STEM role models.",
    name: "[Name]",
    role: "[Title]",
    organization: "[School]",
    isPlaceholder: true
  },
  {
    category: "mentor",
    quote: "Placeholder for validation interview insight from STEM professional discussing giving back to students from similar backgrounds.",
    name: "[Name]",
    role: "[Title]",
    organization: "[Company]",
    isPlaceholder: true
  },
  {
    category: "student",
    quote: "Placeholder for validation interview insight from student discussing how relatable mentorship changed their perception of STEM careers.",
    name: "[Name]",
    role: "Student",
    organization: "[School]",
    isPlaceholder: true
  }
];

function StatCard({ stat }: { stat: typeof stats[0] }) {
  const { count, ref } = useAnimatedCounter(stat.value, 2000);
  
  return (
    <div 
      ref={ref}
      className={cn(
        "text-center p-6 rounded-2xl border transition-all duration-300",
        stat.isProblem 
          ? "bg-card border-border/50" 
          : "bg-accent/10 border-accent/30"
      )}
    >
      <div className={cn(
        "text-5xl md:text-6xl font-bold mb-2",
        stat.isProblem ? "text-primary" : "text-accent"
      )}>
        {count}{stat.suffix}
      </div>
      {!stat.isProblem && (
        <span className="inline-block px-3 py-1 bg-accent/20 text-accent text-xs font-semibold rounded-full mb-2">
          PILOT TARGET
        </span>
      )}
      <p className={cn(
        "font-semibold mb-1",
        stat.isProblem ? "text-foreground" : "text-accent"
      )}>
        {stat.label}
      </p>
      <p className="text-sm text-muted-foreground">
        {stat.context}
      </p>
    </div>
  );
}

export function ImpactSection() {
  const [activeCategory, setActiveCategory] = useState("corporate");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate testimonials every 8 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      const currentIndex = testimonialCategories.findIndex(c => c.id === activeCategory);
      const nextIndex = (currentIndex + 1) % testimonialCategories.length;
      setActiveCategory(testimonialCategories[nextIndex].id);
    }, 8000);

    return () => clearInterval(interval);
  }, [activeCategory, isAutoPlaying]);

  const navigateTestimonial = (direction: 'prev' | 'next') => {
    setIsAutoPlaying(false);
    const currentIndex = testimonialCategories.findIndex(c => c.id === activeCategory);
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % testimonialCategories.length
      : (currentIndex - 1 + testimonialCategories.length) % testimonialCategories.length;
    setActiveCategory(testimonialCategories[newIndex].id);
  };

  const activeTestimonial = testimonials.find(t => t.category === activeCategory);

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Diversity Gap We're Addressing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Research-backed statistics revealing the barriers we're working to break down
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>

        {/* Partner/Trust Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-card rounded-2xl border border-border/50 p-8 text-center">
            {/* Wundr Space Logo */}
            <div className="mb-6">
              <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Gen-Connect
              </span>
            </div>
            
            <p className="text-foreground/80 mb-6">
              Targeting partnerships with <span className="font-semibold text-primary">Social Mobility Index Top 75</span> companies
            </p>

            {/* Partner Logo Placeholders */}
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i}
                  className="w-24 h-12 bg-muted/50 rounded-lg border border-dashed border-border flex items-center justify-center"
                >
                  <span className="text-xs text-muted-foreground">Partner {i}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground">
              Sources: UK Government, HESA, APPG on STEM Diversity
            </p>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-center text-foreground mb-6">
            Voices From Our Ecosystem
          </h3>

          {/* Category Toggle */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {testimonialCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setIsAutoPlaying(false);
                  }}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2",
                    activeCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </button>
              );
            })}
          </div>

          {/* Testimonial Card */}
          <div className="relative bg-card rounded-2xl border border-border/50 p-8 md:p-10">
            {/* Quote Icon */}
            <Quote className="absolute top-6 left-6 w-8 h-8 text-primary/20" />
            
            {/* Navigation Arrows */}
            <button
              onClick={() => navigateTestimonial('prev')}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <button
              onClick={() => navigateTestimonial('next')}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Content */}
            <div className="text-center px-8">
              {activeTestimonial?.isPlaceholder && (
                <span className="inline-block px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full mb-4">
                  Validation Interview Placeholder
                </span>
              )}
              
              <p className="text-lg md:text-xl text-foreground/80 italic mb-6 leading-relaxed">
                "{activeTestimonial?.quote}"
              </p>
              
              <div className="text-sm">
                <p className="font-semibold text-foreground">{activeTestimonial?.name}</p>
                <p className="text-muted-foreground">
                  {activeTestimonial?.role}, {activeTestimonial?.organization}
                </p>
              </div>
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonialCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setIsAutoPlaying(false);
                  }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    activeCategory === category.id
                      ? "bg-primary w-6"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                  aria-label={`View ${category.label} testimonial`}
                />
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-4">
            Testimonials will be added as we complete pilot validation
          </p>
        </div>
      </div>
    </section>
  );
}
