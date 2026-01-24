import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Do I need to be good at maths/science?",
    answer: "No! This is about exploring whether STEM is for you. Curiosity matters more than grades."
  },
  {
    question: "Will I be the only person like me there?",
    answer: "We specifically match you with mentors from similar backgrounds. They've been where you are."
  },
  {
    question: "What if I decide tech isn't for me?",
    answer: "That's totally fine! Better to find out now than after choosing A-Levels. Knowing what you DON'T want is valuable."
  },
  {
    question: "Do I get paid?",
    answer: "This is work experience, not a job. But you get something more valuable: insight into a career path and a mentor."
  },
  {
    question: "What if my parents don't know about tech jobs?",
    answer: "That's exactly why we're here. We'll help you (and them) understand what opportunities exist."
  },
  {
    question: "Will this cost anything?",
    answer: "No. Completely free. Funded by the companies."
  }
];

export function StudentFAQ() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
            <HelpCircle className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Got Questions?</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Questions You Might Have
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We get it — this might feel unfamiliar. Here are answers to what students ask us most.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 shadow-sm hover:shadow-md transition-shadow duration-300 data-[state=open]:shadow-card"
              >
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-foreground hover:text-primary hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Additional Help */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Still have questions?{" "}
            <a 
              href="#contact" 
              className="text-primary font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            >
              Get in touch
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
