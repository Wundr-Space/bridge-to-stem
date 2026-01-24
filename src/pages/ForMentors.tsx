import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MentorHero } from "@/components/mentors/MentorHero";
import { WhyMentor } from "@/components/mentors/WhyMentor";

export default function ForMentors() {
  const scrollToSignup = () => {
    document.getElementById('mentor-signup')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToStories = () => {
    document.getElementById('mentor-stories')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <MentorHero 
        onBecomeaMentor={scrollToSignup}
        onSeeStories={scrollToStories}
      />

      {/* Why Mentor Section */}
      <WhyMentor />

      {/* Placeholder for Mentor Stories */}
      <section id="mentor-stories" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Mentor Stories
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Hear from mentors who are making a difference
            </p>
            <p className="text-muted-foreground italic">
              Stories coming soon from our pilot program
            </p>
          </div>
        </div>
      </section>

      {/* Placeholder for Signup Form */}
      <section id="mentor-signup" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Become a Mentor
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Mentor registration form coming soon
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
