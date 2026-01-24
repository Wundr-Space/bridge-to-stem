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
  // School Information
  schoolName: z.string().trim().min(1, "School name is required").max(150),
  schoolType: z.string().min(1, "School type is required"),
  location: z.string().trim().min(1, "Location is required").max(100),
  numberOfStudents: z.string().min(1, "Number of students is required"),
  fsmEligibility: z.string().min(1, "FSM eligibility is required"),
  ofstedRating: z.string().optional(),
  // Contact Information
  contactName: z.string().trim().min(1, "Your name is required").max(100),
  contactRole: z.string().min(1, "Your role is required"),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(1, "Phone number is required").max(20),
  // Current Situation
  careersProvision: z.string().min(1, "Please select careers provision"),
  workExperienceChallenges: z.array(z.string()),
  // Student Demographics
  targetYearGroups: z.array(z.string()).min(1, "Please select at least one year group"),
  estimatedStudents: z.string().trim().min(1, "Please provide an estimate").max(10),
  priorityGroups: z.string().max(200).optional(),
  // Additional Info
  successDefinition: z.string().max(500).optional(),
});

type FormData = z.infer<typeof formSchema>;

const schoolTypes = [
  "State Comprehensive",
  "Academy",
  "Grammar",
  "Free School",
  "Other"
];

const studentCounts = [
  "<500",
  "500-1000",
  "1000-1500",
  "1500+"
];

const fsmOptions = [
  "<15%",
  "15-30%",
  "30-45%",
  "45%+"
];

const ofstedRatings = [
  "Outstanding",
  "Good",
  "Requires Improvement",
  "Inadequate",
  "N/A"
];

const contactRoles = [
  "Head Teacher",
  "Deputy Head",
  "Careers Advisor",
  "Head of Year",
  "Other"
];

const careersProvisions = [
  "Full-time advisor",
  "Part-time advisor",
  "Shared role",
  "Minimal provision"
];

const challengeOptions = [
  "Finding quality STEM placements",
  "Limited staff time",
  "No employer connections",
  "Safeguarding concerns",
  "Student engagement",
  "Tracking outcomes"
];

const yearGroups = [
  "Year 9",
  "Year 10",
  "Year 11",
  "Year 12",
  "Year 13"
];

