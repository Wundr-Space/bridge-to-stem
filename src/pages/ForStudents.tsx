import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StudentHero } from "@/components/students/StudentHero";
import { StudentOpportunity } from "@/components/students/StudentOpportunity";
import { WhyThisMatters } from "@/components/students/WhyThisMatters";

export default function ForStudents() {
  const scrollToApply = () => {
    document.getElementById('student-apply')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToStories = () => {
    document.getElementById('student-stories')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <StudentHero 
        onApply={scrollToApply}
        onSeeStories={scrollToStories}
      />

      {/* The Opportunity */}
      <StudentOpportunity />

      {/* Why This Matters */}
      <WhyThisMatters />

      {/* Placeholder for Student Stories */}
      <section id="student-stories" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Student Stories
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Hear from students who've been through the program
            </p>
            <p className="text-muted-foreground italic">
              Stories coming soon from our pilot program
            </p>
          </div>
        </div>
      </section>

      {/* Placeholder for Application Form */}
      <section id="student-apply" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Apply for Work Experience
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Application form coming soon
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
