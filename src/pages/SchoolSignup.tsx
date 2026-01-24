import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft, Building2, AlertCircle } from "lucide-react";
import { SEO } from "@/components/SEO";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const signupSchema = z
  .object({
    school_name: z.string().trim().min(1, { message: "School name is required" }).max(200),
    school_type: z.string().min(1, { message: "Please select school type" }),
    location: z.string().trim().min(1, { message: "Location is required" }).max(200),
    student_count: z.string().min(1, { message: "Please select student count" }),
    fsm_percentage: z.string().min(1, { message: "Please select FSM percentage" }),
    contact_name: z.string().trim().min(1, { message: "Your name is required" }).max(200),
    contact_role: z.string().min(1, { message: "Please select your role" }),
    email: z.string().trim().email({ message: "Please enter a valid email address" }),
    phone: z
      .string()
      .trim()
      .min(1, { message: "Phone number is required" })
      .regex(/^[\d\s\-+()]+$/, { message: "Please enter a valid phone number" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(passwordRegex, {
        message: "Password must include uppercase, lowercase, and a number",
      }),
    confirm_password: z.string(),
    agree_terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

const schoolTypes = [
  "State Comprehensive",
  "Academy",
  "Grammar School",
  "Free School",
  "Independent",
  "Other",
];

const studentCounts = ["Less than 500", "500-1,000", "1,000-1,500", "1,500+"];

const fsmRanges = ["Less than 15%", "15-30%", "30-45%", "45%+"];

const contactRoles = [
  "Head Teacher",
  "Deputy Head",
  "Careers Advisor",
  "Head of Year",
  "STEM Coordinator",
  "Other",
];

export default function SchoolSignup() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const corporateId = searchParams.get("corporate");

  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof SignupFormData, string>>>({});
  const [formData, setFormData] = useState<SignupFormData>({
    school_name: "",
    school_type: "",
    location: "",
    student_count: "",
    fsm_percentage: "",
    contact_name: "",
    contact_role: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
    agree_terms: false,
  });

  // Validate corporate invitation on load
  useEffect(() => {
    validateInvitation();
  }, [corporateId]);

  const validateInvitation = async () => {
    if (!corporateId) {
      setIsValidating(false);
      setIsValid(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("corporate_profiles")
        .select("company_name")
        .eq("id", corporateId)
        .maybeSingle();

      if (error || !data) {
        setIsValid(false);
      } else {
        setIsValid(true);
        setCompanyName(data.company_name);
      }
    } catch (error) {
      console.error("Error validating invitation:", error);
      setIsValid(false);
    } finally {
      setIsValidating(false);
    }
  };

  const handleInputChange = (field: keyof SignupFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const result = signupSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof SignupFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof SignupFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/school-dashboard`;

      // 1. Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (authError) {
        if (authError.message.includes("already registered")) {
          throw new Error("This email is already registered. Please login instead.");
        }
        throw authError;
      }

      if (!authData.user) {
        throw new Error("Failed to create account");
      }

      // 2. Create user role (school)
      const { error: roleError } = await supabase.from("user_roles").insert({
        user_id: authData.user.id,
        role: "school",
      });

      if (roleError) {
        console.error("Error creating role:", roleError);
        throw new Error("Failed to set up account role");
      }

      // 3. Create school profile linked to user AND corporate
      const { error: profileError } = await supabase.from("school_profiles").insert({
        user_id: authData.user.id,
        corporate_id: corporateId,
        school_name: formData.school_name,
        school_type: formData.school_type,
        location: formData.location,
        student_count: formData.student_count,
        fsm_percentage: formData.fsm_percentage,
        contact_name: formData.contact_name,
        contact_role: formData.contact_role,
        phone: formData.phone,
      });

      if (profileError) {
        console.error("Error creating profile:", profileError);
        throw new Error("Failed to create school profile");
      }

      // 4. Success - redirect to dashboard
      toast({
        title: "Account Created!",
        description: `Welcome to Gen-Connect, ${formData.school_name}!`,
      });

      navigate("/school-dashboard");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to create account";
      toast({
        title: "Signup Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (isValidating) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Invalid invitation
  if (!isValid) {
    return (
      <>
        <SEO
          title="Invalid Invitation"
          description="This invitation link is invalid or has expired."
          keywords="school signup, invitation"
        />
        <div className="min-h-screen bg-muted/30 flex flex-col">
          <header className="bg-background border-b border-border">
            <div className="container mx-auto px-4 py-4">
              <Link to="/" className="inline-flex items-center gap-2 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-brand">
                  <span className="text-white font-bold text-lg">G</span>
                </div>
                <span className="text-xl font-bold text-foreground">
                  Gen<span className="text-primary">-Connect</span>
                </span>
              </Link>
            </div>
          </header>
          <main className="flex-1 flex items-center justify-center px-4">
            <div className="bg-background rounded-2xl shadow-card p-8 max-w-md text-center">
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-destructive" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Invalid Invitation</h1>
              <p className="text-muted-foreground mb-6">
                This invitation link is invalid or has expired. Please contact your corporate
                partner for a new invitation link.
              </p>
              <div className="space-y-3">
                <Link to="/">
                  <Button variant="brand" className="w-full">
                    Go to Homepage
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    Already have an account? Login
                  </Button>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="School Signup"
        description="Register your school for Gen-Connect's social mobility program and connect students with STEM mentors."
        keywords="school signup, STEM mentorship, social mobility, work experience"
      />

      <div className="min-h-screen bg-muted/30 flex flex-col">
        {/* Header */}
        <header className="bg-background border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-brand group-hover:shadow-brand-lg transition-shadow duration-300">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <span className="text-xl font-bold text-foreground">
                Gen<span className="text-primary">-Connect</span>
              </span>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 py-12 px-4">
          <div className="container mx-auto max-w-[500px]">
            {/* Back Link */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            {/* Hero */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Partner School Registration
              </h1>
              <p className="text-muted-foreground">
                You've been invited by <span className="font-medium">{companyName}</span> to join
                their social mobility program
              </p>
            </div>

            {/* Company Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full">
                <Building2 className="w-4 h-4" />
                <span className="text-sm font-medium">Corporate Partner: {companyName}</span>
              </div>
            </div>

            {/* Signup Card */}
            <div className="bg-background rounded-2xl shadow-card p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* School Information Section */}
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
                    School Information
                  </h2>
                  <div className="space-y-4">
                    {/* School Name */}
                    <div className="space-y-2">
                      <Label htmlFor="school_name">
                        School Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="school_name"
                        type="text"
                        placeholder="Your school name"
                        value={formData.school_name}
                        onChange={(e) => handleInputChange("school_name", e.target.value)}
                        className={errors.school_name ? "border-destructive" : ""}
                        disabled={isLoading}
                      />
                      {errors.school_name && (
                        <p className="text-sm text-destructive">{errors.school_name}</p>
                      )}
                    </div>

                    {/* School Type & Location */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="school_type">
                          School Type <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={formData.school_type}
                          onValueChange={(value) => handleInputChange("school_type", value)}
                          disabled={isLoading}
                        >
                          <SelectTrigger
                            id="school_type"
                            className={errors.school_type ? "border-destructive" : ""}
                          >
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {schoolTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.school_type && (
                          <p className="text-sm text-destructive">{errors.school_type}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">
                          Location (Town/City) <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="location"
                          type="text"
                          placeholder="Town or city"
                          value={formData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          className={errors.location ? "border-destructive" : ""}
                          disabled={isLoading}
                        />
                        {errors.location && (
                          <p className="text-sm text-destructive">{errors.location}</p>
                        )}
                      </div>
                    </div>

                    {/* Student Count & FSM */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="student_count">
                          Number of Students <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={formData.student_count}
                          onValueChange={(value) => handleInputChange("student_count", value)}
                          disabled={isLoading}
                        >
                          <SelectTrigger
                            id="student_count"
                            className={errors.student_count ? "border-destructive" : ""}
                          >
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent>
                            {studentCounts.map((count) => (
                              <SelectItem key={count} value={count}>
                                {count}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.student_count && (
                          <p className="text-sm text-destructive">{errors.student_count}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fsm_percentage">
                          FSM Eligibility % <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={formData.fsm_percentage}
                          onValueChange={(value) => handleInputChange("fsm_percentage", value)}
                          disabled={isLoading}
                        >
                          <SelectTrigger
                            id="fsm_percentage"
                            className={errors.fsm_percentage ? "border-destructive" : ""}
                          >
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent>
                            {fsmRanges.map((range) => (
                              <SelectItem key={range} value={range}>
                                {range}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.fsm_percentage && (
                          <p className="text-sm text-destructive">{errors.fsm_percentage}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information Section */}
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    {/* Contact Name & Role */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contact_name">
                          Your Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="contact_name"
                          type="text"
                          placeholder="Your full name"
                          value={formData.contact_name}
                          onChange={(e) => handleInputChange("contact_name", e.target.value)}
                          className={errors.contact_name ? "border-destructive" : ""}
                          disabled={isLoading}
                        />
                        {errors.contact_name && (
                          <p className="text-sm text-destructive">{errors.contact_name}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contact_role">
                          Your Role <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={formData.contact_role}
                          onValueChange={(value) => handleInputChange("contact_role", value)}
                          disabled={isLoading}
                        >
                          <SelectTrigger
                            id="contact_role"
                            className={errors.contact_role ? "border-destructive" : ""}
                          >
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            {contactRoles.map((role) => (
                              <SelectItem key={role} value={role}>
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.contact_role && (
                          <p className="text-sm text-destructive">{errors.contact_role}</p>
                        )}
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Email Address <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@school.ac.uk"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={errors.email ? "border-destructive" : ""}
                          disabled={isLoading}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">{errors.email}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          Phone Number <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="01onal phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className={errors.phone ? "border-destructive" : ""}
                          disabled={isLoading}
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Credentials Section */}
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
                    Account Credentials
                  </h2>
                  <div className="space-y-4">
                    {/* Password */}
                    <div className="space-y-2">
                      <Label htmlFor="password">
                        Password <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Minimum 8 characters"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className={errors.password ? "border-destructive" : ""}
                        disabled={isLoading}
                      />
                      <p className="text-xs text-muted-foreground">
                        Must be at least 8 characters, include uppercase, lowercase, and number
                      </p>
                      {errors.password && (
                        <p className="text-sm text-destructive">{errors.password}</p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <Label htmlFor="confirm_password">
                        Confirm Password <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="confirm_password"
                        type="password"
                        placeholder="Re-enter password"
                        value={formData.confirm_password}
                        onChange={(e) => handleInputChange("confirm_password", e.target.value)}
                        className={errors.confirm_password ? "border-destructive" : ""}
                        disabled={isLoading}
                      />
                      {errors.confirm_password && (
                        <p className="text-sm text-destructive">{errors.confirm_password}</p>
                      )}
                    </div>

                    {/* Terms & Conditions */}
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Checkbox
                          id="agree_terms"
                          checked={formData.agree_terms}
                          onCheckedChange={(checked) =>
                            handleInputChange("agree_terms", checked === true)
                          }
                          disabled={isLoading}
                          className="mt-1"
                        />
                        <Label htmlFor="agree_terms" className="text-sm font-normal leading-relaxed">
                          I agree to the{" "}
                          <Link to="/terms" className="text-primary hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link to="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>
                      {errors.agree_terms && (
                        <p className="text-sm text-destructive">{errors.agree_terms}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button type="submit" variant="brand" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create School Account"
                  )}
                </Button>
              </form>

              {/* Footer Link */}
              <div className="mt-6 pt-6 border-t border-border text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Login →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
