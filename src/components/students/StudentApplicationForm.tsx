import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Loader2, Sparkles, Send } from "lucide-react";
import { Link } from "react-router-dom";

const formSchema = z.object({
  // About You
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  age: z.string().min(1, "Age is required"),
  currentYear: z.string().min(1, "Current year is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  
  // Your School
  schoolName: z.string().min(1, "School name is required").max(100),
  schoolCity: z.string().min(1, "School town/city is required").max(100),
  schoolRegistered: z.string().min(1, "Please select an option"),
  teacherContact: z.string().max(200).optional(),
  
  // Your Interests
  stemInterest: z.string().min(10, "Please tell us a bit more about your interests").max(300),
  interestAreas: z.array(z.string()).min(1, "Please select at least one area"),
  gcseSubjects: z.string().min(1, "Please list your GCSE subjects").max(500),
  alevelSubjects: z.string().max(500).optional(),
  
  // About Your Background
  firstInFamily: z.string().min(1, "Please select an option"),
  whyWorkExperience: z.string().min(10, "Please tell us a bit more").max(300),
  
  // Practical Details
  placementTiming: z.array(z.string()).min(1, "Please select at least one option"),
  accessRequirements: z.string().max(500).optional(),
  howHeard: z.string().min(1, "Please tell us how you heard about us"),
  
  // Parent/Guardian Consent
  parentName: z.string().min(1, "Parent/guardian name is required").max(100),
  parentEmail: z.string().email("Please enter a valid parent/guardian email"),
  parentConsent: z.boolean().refine(val => val === true, "Parent/guardian consent is required"),
});

type FormData = z.infer<typeof formSchema>;

const ageOptions = ["13", "14", "15", "16", "17", "18"];
const yearOptions = ["Year 9", "Year 10", "Year 11", "Year 12", "Year 13"];
const registeredOptions = ["Yes", "No", "Don't know"];
const firstInFamilyOptions = ["Yes", "No", "Don't know yet"];
const howHeardOptions = ["My school", "Teacher", "Friend", "Social media", "Other"];

const interestAreaOptions = [
  { id: "software", label: "Software/Coding" },
  { id: "cybersecurity", label: "Cybersecurity" },
  { id: "data-ai", label: "Data/AI" },
  { id: "hardware", label: "Hardware/Engineering" },
  { id: "design-ux", label: "Design/UX" },
  { id: "not-sure", label: "Not sure - want to explore" },
];

const placementTimingOptions = [
  { id: "easter-2026", label: "Easter break 2026" },
  { id: "summer-2026", label: "Summer 2026" },
  { id: "flexible", label: "Flexible" },
];

export function StudentApplicationForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [formData, setFormData] = useState<Partial<FormData>>({
    interestAreas: [],
    placementTiming: [],
    parentConsent: false,
  });

  const handleInputChange = (field: keyof FormData, value: string | string[] | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCheckboxToggle = (field: "interestAreas" | "placementTiming", value: string) => {
    const currentValues = (formData[field] as string[]) || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    handleInputChange(field, newValues);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = formSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.errors.forEach(error => {
        const field = error.path[0] as keyof FormData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = error.message;
        }
      });
      setErrors(fieldErrors);
      toast({
        title: "Please check your application",
        description: "Some fields need your attention.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    toast({
      title: "Application submitted!",
      description: "We'll be in touch within 2 weeks.",
    });
  };

  if (isSuccess) {
    return (
      <section id="student-apply" className="py-16 md:py-24 bg-gradient-to-b from-accent/5 to-background">
        <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Application Received! 🎉
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Thank you for applying! We'll review your application and contact you and your school within 2 weeks.
            </p>
            <p className="text-muted-foreground">
              In the meantime, keep an eye on your email (and spam folder, just in case).
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="student-apply" className="py-16 md:py-24 bg-gradient-to-b from-accent/5 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Your Future Starts Here</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Apply for Work Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tell us about yourself and we'll match you with a relatable mentor
          </p>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 lg:p-10 shadow-card space-y-10">
            
            {/* About You Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground border-b border-border pb-3">
                About You
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    placeholder="Your first name"
                    value={formData.firstName || ""}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className={errors.firstName ? "border-destructive" : ""}
                    aria-describedby={errors.firstName ? "firstName-error" : undefined}
                  />
                  {errors.firstName && (
                    <p id="firstName-error" className="text-sm text-destructive">{errors.firstName}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    placeholder="Your last name"
                    value={formData.lastName || ""}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className={errors.lastName ? "border-destructive" : ""}
                    aria-describedby={errors.lastName ? "lastName-error" : undefined}
                  />
                  {errors.lastName && (
                    <p id="lastName-error" className="text-sm text-destructive">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Select value={formData.age} onValueChange={(value) => handleInputChange("age", value)}>
                    <SelectTrigger className={errors.age ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select your age" />
                    </SelectTrigger>
                    <SelectContent>
                      {ageOptions.map(age => (
                        <SelectItem key={age} value={age}>{age}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.age && (
                    <p className="text-sm text-destructive">{errors.age}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentYear">Current Year *</Label>
                  <Select value={formData.currentYear} onValueChange={(value) => handleInputChange("currentYear", value)}>
                    <SelectTrigger className={errors.currentYear ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select your year" />
                    </SelectTrigger>
                    <SelectContent>
                      {yearOptions.map(year => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.currentYear && (
                    <p className="text-sm text-destructive">{errors.currentYear}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email || ""}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={errors.email ? "border-destructive" : ""}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Your phone number"
                    value={formData.phone || ""}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Your School Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground border-b border-border pb-3">
                Your School
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="schoolName">School Name *</Label>
                  <Input
                    id="schoolName"
                    placeholder="Your school's name"
                    value={formData.schoolName || ""}
                    onChange={(e) => handleInputChange("schoolName", e.target.value)}
                    className={errors.schoolName ? "border-destructive" : ""}
                  />
                  {errors.schoolName && (
                    <p className="text-sm text-destructive">{errors.schoolName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schoolCity">School Town/City *</Label>
                  <Input
                    id="schoolCity"
                    placeholder="Town or city"
                    value={formData.schoolCity || ""}
                    onChange={(e) => handleInputChange("schoolCity", e.target.value)}
                    className={errors.schoolCity ? "border-destructive" : ""}
                  />
                  {errors.schoolCity && (
                    <p className="text-sm text-destructive">{errors.schoolCity}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="schoolRegistered">Has your school registered with Gen-Connect? *</Label>
                <Select value={formData.schoolRegistered} onValueChange={(value) => handleInputChange("schoolRegistered", value)}>
                  <SelectTrigger className={errors.schoolRegistered ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {registeredOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.schoolRegistered && (
                  <p className="text-sm text-destructive">{errors.schoolRegistered}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="teacherContact">Teacher/Careers Advisor Contact (optional)</Label>
                <Input
                  id="teacherContact"
                  placeholder="Name and email if known"
                  value={formData.teacherContact || ""}
                  onChange={(e) => handleInputChange("teacherContact", e.target.value)}
                />
              </div>
            </div>

            {/* Your Interests Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground border-b border-border pb-3">
                Your Interests
              </h3>

              <div className="space-y-2">
                <Label htmlFor="stemInterest">What interests you about STEM? *</Label>
                <Textarea
                  id="stemInterest"
                  placeholder="Be honest! E.g., 'I like problem-solving,' 'I want to earn good money,' 'My friend said tech is cool,' 'I'm not sure but want to find out'"
                  value={formData.stemInterest || ""}
                  onChange={(e) => handleInputChange("stemInterest", e.target.value)}
                  className={`min-h-[100px] ${errors.stemInterest ? "border-destructive" : ""}`}
                  maxLength={300}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  {errors.stemInterest && (
                    <p className="text-destructive">{errors.stemInterest}</p>
                  )}
                  <span className="ml-auto">{(formData.stemInterest || "").length}/300</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Which areas sound interesting? (select all that apply) *</Label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {interestAreaOptions.map(option => (
                    <div key={option.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={`interest-${option.id}`}
                        checked={(formData.interestAreas || []).includes(option.id)}
                        onCheckedChange={() => handleCheckboxToggle("interestAreas", option.id)}
                      />
                      <Label 
                        htmlFor={`interest-${option.id}`} 
                        className="font-normal cursor-pointer"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.interestAreas && (
                  <p className="text-sm text-destructive">{errors.interestAreas}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gcseSubjects">What subjects are you taking for GCSEs? *</Label>
                <Input
                  id="gcseSubjects"
                  placeholder="E.g., Maths, English, Science, Computer Science..."
                  value={formData.gcseSubjects || ""}
                  onChange={(e) => handleInputChange("gcseSubjects", e.target.value)}
                  className={errors.gcseSubjects ? "border-destructive" : ""}
                />
                {errors.gcseSubjects && (
                  <p className="text-sm text-destructive">{errors.gcseSubjects}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="alevelSubjects">What subjects are you considering for A-Levels? (optional)</Label>
                <Input
                  id="alevelSubjects"
                  placeholder="'Not sure yet' is perfectly fine!"
                  value={formData.alevelSubjects || ""}
                  onChange={(e) => handleInputChange("alevelSubjects", e.target.value)}
                />
              </div>
            </div>

            {/* About Your Background Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground border-b border-border pb-3">
                About Your Background
                <span className="block text-sm font-normal text-muted-foreground mt-1">
                  This helps us match you with the right mentor
                </span>
              </h3>

              <div className="space-y-2">
                <Label htmlFor="firstInFamily">First in your family to consider university? *</Label>
                <Select value={formData.firstInFamily} onValueChange={(value) => handleInputChange("firstInFamily", value)}>
                  <SelectTrigger className={errors.firstInFamily ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {firstInFamilyOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.firstInFamily && (
                  <p className="text-sm text-destructive">{errors.firstInFamily}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="whyWorkExperience">Why do you want this work experience? *</Label>
                <Textarea
                  id="whyWorkExperience"
                  placeholder="E.g., 'I don't know anyone who works in tech,' 'I want to see if I'd fit in,' 'I'm deciding on my A-Levels'"
                  value={formData.whyWorkExperience || ""}
                  onChange={(e) => handleInputChange("whyWorkExperience", e.target.value)}
                  className={`min-h-[100px] ${errors.whyWorkExperience ? "border-destructive" : ""}`}
                  maxLength={300}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  {errors.whyWorkExperience && (
                    <p className="text-destructive">{errors.whyWorkExperience}</p>
                  )}
                  <span className="ml-auto">{(formData.whyWorkExperience || "").length}/300</span>
                </div>
              </div>
            </div>

            {/* Practical Details Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground border-b border-border pb-3">
                Practical Details
              </h3>

              <div className="space-y-3">
                <Label>When could you do a 2-week placement? *</Label>
                <div className="grid sm:grid-cols-3 gap-3">
                  {placementTimingOptions.map(option => (
                    <div key={option.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={`timing-${option.id}`}
                        checked={(formData.placementTiming || []).includes(option.id)}
                        onCheckedChange={() => handleCheckboxToggle("placementTiming", option.id)}
                      />
                      <Label 
                        htmlFor={`timing-${option.id}`} 
                        className="font-normal cursor-pointer"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.placementTiming && (
                  <p className="text-sm text-destructive">{errors.placementTiming}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="accessRequirements">Do you have any access requirements or support needs we should know about? (optional)</Label>
                <Textarea
                  id="accessRequirements"
                  placeholder="Let us know if there's anything we can do to support you"
                  value={formData.accessRequirements || ""}
                  onChange={(e) => handleInputChange("accessRequirements", e.target.value)}
                  className="min-h-[80px]"
                  maxLength={500}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="howHeard">How did you hear about us? *</Label>
                <Select value={formData.howHeard} onValueChange={(value) => handleInputChange("howHeard", value)}>
                  <SelectTrigger className={errors.howHeard ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {howHeardOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.howHeard && (
                  <p className="text-sm text-destructive">{errors.howHeard}</p>
                )}
              </div>
            </div>

            {/* Parent/Guardian Consent Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground border-b border-border pb-3">
                Parent/Guardian Consent
                <span className="block text-sm font-normal text-muted-foreground mt-1">
                  Required for students under 18
                </span>
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="parentName">Parent/Guardian Name *</Label>
                  <Input
                    id="parentName"
                    placeholder="Their full name"
                    value={formData.parentName || ""}
                    onChange={(e) => handleInputChange("parentName", e.target.value)}
                    className={errors.parentName ? "border-destructive" : ""}
                  />
                  {errors.parentName && (
                    <p className="text-sm text-destructive">{errors.parentName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentEmail">Parent/Guardian Email *</Label>
                  <Input
                    id="parentEmail"
                    type="email"
                    placeholder="Their email address"
                    value={formData.parentEmail || ""}
                    onChange={(e) => handleInputChange("parentEmail", e.target.value)}
                    className={errors.parentEmail ? "border-destructive" : ""}
                  />
                  {errors.parentEmail && (
                    <p className="text-sm text-destructive">{errors.parentEmail}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="parentConsent"
                  checked={formData.parentConsent || false}
                  onCheckedChange={(checked) => handleInputChange("parentConsent", checked as boolean)}
                  className={errors.parentConsent ? "border-destructive" : ""}
                />
                <div className="space-y-1">
                  <Label 
                    htmlFor="parentConsent" 
                    className="font-normal cursor-pointer leading-relaxed"
                  >
                    My parent/guardian is aware I'm applying *
                  </Label>
                  {errors.parentConsent && (
                    <p className="text-sm text-destructive">{errors.parentConsent}</p>
                  )}
                </div>
              </div>

              <p className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
                📧 We'll contact your parent/guardian to confirm consent before your placement begins.
              </p>
            </div>

            {/* Privacy Notice */}
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-6">
                Your information will be used only for placement matching and program coordination.{" "}
                <Link 
                  to="/privacy" 
                  className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  Privacy Policy
                </Link>
              </p>

              <Button
                type="submit"
                variant="brand"
                size="lg"
                className="w-full group"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
