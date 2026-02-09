import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft, Building2, AlertCircle } from "lucide-react";
import { SEO } from "@/components/SEO";
import { SchoolCombobox } from "@/components/corporate/SchoolCombobox";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const signupSchema = z
  .object({
    full_name: z.string().trim().min(1, { message: "Full name is required" }).max(200),
    email: z.string().trim().email({ message: "Please enter a valid email address" }),
    job_title: z.string().trim().min(1, { message: "Job title is required" }).max(200),
    school_name: z.string().optional(),
    background_info: z
      .string()
      .trim()
      .min(1, { message: "Please provide some background information" })
      .max(500, { message: "Background must be 500 characters or less" }),
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

interface SelectedSchool {
  id: string;
  name: string;
  isNew: boolean;
}

export default function MentorSignup() {
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
    full_name: "",
    email: "",
    job_title: "",
    school_name: "",
    background_info: "",
    password: "",
    confirm_password: "",
    agree_terms: false,
  });
  const [selectedSchool, setSelectedSchool] = useState<SelectedSchool | null>(null);

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
      const redirectUrl = `${window.location.origin}/mentor-dashboard`;

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

      // 2. Create user role (mentor)
      const { error: roleError } = await supabase.from("user_roles").insert({
        user_id: authData.user.id,
        role: "mentor",
      });

      if (roleError) {
        console.error("Error creating role:", roleError);
        throw new Error("Failed to set up account role");
      }

      // 3. Handle school selection - create pending school if new
      let schoolId: string | null = null;
      let pendingSchoolId: string | null = null;

      if (selectedSchool) {
        if (selectedSchool.isNew) {
          // Add to state school directory first
          await supabase
            .from("school_directory")
            .upsert({ school_name: selectedSchool.name }, { onConflict: "school_name" });

          // Create a new pending school for this corporate
          const { data: newPendingSchool, error: pendingError } = await supabase
            .from("pending_schools")
            .insert({
              school_name: selectedSchool.name,
              corporate_id: corporateId,
            })
            .select("id")
            .single();

          if (pendingError) {
            console.error("Error creating pending school:", pendingError);
          } else {
            pendingSchoolId = newPendingSchool.id;
          }
        }
        // For existing schools from directory, we still create a pending_school record
        // since mentor_profiles links to pending_schools, not school_directory
        else {
          // Check if this school already exists as pending for this corporate
          const { data: existingPending } = await supabase
            .from("pending_schools")
            .select("id")
            .eq("school_name", selectedSchool.name)
            .eq("corporate_id", corporateId)
            .maybeSingle();

          if (existingPending) {
            pendingSchoolId = existingPending.id;
          } else {
            // Check if registered
            const { data: existingRegistered } = await supabase
              .from("school_profiles")
              .select("id")
              .eq("school_name", selectedSchool.name)
              .eq("corporate_id", corporateId)
              .maybeSingle();

            if (existingRegistered) {
              schoolId = existingRegistered.id;
            } else {
              // Create pending school for this corporate
              const { data: newPending } = await supabase
                .from("pending_schools")
                .insert({
                  school_name: selectedSchool.name,
                  corporate_id: corporateId,
                })
                .select("id")
                .single();
              
              if (newPending) {
                pendingSchoolId = newPending.id;
              }
            }
          }
        }
      }

      // 4. Create mentor profile linked to user, corporate, and optionally school
      const { error: profileError } = await supabase.from("mentor_profiles").insert({
        user_id: authData.user.id,
        corporate_id: corporateId,
        full_name: formData.full_name,
        company: companyName,
        job_title: formData.job_title,
        background_info: formData.background_info,
        school_id: schoolId,
        pending_school_id: pendingSchoolId,
      });

      if (profileError) {
        console.error("Error creating profile:", profileError);
        throw new Error("Failed to create mentor profile");
      }

      // 4. Send welcome email (fire and forget)
      supabase.functions.invoke("send-welcome-email", {
        body: {
          type: "mentor_welcome",
          email: formData.email,
          data: { mentorName: formData.full_name },
        },
      }).then(({ error }) => {
        if (error) console.error("Error sending welcome email:", error);
      });

      // 5. Notify corporate about new signup (fire and forget)
      if (corporateId) {
        supabase.functions.invoke("send-welcome-email", {
          body: {
            type: "new_signup_notification",
            email: "", // Will be fetched by edge function
            data: {
              signupType: "mentor",
              entityName: formData.full_name,
              corporateId: corporateId,
            },
          },
        }).then(({ error }) => {
          if (error) console.error("Error sending notification:", error);
        });
      }

      // 6. Success - redirect to dashboard
      toast({
        title: "Account Created!",
        description: `Welcome to Gen-Connect, ${formData.full_name}!`,
      });

      navigate("/mentor-dashboard");
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
          keywords="mentor signup, invitation"
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
        title="Mentor Signup"
        description="Join Gen-Connect as a mentor and help students from diverse backgrounds discover STEM careers."
        keywords="mentor signup, STEM mentorship, diversity, social mobility"
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
              <h1 className="text-3xl font-bold text-foreground mb-2">Join as a Mentor</h1>
              <p className="text-muted-foreground">
                You've been invited by <span className="font-medium">{companyName}</span> to become
                a mentor
              </p>
            </div>

            {/* Company Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
                <Building2 className="w-4 h-4" />
                <span className="text-sm font-medium">Invited by: {companyName}</span>
              </div>
            </div>

            {/* Signup Card */}
            <div className="bg-background rounded-2xl shadow-card p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information Section */}
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
                    Personal Information
                  </h2>
                  <div className="space-y-4">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <Label htmlFor="full_name">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="full_name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.full_name}
                        onChange={(e) => handleInputChange("full_name", e.target.value)}
                        className={errors.full_name ? "border-destructive" : ""}
                        disabled={isLoading}
                      />
                      {errors.full_name && (
                        <p className="text-sm text-destructive">{errors.full_name}</p>
                      )}
                    </div>

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
                  </div>
                </div>

                {/* Professional Background Section */}
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
                    Professional Background
                  </h2>
                  <div className="space-y-4">
                    {/* Job Title */}
                    <div className="space-y-2">
                      <Label htmlFor="job_title">
                        Job Title <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="job_title"
                        type="text"
                        placeholder="Your role"
                        value={formData.job_title}
                        onChange={(e) => handleInputChange("job_title", e.target.value)}
                        className={errors.job_title ? "border-destructive" : ""}
                        disabled={isLoading}
                      />
                      {errors.job_title && (
                        <p className="text-sm text-destructive">{errors.job_title}</p>
                      )}
                    </div>

                    {/* School Selection */}
                    <div className="space-y-2">
                      <Label>
                        Associated School <span className="text-muted-foreground text-xs">(optional)</span>
                      </Label>
                      <SchoolCombobox
                        value={selectedSchool?.name || ""}
                        onSelect={(school) => {
                          setSelectedSchool(school);
                          handleInputChange("school_name", school?.name || "");
                        }}
                        disabled={isLoading}
                      />
                      <p className="text-xs text-muted-foreground">
                        Select an existing school or add a new one if not listed
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="background_info">
                        Brief Background (for matching) <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="background_info"
                        placeholder="Share your background, interests, and what you'd like to share with students..."
                        value={formData.background_info}
                        onChange={(e) => handleInputChange("background_info", e.target.value)}
                        className={`min-h-[100px] ${errors.background_info ? "border-destructive" : ""}`}
                        disabled={isLoading}
                        maxLength={500}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Used to match you with students from similar backgrounds</span>
                        <span>{formData.background_info.length}/500</span>
                      </div>
                      {errors.background_info && (
                        <p className="text-sm text-destructive">{errors.background_info}</p>
                      )}
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
                    "Create Mentor Account"
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
