import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AudienceSelector } from "@/components/AudienceSelector";
import { HowItWorks } from "@/components/HowItWorks";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AudienceSelector />
      <HowItWorks />
    </div>
  );
};

export default Index;
