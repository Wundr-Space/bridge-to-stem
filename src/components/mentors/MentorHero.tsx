import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Users } from "lucide-react";

interface MentorHeroProps {
  onBecomeaMentor: () => void;
  onSeeStories: () => void;
}

export function MentorHero({ onBecomeaMentor, onSeeStories }: MentorHeroProps) {
  return (
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
              <Users className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">For Mentors</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Help Students Who Share Your Story See{" "}
              <span className="text-primary">STEM as Achievable</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Give back to students from backgrounds like yours. Show them someone 
              "like me" can succeed in tech.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={onBecomeaMentor}
              >
                Become a Mentor
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6"
                onClick={onSeeStories}
              >
                See Mentor Stories
                <ChevronDown className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
          
          {/* Right - Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
                alt="Diverse professional mentoring a student in a modern tech workspace"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Be the Role Model</p>
                  <p className="text-sm text-muted-foreground">You needed growing up</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
