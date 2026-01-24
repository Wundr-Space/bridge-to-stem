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
  // Company Information
  companyName: z.string().trim().min(1, "Company name is required").max(100),
  industry: z.string().min(1, "Industry is required"),
  companySize: z.string().min(1, "Company size is required"),
  smiMember: z.string().min(1, "Please select an option"),
  ukEmployeeCount: z.string().max(20).optional(),
  // Contact Information
  fullName: z.string().trim().min(1, "Full name is required").max(100),
  jobTitle: z.string().trim().min(1, "Job title is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().max(20).optional(),
  linkedIn: z.string().url("Invalid URL").max(255).optional().or(z.literal("")),
  // Role & Authority
  role: z.string().min(1, "Please select your role"),
  budgetLine: z.string().min(1, "Please select a budget line"),
  annualBudget: z.string().min(1, "Please select a budget range"),
  budgetAuthority: z.string().min(1, "Please select your budget authority level"),
  // Current Challenges
  challenges: z.array(z.string()),
  // Current Programs
  hasWorkExperience: z.string().min(1, "Please select an option"),
  hasERGs: z.string().min(1, "Please select an option"),
  hasVolunteeringHours: z.string().min(1, "Please select an option"),
  currentOutreach: z.string().max(200).optional(),
  // What Success Looks Like
  successDefinition: z.string().trim().min(1, "Please describe what success looks like").max(500),
  motivations: z.array(z.string()),
  // Timeline & Next Steps
  preferredTimeline: z.string().min(1, "Please select a timeframe"),
  contactMethod: z.string().min(1, "Please select a contact method"),
  bestTime: z.string().max(100).optional(),
});

type FormData = z.infer<typeof formSchema>;

const industries = [
  "Technology",
  "Financial Services",
  "Professional Services",
  "Consulting",
  "Other"
];

const companySizes = [
  "1,000-5,000",
  "5,000-10,000",
  "10,000-25,000",
  "25,000+"
];

const roles = [
  "Budget Holder",
  "D&I Lead",
  "CSR/ESG Lead",
  "HR Lead",
  "ERG Leader",
  "Head of Social Impact",
  "Other"
];

const budgetLines = [
  "CSR/Community Investment",
  "D&I Programs",
  "Employee Engagement",
  "ESG Reporting",
  "Social Mobility Initiatives",
  "Other"
];

const annualBudgets = [
  "<£100K",
  "£100K-£500K",
  "£500K-£1M",
  "£1M-£5M",
  "£5M+",
  "Prefer not to say"
];

const budgetAuthorities = [
  "I approve budget",
  "I recommend to approver",
  "I influence decision",
  "I'm researching options"
];

const challengeOptions = [
  "Demonstrating authentic social mobility impact beyond donations",
  "Activating diverse employees for structured mentorship",
  "Work placement safeguarding/insurance barriers",
  "Measuring ROI on education/social mobility spend",
  "Employee volunteering is ad-hoc and hard to measure",
  "Generic schools outreach lacks relatability",
  "ESG/D&I reporting requires quantifiable outcomes",
  "Competitive pressure on Social Mobility Index rankings"
];

const motivationOptions = [
  "Measurable ESG/CSR outcomes",
  "Employee engagement & retention",
  "Employer brand enhancement",
  "Graduate recruitment pipeline",
  "Social Mobility Index ranking",
  "Authentic D&I impact (not just optics)"
];

const timelines = [
  "Q2 2026 (Apr-Jun)",
  "Q3 2026 (Jul-Sep)",
  "Q4 2026 (Oct-Dec)",
  "Exploring for future"
];

const contactMethods = ["Email", "Phone", "Video Call"];

