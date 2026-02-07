import { Button } from "@/components/ui/button";
import { Building2, Download, ArrowRight } from "lucide-react";

interface CorporateHeroProps {
  onScrollToForm: () => void;
}

export function CorporateHero({ onScrollToForm }: CorporateHeroProps) {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6">
              <Building2 className="w-4 h-4" />
              For Corporates
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Turn Your D&I Commitments Into{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Measurable Social Mobility Impact
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Activate your diverse employees as relatable mentors. We handle the complexity. 
              You get quantifiable outcomes for ESG reporting.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="brand" className="text-base" onClick={onScrollToForm}>
                Request Pilot Information
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-base">
                <Download className="w-5 h-5 mr-2" />
                Download Impact Framework
              </Button>
            </div>
          </div>

          {/* Right - Hero Image */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
                alt="Diverse professionals collaborating in a modern corporate environment"
                className="w-full h-[400px] md:h-[500px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">ESG Impact</p>
                  <p className="text-sm text-muted-foreground">Measurable outcomes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
