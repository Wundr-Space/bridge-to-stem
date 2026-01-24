import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { Loader2, ArrowLeft, AlertTriangle } from "lucide-react";
import { SEO } from "@/components/SEO";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const signupSchema = z
  .object({
    company_name: z.string().trim().min(1, { message: "Company name is required" }).max(200),
    industry: z.string().min(1, { message: "Please select an industry" }),
    company_size: z.string().min(1, { message: "Please select company size" }),
    email: z.string().trim().email({ message: "Please enter a valid email address" }),
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

const industries = [
  "Technology",
  "Financial Services",
  "Professional Services",
  "Consulting",
  "Healthcare",
  "Manufacturing",
  "Retail",
  "Energy",
  "Other",
];

const companySizes = [
  "1,000-5,000 employees",
  "5,000-10,000 employees",
  "10,000-25,000 employees",
  "25,000+ employees",
];

export default function CorporateSignup() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof SignupFormData, string>>>({});
  const [formData, setFormData] = useState<SignupFormData>({
    company_name: "",
    industry: "",
    company_size: "",
    email: "",
    password: "",
    confirm_password: "",
    agree_terms: false,
  });

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
      const redirectUrl = `${window.location.origin}/corporate-dashboard`;

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

      // 2. Create user role (corporate)
      const { error: roleError } = await supabase.from("user_roles").insert({
        user_id: authData.user.id,
        role: "corporate",
      });

      if (roleError) {
        console.error("Error creating role:", roleError);
        throw new Error("Failed to set up account role");
      }

      // 3. Create corporate profile
      const { error: profileError } = await supabase.from("corporate_profiles").insert({
        user_id: authData.user.id,
        company_name: formData.company_name,
        industry: formData.industry,
        company_size: formData.company_size,
      });

      if (profileError) {
        console.error("Error creating profile:", profileError);
        throw new Error("Failed to create company profile");
      }

      // 4. Success - redirect to dashboard
      toast({
        title: "Account Created!",
        description: `Welcome to Gen-Connect, ${formData.company_name}!`,
      });

      navigate("/corporate-dashboard");
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

  return (
    <>
      <SEO
        title="Corporate Signup"
        description="Create your Gen-Connect corporate account to access mentor and school signup links and start your social mobility pilot."
        keywords="corporate signup, STEM mentorship, social mobility, diversity impact"
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
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Start Your Social Mobility Pilot
              </h1>
              <p className="text-muted-foreground">
                Create your corporate account to access mentor and school signup links
              </p>
            </div>

            {/* Warning Notice */}
            <div className="bg-accent/20 border border-accent rounded-xl p-4 mb-8">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground mb-2">
                    ⚠️ CORPORATE SIGNUP ONLY
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    This page is for corporate partners to create accounts.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    If you are:
                  </p>
                  <ul className="text-sm text-muted-foreground list-disc list-inside ml-2">
                    <li>
                      <strong>A School</strong> → You'll receive a signup link from your corporate partner
                    </li>
                    <li>
                      <strong>A Mentor</strong> → You'll receive a signup link from your corporate partner
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-2 font-medium">
                    Do not use this page. Wait for your invitation email.
                  </p>
                </div>
              </div>
            </div>

            {/* Signup Card */}
            <div className="bg-background rounded-2xl shadow-card p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Company Information Section */}
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
                    Company Information
                  </h2>
                  <div className="space-y-4">
                    {/* Company Name */}
                    <div className="space-y-2">
                      <Label htmlFor="company_name">
                        Company Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="company_name"
                        type="text"
                        placeholder="Your company name"
                        value={formData.company_name}
                        onChange={(e) => handleInputChange("company_name", e.target.value)}
                        className={errors.company_name ? "border-destructive" : ""}
                        disabled={isLoading}
                      />
                      {errors.company_name && (
                        <p className="text-sm text-destructive">{errors.company_name}</p>
                      )}
                    </div>

                    {/* Industry & Company Size - Two columns on larger screens */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Industry */}
                      <div className="space-y-2">
                        <Label htmlFor="industry">
                          Industry <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={formData.industry}
                          onValueChange={(value) => handleInputChange("industry", value)}
                          disabled={isLoading}
                        >
                          <SelectTrigger
                            id="industry"
                            className={errors.industry ? "border-destructive" : ""}
                          >
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            {industries.map((industry) => (
                              <SelectItem key={industry} value={industry}>
                                {industry}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.industry && (
                          <p className="text-sm text-destructive">{errors.industry}</p>
                        )}
                      </div>

                      {/* Company Size */}
                      <div className="space-y-2">
                        <Label htmlFor="company_size">
                          Company Size <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={formData.company_size}
                          onValueChange={(value) => handleInputChange("company_size", value)}
                          disabled={isLoading}
                        >
                          <SelectTrigger
                            id="company_size"
                            className={errors.company_size ? "border-destructive" : ""}
                          >
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            {companySizes.map((size) => (
                              <SelectItem key={size} value={size}>
                                {size}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.company_size && (
                          <p className="text-sm text-destructive">{errors.company_size}</p>
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
                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email Address <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={errors.email ? "border-destructive" : ""}
                        disabled={isLoading}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email}</p>
                      )}
                    </div>

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
                <Button
                  type="submit"
                  variant="brand"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Corporate Account"
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
