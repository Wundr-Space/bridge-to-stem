import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.91.1";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const BASE_URL = "https://bridge-to-stem.lovable.app";

interface EmailRequest {
  type: "corporate_welcome" | "mentor_welcome" | "school_welcome" | "new_signup_notification";
  email: string;
  data: {
    companyName?: string;
    corporateId?: string;
    mentorName?: string;
    schoolName?: string;
    signupType?: "mentor" | "school";
    entityName?: string;
  };
}

function getCorporateWelcomeEmail(companyName: string, corporateId: string) {
  const mentorLink = `${BASE_URL}/mentor-signup?corporate=${corporateId}`;
  const schoolLink = `${BASE_URL}/school-signup?corporate=${corporateId}`;

  return {
    subject: "Welcome to Gen-Connect - Your Social Mobility Program",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Gen-Connect</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <tr>
      <td style="background: linear-gradient(135deg, #1B4D3E 0%, #2A5F4F 100%); padding: 32px; border-radius: 16px 16px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Gen-Connect</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">Bridge to STEM Mentorship</p>
      </td>
    </tr>
    <tr>
      <td style="background: white; padding: 40px 32px; border-radius: 0 0 16px 16px;">
        <h2 style="color: #1B4D3E; margin: 0 0 16px 0; font-size: 24px;">Welcome, ${companyName}!</h2>
        <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
          Your corporate account has been created successfully. You're now ready to launch your social mobility program.
        </p>
        
        <h3 style="color: #1B4D3E; margin: 24px 0 16px 0; font-size: 18px;">Next Steps:</h3>
        <ol style="color: #4a5568; font-size: 16px; line-height: 1.8; margin: 0 0 24px 0; padding-left: 20px;">
          <li style="margin-bottom: 12px;">
            <strong>Share your mentor invitation link:</strong><br>
            <a href="${mentorLink}" style="color: #1B4D3E; word-break: break-all;">${mentorLink}</a>
          </li>
          <li style="margin-bottom: 12px;">
            <strong>Share your school invitation link:</strong><br>
            <a href="${schoolLink}" style="color: #1B4D3E; word-break: break-all;">${schoolLink}</a>
          </li>
          <li>
            <strong>Visit your dashboard</strong> to track signups and manage your program
          </li>
        </ol>
        
        <div style="text-align: center; margin: 32px 0;">
          <a href="${BASE_URL}/corporate-dashboard" style="display: inline-block; background: linear-gradient(135deg, #1B4D3E 0%, #2A5F4F 100%); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
            Go to Dashboard
          </a>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;">
        
        <p style="color: #718096; font-size: 14px; line-height: 1.6; margin: 0;">
          If you have any questions, please don't hesitate to reach out. We're here to help you make a difference.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding: 24px; text-align: center;">
        <p style="color: #a0aec0; font-size: 12px; margin: 0;">
          © ${new Date().getFullYear()} Gen-Connect. All rights reserved.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };
}

function getMentorWelcomeEmail(mentorName: string) {
  return {
    subject: "Welcome as a Mentor - Gen-Connect",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Gen-Connect</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <tr>
      <td style="background: linear-gradient(135deg, #1B4D3E 0%, #2A5F4F 100%); padding: 32px; border-radius: 16px 16px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Gen-Connect</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">Bridge to STEM Mentorship</p>
      </td>
    </tr>
    <tr>
      <td style="background: white; padding: 40px 32px; border-radius: 0 0 16px 16px;">
        <h2 style="color: #1B4D3E; margin: 0 0 16px 0; font-size: 24px;">Welcome, ${mentorName}!</h2>
        <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
          Thank you for joining as a mentor. You're now part of our social mobility program, helping students from underrepresented backgrounds access STEM careers.
        </p>
        
        <h3 style="color: #1B4D3E; margin: 24px 0 16px 0; font-size: 18px;">What's Next:</h3>
        <ul style="color: #4a5568; font-size: 16px; line-height: 1.8; margin: 0 0 24px 0; padding-left: 20px;">
          <li style="margin-bottom: 8px;">Complete your profile with your expertise and interests</li>
          <li style="margin-bottom: 8px;">Review available student placements</li>
          <li style="margin-bottom: 8px;">Set your availability for mentoring sessions</li>
          <li>Connect with partner schools</li>
        </ul>
        
        <div style="text-align: center; margin: 32px 0;">
          <a href="${BASE_URL}/mentor-dashboard" style="display: inline-block; background: linear-gradient(135deg, #1B4D3E 0%, #2A5F4F 100%); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
            Go to Dashboard
          </a>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;">
        
        <p style="color: #718096; font-size: 14px; line-height: 1.6; margin: 0;">
          Your participation makes a real difference in students' lives. Thank you for being part of this journey.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding: 24px; text-align: center;">
        <p style="color: #a0aec0; font-size: 12px; margin: 0;">
          © ${new Date().getFullYear()} Gen-Connect. All rights reserved.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };
}