export function SchoolForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  
  const [formData, setFormData] = useState<FormData>({
    schoolName: "",
    schoolType: "",
    location: "",
    numberOfStudents: "",
    fsmEligibility: "",
    ofstedRating: "",
    contactName: "",
    contactRole: "",
    email: "",
    phone: "",
    careersProvision: "",
    workExperienceChallenges: [],
    targetYearGroups: [],
    estimatedStudents: "",
    priorityGroups: "",
    successDefinition: "",
  });

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleMultiToggle = (field: "workExperienceChallenges" | "targetYearGroups", value: string) => {
    setFormData(prev => {
      const current = prev[field] as string[];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter(c => c !== value) };
      }
      return { ...prev, [field]: [...current, value] };
    });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
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
      description: "We'll contact you within 1 week to discuss next steps.",
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
          We'll contact you within 1 week to discuss next steps and how we can support your students.
        </p>
        <p className="text-sm text-muted-foreground">
          Look out for an email from our schools team.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* School Information */}
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">School Information</h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Label htmlFor="schoolName">School Name *</Label>
            <Input
              id="schoolName"
              value={formData.schoolName}
              onChange={(e) => handleInputChange("schoolName", e.target.value)}
              className={errors.schoolName ? "border-destructive" : ""}
            />
            {errors.schoolName && <p className="text-sm text-destructive mt-1">{errors.schoolName}</p>}
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
            <Label htmlFor="location">Location (Town/City, County) *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="e.g., Manchester, Greater Manchester"
              className={errors.location ? "border-destructive" : ""}
            />
            {errors.location && <p className="text-sm text-destructive mt-1">{errors.location}</p>}
          </div>
          
          <div>
            <Label htmlFor="numberOfStudents">Number of Students *</Label>
            <Select value={formData.numberOfStudents} onValueChange={(v) => handleInputChange("numberOfStudents", v)}>
              <SelectTrigger className={errors.numberOfStudents ? "border-destructive" : ""}>
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50">
                {studentCounts.map((count) => (
                  <SelectItem key={count} value={count}>{count}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.numberOfStudents && <p className="text-sm text-destructive mt-1">{errors.numberOfStudents}</p>}
          </div>
          
          <div>
            <Label htmlFor="fsmEligibility">FSM Eligibility % *</Label>
            <Select value={formData.fsmEligibility} onValueChange={(v) => handleInputChange("fsmEligibility", v)}>
              <SelectTrigger className={errors.fsmEligibility ? "border-destructive" : ""}>
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50">
                {fsmOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.fsmEligibility && <p className="text-sm text-destructive mt-1">{errors.fsmEligibility}</p>}
          </div>

          <div>
            <Label htmlFor="ofstedRating">OFSTED Rating (optional)</Label>
            <Select value={formData.ofstedRating} onValueChange={(v) => handleInputChange("ofstedRating", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50">
                {ofstedRatings.map((rating) => (
                  <SelectItem key={rating} value={rating}>{rating}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">Contact Information</h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contactName">Your Name *</Label>
            <Input
              id="contactName"
              value={formData.contactName}
              onChange={(e) => handleInputChange("contactName", e.target.value)}
              className={errors.contactName ? "border-destructive" : ""}
            />
            {errors.contactName && <p className="text-sm text-destructive mt-1">{errors.contactName}</p>}
          </div>
          
          <div>
            <Label htmlFor="contactRole">Your Role *</Label>
            <Select value={formData.contactRole} onValueChange={(v) => handleInputChange("contactRole", v)}>
              <SelectTrigger className={errors.contactRole ? "border-destructive" : ""}>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50">
                {contactRoles.map((role) => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.contactRole && <p className="text-sm text-destructive mt-1">{errors.contactRole}</p>}
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
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={errors.phone ? "border-destructive" : ""}
            />
            {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
          </div>
        </div>
      </div>

      {/* Current Situation */}
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">Current Situation</h4>
        <div className="space-y-4">
          <div>
            <Label htmlFor="careersProvision">Current careers provision *</Label>
            <Select value={formData.careersProvision} onValueChange={(v) => handleInputChange("careersProvision", v)}>
              <SelectTrigger className={errors.careersProvision ? "border-destructive" : ""}>
                <SelectValue placeholder="Select provision level" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50">
                {careersProvisions.map((prov) => (
                  <SelectItem key={prov} value={prov}>{prov}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.careersProvision && <p className="text-sm text-destructive mt-1">{errors.careersProvision}</p>}
          </div>
          
          <div>
            <Label className="mb-3 block">Main work experience challenges (select all that apply)</Label>
            <div className="grid sm:grid-cols-2 gap-3">
              {challengeOptions.map((challenge) => (
                <div key={challenge} className="flex items-center gap-3">
                  <Checkbox
                    id={`challenge-${challenge}`}
                    checked={formData.workExperienceChallenges.includes(challenge)}
                    onCheckedChange={() => handleMultiToggle("workExperienceChallenges", challenge)}
                  />
                  <Label htmlFor={`challenge-${challenge}`} className="text-sm cursor-pointer">
                    {challenge}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Student Demographics */}
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">Student Demographics</h4>
        <div className="space-y-4">
          <div>
            <Label className="mb-3 block">Target year groups *</Label>
            <div className="flex flex-wrap gap-3">
              {yearGroups.map((year) => (
                <div key={year} className="flex items-center gap-2">
                  <Checkbox
                    id={`year-${year}`}
                    checked={formData.targetYearGroups.includes(year)}
                    onCheckedChange={() => handleMultiToggle("targetYearGroups", year)}
                  />
                  <Label htmlFor={`year-${year}`} className="text-sm cursor-pointer">
                    {year}
                  </Label>
                </div>
              ))}
            </div>
            {errors.targetYearGroups && <p className="text-sm text-destructive mt-1">{errors.targetYearGroups}</p>}
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="estimatedStudents">Estimated students interested in STEM placements *</Label>
              <Input
                id="estimatedStudents"
                type="text"
                value={formData.estimatedStudents}
                onChange={(e) => handleInputChange("estimatedStudents", e.target.value)}
                placeholder="e.g., 50"
                className={errors.estimatedStudents ? "border-destructive" : ""}
              />
              {errors.estimatedStudents && <p className="text-sm text-destructive mt-1">{errors.estimatedStudents}</p>}
            </div>
            
            <div>
              <Label htmlFor="priorityGroups">Specific student groups to prioritize (optional)</Label>
              <Input
                id="priorityGroups"
                value={formData.priorityGroups}
                onChange={(e) => handleInputChange("priorityGroups", e.target.value)}
                placeholder="e.g., young women in tech, underrepresented minorities"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">Additional Information</h4>
        <div>
          <Label htmlFor="successDefinition">What would success look like for your school? (optional)</Label>
          <Textarea
            id="successDefinition"
            value={formData.successDefinition}
            onChange={(e) => handleInputChange("successDefinition", e.target.value)}
            placeholder="e.g., More students pursuing STEM A-Levels, better OFSTED engagement scores..."
            className="min-h-[100px]"
            maxLength={500}
          />
          <p className="text-xs text-muted-foreground mt-1">
            {formData.successDefinition?.length || 0}/500 characters
          </p>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="text-sm text-muted-foreground border-t border-border pt-6">
        <p>
          School data used only for program coordination.{" "}
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
          "Register Your School"
        )}
      </Button>
    </form>
  );
}
