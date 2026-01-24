import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, ShieldAlert, Unlink, Users } from "lucide-react";

const challenges = [
  {
    icon: BarChart3,
    title: "From Donations to Demonstrable Impact",
    problem: [
      "CSR budgets go to education charities (Code First Girls, Stemettes)",
      "Arm's-length donations = no visibility into outcomes",
      "Can't answer: \"Did our £100K actually change student career choices?\"",
      "Board asks for ROI, you have no student-level data"
    ],
    doingNow: [
      "Generic schools outreach (STEM ambassadors, one-off talks)",
      "No way to measure if students changed GCSE or A-Level pathways",
      "Reporting is vague: \"Reached X students\" (but did they change behavior?)"
    ],
    question: "How do we prove we're changing students' lives, not just writing checks?"
  },
  {
    icon: ShieldAlert,
    title: "Safeguarding & Insurance Barriers",
    problem: [
      "Work placements face massive compliance complexity (DBS, safeguarding, insurance)",
      "Microsoft example: only allows placements for employees' children (0.1% reach)",
      "Creates reputational risk: \"elite access only\"",
      "Internal teams don't have capacity to manage compliance for 100+ students"
    ],
    doingNow: [
      "Heavily restricted work experience programs",
      "Most students excluded due to safeguarding concerns",
      "Internal HR/Legal teams stretched managing compliance"
    ],
    question: "How do we offer placements at scale without overwhelming our compliance teams?"
  },
  {
    icon: Unlink,
    title: "Ad-Hoc Volunteering Doesn't Build Pathways",
    problem: [
      "Employee volunteering is uncoordinated (random employees, random schools)",
      "Platforms like Benevity offer generic opportunities, not personally meaningful ones",
      "No connection between volunteering and schools strategy",
      "\"Impact hours\" tracked but not aligned with D&I goals"
    ],
    doingNow: [
      "Employees volunteer sporadically, no systematic approach",
      "No matching based on shared backgrounds",
      "Graduate apprenticeships start at age 18 (too late for perception change)"
    ],
    question: "How do we turn employee goodwill into structured, high-impact mentorship?"
  },
  {
    icon: Users,
    title: "Generic Outreach Doesn't Create Relatability",
    problem: [
      "STEM ambassadors and one-off talks lack personal connection",
      "Students from low SES backgrounds need to see \"someone like me\" succeed",
      "Generic professionals can't answer: \"Can someone from my background do this?\"",
      "Missing the relatability that actually changes student perceptions"
    ],
    doingNow: [
      "Sending any available employees to schools",
      "No matching on background, school type, or demographics",
      "Lack of follow-through after one-off engagement"
    ],
    question: "How do we connect students with mentors who actually understand their journey?"
  }
];

export function CorporateChallenges() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Four Challenges Blocking Your Social Mobility Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            These aren't your fault — they're structural barriers that require a different approach
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {challenges.map((challenge, index) => {
            const Icon = challenge.icon;
            return (
              <Card key={index} className="border-destructive/20 bg-destructive/5 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-destructive" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground pt-2">
                      {challenge.title}
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-destructive uppercase tracking-wide mb-2">The Problem</p>
                      <ul className="space-y-1.5">
                        {challenge.problem.map((item, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-destructive/50 rounded-full flex-shrink-0 mt-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">What You're Doing Now</p>
                      <ul className="space-y-1.5">
                        {challenge.doingNow.map((item, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full flex-shrink-0 mt-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-2 border-t border-destructive/10">
                      <p className="text-sm font-medium text-foreground italic">
                        "{challenge.question}"
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
