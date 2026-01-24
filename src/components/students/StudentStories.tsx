import { Quote, GraduationCap } from "lucide-react";

const testimonials = [
  {
    quote: "I never thought someone like me could work at a place like this. My mentor went to a school just like mine - seeing her succeed made me believe I could too. Now I'm studying Computer Science at university.",
    name: "Aisha",
    age: 17,
    schoolType: "State Comprehensive, East London",
    status: "Now studying Computer Science",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "Being the only Black girl interested in tech at my school was lonely. My mentor had the same experience - she got it. She showed me how to navigate that and use it as my strength.",
    name: "Maya",
    age: 16,
    schoolType: "Academy, Birmingham",
    status: "Applying for Computer Science A-Levels",
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "I thought tech was just coding in a dark room. Turns out it's creative, collaborative, and actually fun. My placement completely changed what I want to do with my life.",
    name: "Jordan",
    age: 15,
    schoolType: "State Comprehensive, Manchester",
    status: "Choosing GCSE options with confidence",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  }
];

export function StudentStories() {
  return (
    <section id="student-stories" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
            Real Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Students Who've Been There
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from students who discovered what's possible
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-card rounded-2xl p-6 border border-border shadow-lg flex flex-col"
            >
              {/* Quote icon */}
              <div className="mb-4">
                <Quote className="w-8 h-8 text-accent/40" />
              </div>
              
              {/* Quote text */}
              <p className="text-foreground/90 leading-relaxed mb-6 flex-grow italic">
                "{testimonial.quote}"
              </p>
              
              {/* Author info */}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <img 
                  src={testimonial.image}
                  alt={`${testimonial.name}'s photo`}
                  className="w-14 h-14 rounded-full object-cover border-2 border-accent/20"
                />
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}, {testimonial.age}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.schoolType}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <GraduationCap className="w-4 h-4 text-accent" />
                    <p className="text-sm text-accent font-medium">
                      {testimonial.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pilot note */}
        <p className="text-center text-sm text-muted-foreground mt-8 italic">
          *Testimonials based on validation interviews and pilot program expectations
        </p>
      </div>
    </section>
  );
}