export function CorporateForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    industry: "",
    companySize: "",
    smiMember: "",
    ukEmployeeCount: "",
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    linkedIn: "",
    role: "",
    budgetLine: "",
    annualBudget: "",
    budgetAuthority: "",
    challenges: [],
    hasWorkExperience: "",
    hasERGs: "",
    hasVolunteeringHours: "",
    currentOutreach: "",
    successDefinition: "",
    motivations: [],
    preferredTimeline: "",
    contactMethod: "",
    bestTime: "",
  });

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleMultiToggle = (field: "challenges" | "motivations", value: string, maxItems?: number) => {
    setFormData(prev => {
      const current = prev[field] as string[];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter(c => c !== value) };
      }
      if (maxItems && current.length >= maxItems) {
        toast({
          title: `Maximum ${maxItems} selections`,
          description: `Please deselect an option before selecting another.`,
          variant: "destructive",
        });
        return prev;
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
      title: "Request submitted!",
      description: "We'll contact you within 2 business days.",
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
          We'll contact you within 2 business days to schedule a personalized consultation.
        </p>
        <p className="text-sm text-muted-foreground">
          Check your email for our Impact Framework document.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Company Information */}
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">Company Information</h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="companyName">Company Name *</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              className={errors.companyName ? "border-destructive" : ""}
            />
            {errors.companyName && <p className="text-sm text-destructive mt-1">{errors.companyName}</p>}
          </div>
          
          <div>
            <Label htmlFor="industry">Industry *</Label>
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
          
          <div>
            <Label htmlFor="companySize">Company Size *</Label>
            <Select value={formData.companySize} onValueChange={(v) => handleInputChange("companySize", v)}>
              <SelectTrigger className={errors.companySize ? "border-destructive" : ""}>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50">
                {companySizes.map((size) => (
                  <SelectItem key={size} value={size}>{size}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.companySize && <p className="text-sm text-destructive mt-1">{errors.companySize}</p>}
          </div>
          
          <div>
            <Label htmlFor="smiMember">Social Mobility Index Member? *</Label>
            <Select value={formData.smiMember} onValueChange={(v) => handleInputChange("smiMember", v)}>
              <SelectTrigger className={errors.smiMember ? "border-destructive" : ""}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50">
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="dont-know">Don't know</SelectItem>
              </SelectContent>
            </Select>
            {errors.smiMember && <p className="text-sm text-destructive mt-1">{errors.smiMember}</p>}
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="ukEmployeeCount">UK Employee Count (optional)</Label>
            <Input
              id="ukEmployeeCount"
              type="text"
              value={formData.ukEmployeeCount}
              onChange={(e) => handleInputChange("ukEmployeeCount", e.target.value)}
              placeholder="e.g., 2,500"
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">Contact Information</h4>
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
            <Label htmlFor="jobTitle">Job Title *</Label>
            <Input
              id="jobTitle"
              value={formData.jobTitle}
              onChange={(e) => handleInputChange("jobTitle", e.target.value)}
              className={errors.jobTitle ? "border-destructive" : ""}
            />
            {errors.jobTitle && <p className="text-sm text-destructive mt-1">{errors.jobTitle}</p>}
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

          <div className="sm:col-span-2">
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

      {/* Role & Authority */}
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">Your Role & Authority</h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="role">Role in Decision Process *</Label>
            <Select value={formData.role} onValueChange={(v) => handleInputChange("role", v)}>
              <SelectTrigger className={errors.role ? "border-destructive" : ""}>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50">
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.role && <p className="text-sm text-destructive mt-1">{errors.role}</p>}
          </div>
          
          <div>
            <Label htmlFor="budgetLine">Relevant Budget Line *</Label>
            <Select value={formData.budgetLine} onValueChange={(v) => handleInputChange("budgetLine", v)}>
              <SelectTrigger className={errors.budgetLine ? "border-destructive" : ""}>
                <SelectValue placeholder="Select budget line" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50">
                {budgetLines.map((line) => (
                  <SelectItem key={line} value={line}>{line}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.budgetLine && <p className="text-sm text-destructive mt-1">{errors.budgetLine}</p>}
          </div>
          
          <div>
            <Label htmlFor="annualBudget">Annual CSR/D&I Budget *</Label>
            <Select value={formData.annualBudget} onValueChange={(v) => handleInputChange("annualBudget", v)}>
              <SelectTrigger className={errors.annualBudget ? "border-destructive" : ""}>
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50">
                {annualBudgets.map((budget) => (
                  <SelectItem key={budget} value={budget}>{budget}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.annualBudget && <p className="text-sm text-destructive mt-1">{errors.annualBudget}</p>}
          </div>

          <div>
            <Label htmlFor="budgetAuthority">Budget Authority Level *</Label>
            <Select value={formData.budgetAuthority} onValueChange={(v) => handleInputChange("budgetAuthority", v)}>
              <SelectTrigger className={errors.budgetAuthority ? "border-destructive" : ""}>
                <SelectValue placeholder="Select authority level" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50">
                {budgetAuthorities.map((auth) => (
                  <SelectItem key={auth} value={auth}>{auth}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.budgetAuthority && <p className="text-sm text-destructive mt-1">{errors.budgetAuthority}</p>}
          </div>
        </div>
      </div>

      {/* Current Challenges */}
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-2">Current Challenges</h4>
        <p className="text-sm text-muted-foreground mb-4">Which challenges are you facing? (Select all that apply)</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {challengeOptions.map((challenge) => (
            <div key={challenge} className="flex items-start gap-3">
              <Checkbox
                id={`challenge-${challenge}`}
                checked={formData.challenges.includes(challenge)}
                onCheckedChange={() => handleMultiToggle("challenges", challenge)}
              />
              <Label htmlFor={`challenge-${challenge}`} className="text-sm cursor-pointer leading-relaxed">
                {challenge}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Current Programs */}
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">Current Programs</h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="hasWorkExperience">Do you currently run work experience programs? *</Label>
            <Select value={formData.hasWorkExperience} onValueChange={(v) => handleInputChange("hasWorkExperience", v)}>
              <SelectTrigger className={errors.hasWorkExperience ? "border-destructive" : ""}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50">
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="previously">Previously but stopped</SelectItem>
              </SelectContent>
            </Select>
            {errors.hasWorkExperience && <p className="text-sm text-destructive mt-1">{errors.hasWorkExperience}</p>}
          </div>

          <div>
            <Label htmlFor="hasERGs">Do you have active ERGs for underrepresented groups? *</Label>
            <Select value={formData.hasERGs} onValueChange={(v) => handleInputChange("hasERGs", v)}>
              <SelectTrigger className={errors.hasERGs ? "border-destructive" : ""}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50">
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
            {errors.hasERGs && <p className="text-sm text-destructive mt-1">{errors.hasERGs}</p>}
          </div>

          <div>
            <Label htmlFor="hasVolunteeringHours">Do employees have allocated volunteering/impact hours? *</Label>
            <Select value={formData.hasVolunteeringHours} onValueChange={(v) => handleInputChange("hasVolunteeringHours", v)}>
              <SelectTrigger className={errors.hasVolunteeringHours ? "border-destructive" : ""}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50">
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="informal">Informal only</SelectItem>
              </SelectContent>
            </Select>
            {errors.hasVolunteeringHours && <p className="text-sm text-destructive mt-1">{errors.hasVolunteeringHours}</p>}
          </div>

          <div>
            <Label htmlFor="currentOutreach">Current schools outreach approach (optional)</Label>
            <Input
              id="currentOutreach"
              value={formData.currentOutreach}
              onChange={(e) => handleInputChange("currentOutreach", e.target.value.slice(0, 200))}
              placeholder="e.g., STEM ambassadors, one-off talks"
            />
            <p className="text-xs text-muted-foreground mt-1">{formData.currentOutreach?.length || 0}/200</p>
          </div>
        </div>
      </div>

      {/* What Success Looks Like */}
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">What Success Looks Like</h4>
        <div className="space-y-4">
          <div>
            <Label htmlFor="successDefinition">What would make this pilot successful for you? *</Label>
            <Textarea
              id="successDefinition"
              value={formData.successDefinition}
              onChange={(e) => handleInputChange("successDefinition", e.target.value.slice(0, 500))}
              placeholder="E.g., 'Quantifiable ESG data for annual report,' 'High employee engagement scores,' 'Measurable student pathway changes'"
              rows={4}
              className={errors.successDefinition ? "border-destructive" : ""}
            />
            <p className="text-xs text-muted-foreground mt-1">{formData.successDefinition?.length || 0}/500 characters</p>
            {errors.successDefinition && <p className="text-sm text-destructive mt-1">{errors.successDefinition}</p>}
          </div>

          <div>
            <Label className="mb-2 block">Primary motivations (select up to 3)</Label>
            <div className="grid sm:grid-cols-2 gap-3">
              {motivationOptions.map((motivation) => (
                <div key={motivation} className="flex items-start gap-3">
                  <Checkbox
                    id={`motivation-${motivation}`}
                    checked={formData.motivations.includes(motivation)}
                    onCheckedChange={() => handleMultiToggle("motivations", motivation, 3)}
                  />
                  <Label htmlFor={`motivation-${motivation}`} className="text-sm cursor-pointer leading-relaxed">
                    {motivation}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline & Next Steps */}
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">Timeline & Next Steps</h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="preferredTimeline">Preferred pilot start timeframe *</Label>
            <Select value={formData.preferredTimeline} onValueChange={(v) => handleInputChange("preferredTimeline", v)}>
              <SelectTrigger className={errors.preferredTimeline ? "border-destructive" : ""}>
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50">
                {timelines.map((timeline) => (
                  <SelectItem key={timeline} value={timeline}>{timeline}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.preferredTimeline && <p className="text-sm text-destructive mt-1">{errors.preferredTimeline}</p>}
          </div>
          
          <div>
            <Label htmlFor="contactMethod">Preferred Contact Method *</Label>
            <Select value={formData.contactMethod} onValueChange={(v) => handleInputChange("contactMethod", v)}>
              <SelectTrigger className={errors.contactMethod ? "border-destructive" : ""}>
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50">
                {contactMethods.map((method) => (
                  <SelectItem key={method} value={method}>{method}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.contactMethod && <p className="text-sm text-destructive mt-1">{errors.contactMethod}</p>}
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="bestTime">Best time to reach you (optional)</Label>
            <Input
              id="bestTime"
              value={formData.bestTime}
              onChange={(e) => handleInputChange("bestTime", e.target.value)}
              placeholder="e.g., Afternoons GMT"
            />
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <p className="text-xs text-muted-foreground">
        We respect your privacy. Your information will only be used to contact you about the pilot program and provide relevant resources.{" "}
        <Link to="/privacy" className="text-primary hover:underline">View our Privacy Policy</Link>
      </p>

      {/* Submit Button */}
      <Button type="submit" size="lg" variant="brand" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Submitting...
          </>
        ) : (
          "Request Pilot Information"
        )}
      </Button>
    </form>
  );
}
