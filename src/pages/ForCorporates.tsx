import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CorporateHero } from "@/components/corporate/CorporateHero";
import { CorporateCommitments } from "@/components/corporate/CorporateCommitments";
import { CorporateChallenges } from "@/components/corporate/CorporateChallenges";
import { CorporateOpportunities } from "@/components/corporate/CorporateOpportunities";
import { CorporateComparison } from "@/components/corporate/CorporateComparison";
import { CorporateStats } from "@/components/corporate/CorporateStats";
import { CorporateBenefits } from "@/components/corporate/CorporateBenefits";
import { CorporatePilot } from "@/components/corporate/CorporatePilot";
import { CorporateForm } from "@/components/forms/CorporateForm";

const ForCorporates = () => {
  const scrollToForm = () => {
    document.getElementById('pilot-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Corporate Partnerships | Activate Employees for D&I Impact"
        description="Activate your diverse employees as mentors for authentic social mobility impact. We handle compliance, track outcomes, deliver ESG/D&I reporting."
        keywords="corporate social responsibility, D&I impact, ESG reporting, employee engagement, social mobility, STEM diversity"
      />
      <Navbar />
      
      <main id="main-content">
        {/* Section 1: Hero */}
        <CorporateHero onScrollToForm={scrollToForm} />

        {/* Section 2: You're Already Committed */}
        <CorporateCommitments />

        {/* Section 3: The Challenges */}
        <CorporateChallenges />

        {/* Section 4: The Opportunity */}
        <CorporateOpportunities />

        {/* Section 5: How We Solve This - Comparison */}
        <CorporateComparison />

        {/* Section 6: The Stats */}
        <CorporateStats />

        {/* Section 7: What You Get - Benefits */}
        <CorporateBenefits />

        {/* Section 8: Pilot Program Details */}
        <CorporatePilot />

        {/* Section 9: Registration Form */}
        <section id="pilot-form" className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Request Pilot Information
                </h2>
                <p className="text-lg text-muted-foreground">
                  Let's discuss how to activate your employees for measurable social mobility impact
                </p>
              </div>
              
              <div className="bg-card border border-border/50 rounded-2xl p-8">
                <CorporateForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ForCorporates;
