import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StudentHero } from "@/components/students/StudentHero";
import { StudentOpportunity } from "@/components/students/StudentOpportunity";
import { WhyThisMatters } from "@/components/students/WhyThisMatters";
import { StudentJourney } from "@/components/students/StudentJourney";
import { PlacementActivities } from "@/components/students/PlacementActivities";
import { StudentStories } from "@/components/students/StudentStories";
import { StudentFAQ } from "@/components/students/StudentFAQ";
import { StudentApplicationForm } from "@/components/students/StudentApplicationForm";

export default function ForStudents() {
  const scrollToApply = () => {
    document.getElementById('student-apply')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToStories = () => {
    document.getElementById('student-stories')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="STEM Work Experience | Meet Mentors Like You"
        description="Get work experience at major tech companies with mentors from similar backgrounds. Free program for students ages 14-18."
        keywords="STEM work experience, student mentorship, tech careers, free work placement, teen STEM program"
      />
      <Navbar />
      
      <main id="main-content">
        {/* Hero Section */}
        <StudentHero 
          onApply={scrollToApply}
          onSeeStories={scrollToStories}
        />

        {/* The Opportunity */}
        <StudentOpportunity />

        {/* Why This Matters */}
        <WhyThisMatters />

        {/* What to Expect - Journey */}
        <StudentJourney />

        {/* What You'll Do During Placement */}
        <PlacementActivities />

        {/* Student Stories */}
        <StudentStories />

        {/* FAQ Section */}
        <StudentFAQ />

        {/* Application Form */}
        <StudentApplicationForm />
      </main>

      <Footer />
    </div>
  );
}