import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AudienceSelector } from "@/components/AudienceSelector";
import { HowItWorks } from "@/components/HowItWorks";
import { ImpactSection } from "@/components/ImpactSection";
import { VideoExplainer } from "@/components/VideoExplainer";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AudienceSelector />
      <HowItWorks />
      <ImpactSection />
      <VideoExplainer />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
