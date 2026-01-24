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

      <Footer />
    </div>
  );
}