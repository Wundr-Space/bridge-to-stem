import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      
      {/* Audience Section Placeholder */}
      <section id="audience" className="py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Choose Your Pathway</h2>
          <p className="text-muted-foreground">Coming soon: Dedicated experiences for Corporates, Schools, Mentors, and Students</p>
        </div>
      </section>
    </div>
  );
};

export default Index;