function getSchoolWelcomeEmail(schoolName: string) {
  return {
    subject: "Welcome as Partner School - Gen-Connect",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Gen-Connect</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <tr>
      <td style="background: linear-gradient(135deg, #1B4D3E 0%, #2A5F4F 100%); padding: 32px; border-radius: 16px 16px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Gen-Connect</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">Bridge to STEM Mentorship</p>
      </td>
    </tr>
    <tr>
      <td style="background: white; padding: 40px 32px; border-radius: 0 0 16px 16px;">
        <h2 style="color: #1B4D3E; margin: 0 0 16px 0; font-size: 24px;">Welcome, ${schoolName}!</h2>
        <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
          Your school has been registered successfully as a partner in our social mobility program. Together, we'll help your students access STEM career opportunities.
        </p>
        
        <h3 style="color: #1B4D3E; margin: 24px 0 16px 0; font-size: 18px;">What's Next:</h3>
        <ul style="color: #4a5568; font-size: 16px; line-height: 1.8; margin: 0 0 24px 0; padding-left: 20px;">
          <li style="margin-bottom: 8px;">Browse available mentors from partner companies</li>
          <li style="margin-bottom: 8px;">Nominate students for work experience placements</li>
          <li style="margin-bottom: 8px;">Schedule work experience sessions</li>
          <li>Track student outcomes and progress</li>
        </ul>
        
        <div style="text-align: center; margin: 32px 0;">
          <a href="${BASE_URL}/school-dashboard" style="display: inline-block; background: linear-gradient(135deg, #1B4D3E 0%, #2A5F4F 100%); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
            Go to Dashboard
          </a>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;">
        
        <p style="color: #718096; font-size: 14px; line-height: 1.6; margin: 0;">
          We're excited to partner with you in opening doors for your students. Let's make a difference together.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding: 24px; text-align: center;">
        <p style="color: #a0aec0; font-size: 12px; margin: 0;">
          © ${new Date().getFullYear()} Gen-Connect. All rights reserved.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };
}

function getNewSignupNotificationEmail(signupType: string, entityName: string) {
  return {
    subject: `New ${signupType} signed up - Gen-Connect`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New ${signupType} Registration</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <tr>
      <td style="background: linear-gradient(135deg, #1B4D3E 0%, #2A5F4F 100%); padding: 32px; border-radius: 16px 16px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Gen-Connect</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">Bridge to STEM Mentorship</p>
      </td>
    </tr>
    <tr>
      <td style="background: white; padding: 40px 32px; border-radius: 0 0 16px 16px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="display: inline-block; background: #e6f4f1; color: #1B4D3E; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600;">
            New Registration
          </div>
        </div>
        
        <h2 style="color: #1B4D3E; margin: 0 0 16px 0; font-size: 24px; text-align: center;">
          New ${signupType.charAt(0).toUpperCase() + signupType.slice(1)} Joined!
        </h2>
        
        <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0; text-align: center;">
          <strong>${entityName}</strong> has joined your social mobility program.
        </p>
        
        <div style="text-align: center; margin: 32px 0;">
          <a href="${BASE_URL}/corporate-dashboard" style="display: inline-block; background: linear-gradient(135deg, #1B4D3E 0%, #2A5F4F 100%); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
            View Dashboard
          </a>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;">
        
        <p style="color: #718096; font-size: 14px; line-height: 1.6; margin: 0; text-align: center;">
          Your program is growing! Visit your dashboard to see all registered mentors and schools.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding: 24px; text-align: center;">
        <p style="color: #a0aec0; font-size: 12px; margin: 0;">
          © ${new Date().getFullYear()} Gen-Connect. All rights reserved.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, email, data }: EmailRequest = await req.json();

    console.log(`Processing email request: type=${type}, email=${email}`);

    let emailContent: { subject: string; html: string };

    switch (type) {
      case "corporate_welcome":
        if (!data.companyName || !data.corporateId) {
          throw new Error("Missing companyName or corporateId for corporate welcome email");
        }
        emailContent = getCorporateWelcomeEmail(data.companyName, data.corporateId);
        break;

      case "mentor_welcome":
        if (!data.mentorName) {
          throw new Error("Missing mentorName for mentor welcome email");
        }
        emailContent = getMentorWelcomeEmail(data.mentorName);
        break;

      case "school_welcome":
        if (!data.schoolName) {
          throw new Error("Missing schoolName for school welcome email");
        }
        emailContent = getSchoolWelcomeEmail(data.schoolName);
        break;

      case "new_signup_notification":
        if (!data.signupType || !data.entityName || !data.corporateId) {
          throw new Error("Missing signupType, entityName, or corporateId for notification email");
        }
        
        // Fetch corporate email from database
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        const { data: corporateProfile, error: fetchError } = await supabase
          .from("corporate_profiles")
          .select("user_id")
          .eq("id", data.corporateId)
          .single();

        if (fetchError || !corporateProfile) {
          console.error("Error fetching corporate profile:", fetchError);
          throw new Error("Could not find corporate profile");
        }

        const { data: userData, error: userError } = await supabase.auth.admin.getUserById(
          corporateProfile.user_id
        );

        if (userError || !userData.user) {
          console.error("Error fetching user:", userError);
          throw new Error("Could not find corporate user");
        }

        const corporateEmail = userData.user.email;
        if (!corporateEmail) {
          throw new Error("Corporate user has no email");
        }

        emailContent = getNewSignupNotificationEmail(data.signupType, data.entityName);
        
        // Override email with corporate's email for notification
        const notificationResult = await resend.emails.send({
          from: "Gen-Connect <noreply@resend.dev>",
          to: [corporateEmail],
          subject: emailContent.subject,
          html: emailContent.html,
        });

        console.log("Notification email sent successfully:", notificationResult);

        return new Response(JSON.stringify({ success: true, data: notificationResult }), {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });

      default:
        throw new Error(`Unknown email type: ${type}`);
    }

    // Send the email (for non-notification types)
    const result = await resend.emails.send({
      from: "Gen-Connect <noreply@resend.dev>",
      to: [email],
      subject: emailContent.subject,
      html: emailContent.html,
    });

    console.log("Email sent successfully:", result);

    return new Response(JSON.stringify({ success: true, data: result }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in send-welcome-email function:", errorMessage);
    
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
