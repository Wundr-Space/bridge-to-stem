import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";

interface StudentHeroProps {
  onApply: () => void;
  onSeeStories: () => void;
}

export function StudentHero({ onApply, onSeeStories }: StudentHeroProps) {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* More vibrant background for youth appeal */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-primary/10" />
      <div className="absolute top-10 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/15 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-accent/10 rounded-full blur-2xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full border border-accent/30">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">For Students</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Meet Someone Like You Who{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Made It in Tech
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Get real work experience at major companies with mentors who went to schools 
              like yours and prove that STEM careers are for everyone
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                onClick={onApply}
              >
                Apply for Work Experience
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-2"
                onClick={onSeeStories}
              >
                See Student Stories
                <ChevronDown className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
          
          {/* Right - Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-accent/20">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="Diverse students collaborating in a modern tech environment"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/30 to-transparent" />
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-lg border-2 border-accent/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Your Future Starts Here</p>
                  <p className="text-sm text-muted-foreground">Real experience, real impact</p>
                </div>
              </div>
            </div>
            
            {/* Additional floating element */}
            <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full font-semibold shadow-lg text-sm">
              100% Free
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
