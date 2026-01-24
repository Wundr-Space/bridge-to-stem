import { SEO } from "@/components/SEO";
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
      <SEO 
        title="Connecting Relatable STEM Mentors with Students"
        description="We partner with major tech companies to activate diverse employees as relatable mentors, proving that STEM careers are for everyone. Free for schools, impactful for students."
        keywords="social mobility, STEM mentorship, relatable role models, work experience, diversity in tech"
      />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <AudienceSelector />
        <HowItWorks />
        <ImpactSection />
        <VideoExplainer />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
