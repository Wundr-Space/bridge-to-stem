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

          {/* Right - Hero Image Placeholder */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl border border-border/50 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-24 h-24 rounded-full bg-muted/80 mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-border">
                  <Building2 className="w-10 h-10 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm">Hero Image Placeholder</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Diverse professionals mentoring student</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
