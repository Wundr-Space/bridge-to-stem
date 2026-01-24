import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MentorHero } from "@/components/mentors/MentorHero";
import { WhyMentor } from "@/components/mentors/WhyMentor";
import { MentorProcess } from "@/components/mentors/MentorProcess";
import { MentorBenefits } from "@/components/mentors/MentorBenefits";
import { MentorStories } from "@/components/mentors/MentorStories";
import { MentorForm } from "@/components/forms/MentorForm";

export default function ForMentors() {
  const scrollToSignup = () => {
    document.getElementById('mentor-signup')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToStories = () => {
    document.getElementById('mentor-stories')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Become a STEM Mentor | Give Back to Students Like You"
        description="Help students from backgrounds like yours see STEM as achievable. Low commitment, high impact mentoring with full company support."
        keywords="STEM mentor, volunteer mentoring, give back, diversity in tech, role model, social mobility"
      />
      <Navbar />
      
      <main id="main-content">
        {/* Hero Section */}
        <MentorHero 
          onBecomeaMentor={scrollToSignup}
          onSeeStories={scrollToStories}
        />

        {/* Why Mentor Section */}
        <WhyMentor />

        {/* What's Involved - Process */}
        <MentorProcess />

        {/* What You Get - Benefits */}
        <MentorBenefits />

        {/* Mentor Stories */}
        <MentorStories />

        {/* Registration Form */}
        <section id="mentor-signup" className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Become a Mentor
                </h2>
                <p className="text-lg text-muted-foreground">
                  Share your story and help students from similar backgrounds see their potential
                </p>
              </div>
              
              <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
                <MentorForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
