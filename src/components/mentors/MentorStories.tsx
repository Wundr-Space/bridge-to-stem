import { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    quote: "Growing up in a council estate in Birmingham, I never imagined I'd work at a major tech company. Being able to show a student from a similar background that it's possible – that's the most meaningful thing I've done in my career.",
    name: "Priya S.",
    role: "Senior Software Engineer at Microsoft",
    background: "First-gen university grad, grew up in Birmingham",
  },
  {
    quote: "I wish someone had shown me what a career in data science actually looked like when I was 15. Now I get to be that person for students who are where I was – uncertain, but curious. It's incredibly rewarding.",
    name: "Marcus T.",
    role: "Data Scientist at Barclays",
    background: "State school, first in family to work in tech",
  },
  {
    quote: "Watching my mentee go from 'I'm not smart enough for tech' to 'I'm applying for Computer Science A-Level' in just two weeks – that shift is exactly why I do this. Representation really does change everything.",
    name: "Fatima K.",
    role: "Engineering Manager at Google",
    background: "Comprehensive school in East London",
  },
];

export function MentorStories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <section id="mentor-stories" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Hear from Mentors Like You
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real mentors sharing their experiences
          </p>
          <p className="text-sm text-muted-foreground mt-2 italic">
            * Testimonials based on pilot validation interviews
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Testimonial Card */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12 border border-border shadow-lg min-h-[320px] flex flex-col justify-center">
              <Quote className="w-12 h-12 text-accent/30 mb-6" />
              
              <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-8">
                "{testimonials[currentIndex].quote}"
              </blockquote>
              
              <div className="border-t border-border pt-6">
                <p className="font-semibold text-foreground text-lg">
                  {testimonials[currentIndex].name}
                </p>
                <p className="text-primary font-medium">
                  {testimonials[currentIndex].role}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {testimonials[currentIndex].background}
                </p>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevious}
                className="rounded-full shadow-md bg-card hover:bg-muted"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-6">
              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                className="rounded-full shadow-md bg-card hover:bg-muted"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex 
                    ? "bg-primary w-8" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
