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
  companyName: z.string().trim().min(1, "Company name is required").max(100),
  industry: z.string().min(1, "Industry is required"),
  companySize: z.string().min(1, "Company size is required"),
  smiMember: z.string().min(1, "Please select an option"),
  fullName: z.string().trim().min(1, "Full name is required").max(100),
  jobTitle: z.string().trim().min(1, "Job title is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().max(20).optional(),
  role: z.string().min(1, "Please select your role"),
  budgetLine: z.string().min(1, "Please select a budget line"),
  annualBudget: z.string().optional(),
  challenges: z.array(z.string()),
  interest: z.string().max(500).optional(),
  contactMethod: z.string().min(1, "Please select a contact method"),
});

type FormData = z.infer<typeof formSchema>;

const industries = [
  "Technology",
  "Financial Services",
  "Professional Services",
  "Other"
];

const companySizes = [
  "1,000-5,000",
  "5,000-10,000",
  "10,000+"
];

const roles = [
  "Budget Holder",
  "D&I Lead",
  "CSR Lead",
  "HR Lead",
  "ERG Leader",
  "Other"
];

const budgetLines = [
  "CSR/Community Investment",
  "D&I Programs",
  "Employee Engagement",
  "ESG Reporting",
  "Other"
];

const annualBudgets = [
  "<£100K",
  "£100K-£500K",
  "£500K-£1M",
  "£1M+",
  "Prefer not to say"
];

const challengeOptions = [
  "Demonstrating authentic social mobility impact",
  "Activating diverse employees for mentorship",
  "Work placement barriers (safeguarding/insurance)",
  "Measuring ROI on social mobility spend",
  "Employee volunteering engagement",
  "ESG/D&I reporting requirements"
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
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    role: "",
    budgetLine: "",
    annualBudget: "",
    challenges: [],
    interest: "",
    contactMethod: "",
  });

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleChallengeToggle = (challenge: string) => {
    setFormData(prev => ({
      ...prev,
      challenges: prev.challenges.includes(challenge)
        ? prev.challenges.filter(c => c !== challenge)
        : [...prev.challenges, challenge]
    }));
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
        <p className="text-muted-foreground max-w-md mx-auto">
          We'll contact you within 2 business days to discuss how we can activate your diverse employees for measurable impact.
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
              </SelectContent>
            </Select>
            {errors.smiMember && <p className="text-sm text-destructive mt-1">{errors.smiMember}</p>}
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
        </div>
      </div>

      {/* Budget & Authority */}
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">Budget & Authority</h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="role">Your Role *</Label>
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
          
          <div className="sm:col-span-2">
            <Label htmlFor="annualBudget">Annual CSR/D&I Budget (optional)</Label>
            <Select value={formData.annualBudget} onValueChange={(v) => handleInputChange("annualBudget", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50">
                {annualBudgets.map((budget) => (
                  <SelectItem key={budget} value={budget}>{budget}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Current Challenges */}
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">Current Challenges</h4>
        <p className="text-sm text-muted-foreground mb-4">Select all that apply:</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {challengeOptions.map((challenge) => (
            <div key={challenge} className="flex items-start gap-3">
              <Checkbox
                id={challenge}
                checked={formData.challenges.includes(challenge)}
                onCheckedChange={() => handleChallengeToggle(challenge)}
              />
              <Label htmlFor={challenge} className="text-sm cursor-pointer leading-relaxed">
                {challenge}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">Additional Information</h4>
        <div className="space-y-4">
          <div>
            <Label htmlFor="interest">What interests you most about this pilot? (optional)</Label>
            <Textarea
              id="interest"
              value={formData.interest}
              onChange={(e) => handleInputChange("interest", e.target.value.slice(0, 500))}
              placeholder="Tell us more..."
              rows={4}
            />
            <p className="text-xs text-muted-foreground mt-1">{formData.interest?.length || 0}/500 characters</p>
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
        </div>
      </div>

      {/* Privacy Notice */}
      <p className="text-xs text-muted-foreground">
        We respect your privacy. Information used only for pilot program contact.{" "}
        <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
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
