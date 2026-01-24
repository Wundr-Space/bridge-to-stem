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
import { CheckCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const formSchema = z.object({
  // Personal Information
  fullName: z.string().trim().min(1, "Full name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().max(20).optional(),
  linkedIn: z.string().url("Invalid URL").max(255).optional().or(z.literal("")),
  // Professional Background
  company: z.string().trim().min(1, "Company is required").max(100),
  jobTitle: z.string().trim().min(1, "Job title is required").max(100),
  yearsInSTEM: z.string().min(1, "Years in STEM is required"),
  industry: z.string().min(1, "Industry is required"),
  // Your Background
  secondarySchool: z.string().trim().min(1, "School information is required").max(150),
  schoolType: z.string().min(1, "School type is required"),
  yearLeftSchool: z.string().min(1, "Year left school is required"),
  firstGenUniversity: z.string().min(1, "Please select an option"),
  // Demographics (optional)
  genderIdentity: z.string().optional(),
  ethnicity: z.string().optional(),
  studentGroupsToSupport: z.string().max(200).optional(),
  // Motivation
  whyMentor: z.string().trim().min(1, "Please share why you want to mentor").max(500),
  journeyMessage: z.string().max(500).optional(),
  // Availability
  canHostPlacement: z.string().min(1, "Please select an option"),
  preferredTimes: z.array(z.string()),
  interestedInOngoing: z.string().min(1, "Please select an option"),
  // Company Support
  companySupportsVolunteering: z.string().min(1, "Please select an option"),
  discussedWithManager: z.string().min(1, "Please select an option"),
});

type FormData = z.infer<typeof formSchema>;

const yearsOptions = ["<2", "2-5", "5-10", "10-15", "15+"];
const industries = [
  "Software/Tech",
  "Engineering",
  "Data Science",
  "Cybersecurity",
  "FinTech",
  "Other"
];
const schoolTypes = [
  "State Comprehensive",
  "Academy",
  "Grammar",
  "Independent",
  "Other"
];
const yearLeftOptions = [
  "Before 2000",
  "2000-2005",
  "2005-2010",
  "2010-2015",
  "2015-2020",
  "After 2020"
];
const yesNoOptions = ["Yes", "No", "Prefer not to say"];
const genderOptions = [
  "Female",
  "Male",
  "Non-binary",
  "Prefer not to say",
  "Prefer to self-describe"
];
const ethnicityOptions = [
  "Asian or Asian British - Bangladeshi",
  "Asian or Asian British - Chinese",
  "Asian or Asian British - Indian",
  "Asian or Asian British - Pakistani",
  "Asian or Asian British - Other",
  "Black or Black British - African",
  "Black or Black British - Caribbean",
  "Black or Black British - Other",
  "Mixed - White and Asian",
  "Mixed - White and Black African",
  "Mixed - White and Black Caribbean",
  "Mixed - Other",
  "White - British",
  "White - Irish",
  "White - Other",
  "Other ethnic group - Arab",
  "Other ethnic group - Any other",
  "Prefer not to say"
];
const placementOptions = ["Yes", "No", "Maybe - tell me more"];
const timeOptions = ["Easter break", "Summer", "Flexible"];
const ongoingOptions = ["Yes", "No", "Maybe"];
const volunteeringOptions = ["Yes", "No", "Don't know"];
const managerOptions = ["Yes", "No", "Not yet - will do if matched"];

export function MentorForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    linkedIn: "",
    company: "",
    jobTitle: "",
    yearsInSTEM: "",
    industry: "",
    secondarySchool: "",
    schoolType: "",
    yearLeftSchool: "",
    firstGenUniversity: "",
    genderIdentity: "",
    ethnicity: "",
    studentGroupsToSupport: "",
    whyMentor: "",
    journeyMessage: "",
    canHostPlacement: "",
    preferredTimes: [],
    interestedInOngoing: "",
    companySupportsVolunteering: "",
    discussedWithManager: "",
  });

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleMultiToggle = (field: "preferredTimes", value: string) => {
    setFormData(prev => {
      const current = prev[field] as string[];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter(c => c !== value) };
      }
      return { ...prev, [field]: [...current, value] };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const result = formSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as keyof FormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      toast({
        title: "Please check the form",
        description: "Some required fields are missing or invalid.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission - replace with actual backend call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    toast({
      title: "Registration submitted!",
      description: "We'll review your application and be in touch within 1 week.",
    });
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-3">Thank You!</h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-4">
          We'll review your application and be in touch within 1 week to discuss next steps.
        </p>
        <p className="text-sm text-muted-foreground">
          Look out for an email from our mentorship team.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Personal Information */}
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">Personal Information</h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className={errors.fullName ? "border-destructive" : ""}
            />
            {errors.fullName && <p className="text-sm text-destructive mt-1">{errors.fullName}</p>}
          </div>
          
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="linkedIn">LinkedIn Profile (optional)</Label>
            <Input
              id="linkedIn"
              type="url"
              value={formData.linkedIn}
              onChange={(e) => handleInputChange("linkedIn", e.target.value)}
              placeholder="https://linkedin.com/in/..."
              className={errors.linkedIn ? "border-destructive" : ""}
            />
            {errors.linkedIn && <p className="text-sm text-destructive mt-1">{errors.linkedIn}</p>}
          </div>
        </div>
      </div>

      {/* Professional Background */}
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">Professional Background</h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="company">Current Company *</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
              className={errors.company ? "border-destructive" : ""}
            />
            {errors.company && <p className="text-sm text-destructive mt-1">{errors.company}</p>}
          </div>
          
          <div>
            <Label htmlFor="jobTitle">Job Title/Role *</Label>
            <Input
              id="jobTitle"
              value={formData.jobTitle}
              onChange={(e) => handleInputChange("jobTitle", e.target.value)}
              className={errors.jobTitle ? "border-destructive" : ""}
            />
            {errors.jobTitle && <p className="text-sm text-destructive mt-1">{errors.jobTitle}</p>}
          </div>
          
          <div>
            <Label htmlFor="yearsInSTEM">Years in STEM *</Label>
            <Select value={formData.yearsInSTEM} onValueChange={(v) => handleInputChange("yearsInSTEM", v)}>
              <SelectTrigger className={errors.yearsInSTEM ? "border-destructive" : ""}>
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50">
                {yearsOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.yearsInSTEM && <p className="text-sm text-destructive mt-1">{errors.yearsInSTEM}</p>}
          </div>
          
          <div>
            <Label htmlFor="industry">Industry/Field *</Label>
            <Select value={formData.industry} onValueChange={(v) => handleInputChange("industry", v)}>
              <SelectTrigger className={errors.industry ? "border-destructive" : ""}>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50">
                {industries.map((ind) => (
                  <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.industry && <p className="text-sm text-destructive mt-1">{errors.industry}</p>}
          </div>
        </div>
      </div>

      {/* Your Background */}
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">Your Background (for matching)</h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Label htmlFor="secondarySchool">Which secondary school did you attend? *</Label>
            <Input
              id="secondarySchool"
              value={formData.secondarySchool}
              onChange={(e) => handleInputChange("secondarySchool", e.target.value)}
              placeholder="School Name, Town"
              className={errors.secondarySchool ? "border-destructive" : ""}
            />
            {errors.secondarySchool && <p className="text-sm text-destructive mt-1">{errors.secondarySchool}</p>}
          </div>
          
          <div>
            <Label htmlFor="schoolType">School Type *</Label>
            <Select value={formData.schoolType} onValueChange={(v) => handleInputChange("schoolType", v)}>
              <SelectTrigger className={errors.schoolType ? "border-destructive" : ""}>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50">
                {schoolTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.schoolType && <p className="text-sm text-destructive mt-1">{errors.schoolType}</p>}
          </div>
          
          <div>
            <Label htmlFor="yearLeftSchool">Approximate year left school *</Label>
            <Select value={formData.yearLeftSchool} onValueChange={(v) => handleInputChange("yearLeftSchool", v)}>
              <SelectTrigger className={errors.yearLeftSchool ? "border-destructive" : ""}>
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50">
                {yearLeftOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.yearLeftSchool && <p className="text-sm text-destructive mt-1">{errors.yearLeftSchool}</p>}
          </div>
          
          <div className="sm:col-span-2">
            <Label htmlFor="firstGenUniversity">First in family to attend university? *</Label>
            <Select value={formData.firstGenUniversity} onValueChange={(v) => handleInputChange("firstGenUniversity", v)}>
              <SelectTrigger className={errors.firstGenUniversity ? "border-destructive" : ""}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50">
                {yesNoOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.firstGenUniversity && <p className="text-sm text-destructive mt-1">{errors.firstGenUniversity}</p>}
          </div>
        </div>
      </div>

      {/* Demographics (Optional) */}
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-2">Demographics (optional)</h4>
        <p className="text-sm text-muted-foreground mb-4">This helps us match you with students from similar backgrounds</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="genderIdentity">Gender identity</Label>
            <Select value={formData.genderIdentity} onValueChange={(v) => handleInputChange("genderIdentity", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select (optional)" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50">
                {genderOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="ethnicity">Ethnicity</Label>
            <Select value={formData.ethnicity} onValueChange={(v) => handleInputChange("ethnicity", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select (optional)" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50 max-h-60">
                {ethnicityOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="sm:col-span-2">
            <Label htmlFor="studentGroupsToSupport">Any specific student groups you'd like to support?</Label>
            <Input
              id="studentGroupsToSupport"
              value={formData.studentGroupsToSupport}
              onChange={(e) => handleInputChange("studentGroupsToSupport", e.target.value)}
              placeholder="e.g., young women in tech, neurodivergent students"
            />
          </div>
        </div>
      </div>

      {/* Your Motivation */}
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">Your Motivation</h4>
        <div className="space-y-4">
          <div>
            <Label htmlFor="whyMentor">Why do you want to mentor? *</Label>
            <Textarea
              id="whyMentor"
              value={formData.whyMentor}
              onChange={(e) => handleInputChange("whyMentor", e.target.value)}
              placeholder="Share what motivates you to give back..."
              className={`min-h-[100px] ${errors.whyMentor ? "border-destructive" : ""}`}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {formData.whyMentor.length}/500 characters
            </p>
            {errors.whyMentor && <p className="text-sm text-destructive mt-1">{errors.whyMentor}</p>}
          </div>
          
          <div>
            <Label htmlFor="journeyMessage">What would you want students to know about your journey? (optional)</Label>
            <Textarea
              id="journeyMessage"
              value={formData.journeyMessage}
              onChange={(e) => handleInputChange("journeyMessage", e.target.value)}
              placeholder="Key messages or insights from your career path..."
              className="min-h-[100px]"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {formData.journeyMessage?.length || 0}/500 characters
            </p>
          </div>
        </div>
      </div>

      {/* Availability */}
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">Availability</h4>
        <div className="space-y-4">
          <div>
            <Label htmlFor="canHostPlacement">Can you host a 2-week work placement? *</Label>
            <Select value={formData.canHostPlacement} onValueChange={(v) => handleInputChange("canHostPlacement", v)}>
              <SelectTrigger className={errors.canHostPlacement ? "border-destructive" : ""}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50">
                {placementOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.canHostPlacement && <p className="text-sm text-destructive mt-1">{errors.canHostPlacement}</p>}
          </div>
          
          <div>
            <Label className="mb-3 block">Preferred time of year</Label>
            <div className="flex flex-wrap gap-4">
              {timeOptions.map((time) => (
                <div key={time} className="flex items-center gap-2">
                  <Checkbox
                    id={`time-${time}`}
                    checked={formData.preferredTimes.includes(time)}
                    onCheckedChange={() => handleMultiToggle("preferredTimes", time)}
                  />
                  <Label htmlFor={`time-${time}`} className="text-sm cursor-pointer">
                    {time}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <Label htmlFor="interestedInOngoing">Interested in ongoing mentorship beyond placement? *</Label>
            <Select value={formData.interestedInOngoing} onValueChange={(v) => handleInputChange("interestedInOngoing", v)}>
              <SelectTrigger className={errors.interestedInOngoing ? "border-destructive" : ""}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50">
                {ongoingOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.interestedInOngoing && <p className="text-sm text-destructive mt-1">{errors.interestedInOngoing}</p>}
          </div>
        </div>
      </div>

      {/* Company Support */}
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">Company Support</h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="companySupportsVolunteering">Does your company support employee volunteering? *</Label>
            <Select value={formData.companySupportsVolunteering} onValueChange={(v) => handleInputChange("companySupportsVolunteering", v)}>
              <SelectTrigger className={errors.companySupportsVolunteering ? "border-destructive" : ""}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50">
                {volunteeringOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.companySupportsVolunteering && <p className="text-sm text-destructive mt-1">{errors.companySupportsVolunteering}</p>}
          </div>
          
          <div>
            <Label htmlFor="discussedWithManager">Have you discussed this with your manager? *</Label>
            <Select value={formData.discussedWithManager} onValueChange={(v) => handleInputChange("discussedWithManager", v)}>
              <SelectTrigger className={errors.discussedWithManager ? "border-destructive" : ""}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50">
                {managerOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.discussedWithManager && <p className="text-sm text-destructive mt-1">{errors.discussedWithManager}</p>}
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="text-sm text-muted-foreground border-t border-border pt-6">
        <p>
          Your information used only for mentor matching and program coordination.{" "}
          <Link to="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>

      {/* Submit Button */}
      <Button 
        type="submit" 
        size="lg" 
        className="w-full text-lg py-6"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Submitting...
          </>
        ) : (
          "Register as a Mentor"
        )}
      </Button>
    </form>
  );
}
