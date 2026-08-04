import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

serve(async (req) => {
  try {
    // Only accept POST requests from Supabase Webhooks
    if (req.method !== "POST") {
      return new Response("Method not allowed", { status: 405 })
    }

    // Parse the payload from the Supabase Database Webhook
    // (This triggers on INSERT to the public.profiles or auth.users table)
    const payload = await req.json();
    
    // Extract user details. Depending on your webhook setup, 
    // it might come from auth.users or public.profiles
    const record = payload.record;
    
    // We assume you set the webhook on public.profiles
    const email = record.email;
    const name = record.full_name || "ZooLearn Explorer";

    if (!email) {
      return new Response(JSON.stringify({ error: "No email provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    if (!RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY environment variable.");
      return new Response(JSON.stringify({ error: "Server Configuration Error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Prepare the email using Resend API
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        // IMPORTANT: Replace this with your actual verified sender domain in Resend
        from: "ZooLearn Academy <welcome@yourdomain.com>",
        to: email,
        subject: "Welcome to ZooLearn Academy! 🦒",
        html: `
<div style="max-width: 520px; margin: 0 auto; font-family: 'Segoe UI', Arial, sans-serif; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e7eb;">
  
  <!-- Header with logo -->
  <div style="background: linear-gradient(135deg, #059669, #0d9488); padding: 32px 24px; text-align: center;">
    <img src="https://res.cloudinary.com/duibfmcw1/image/upload/v1765947727/logopng_2_webaac.png" alt="ZooLearn" style="height: 56px; width: auto;" />
    <h1 style="color: #ffffff; font-size: 22px; margin: 16px 0 4px 0; font-weight: 700;">Welcome to ZooLearn!</h1>
    <p style="color: #d1fae5; font-size: 14px; margin: 0;">Your journey into the animal kingdom starts here</p>
  </div>

  <!-- Body -->
  <div style="padding: 32px 24px;">
    <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
      Hi ${name}! 👋
    </p>
    <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">
      Thank you for signing up for <strong>ZooLearn</strong>. We're thrilled to have you join our community of biology enthusiasts! You're all set to start exploring the animal kingdom.
    </p>

    <!-- CTA Button -->
    <div style="text-align: center; margin: 28px 0;">
      <a href="https://zoolearn.in/dashboard" style="display: inline-block; background: linear-gradient(135deg, #059669, #0d9488); color: #ffffff; text-decoration: none; padding: 14px 36px; border-radius: 12px; font-size: 15px; font-weight: 700; letter-spacing: 0.3px;">
        🚀 Go to Dashboard
      </a>
    </div>

    <p style="color: #6b7280; font-size: 13px; line-height: 1.6; margin: 24px 0 0 0;">
      If you didn't create an account on ZooLearn, you can safely ignore this email.
    </p>
  </div>

  <!-- Footer -->
  <div style="background-color: #f9fafb; padding: 20px 24px; text-align: center; border-top: 1px solid #e5e7eb;">
    <p style="color: #9ca3af; font-size: 12px; margin: 0;">
      © 2026 ZooLearn Academy · Made with 💚 for biology lovers
    </p>
    <p style="color: #9ca3af; font-size: 11px; margin: 8px 0 0 0;">
      <a href="https://zoolearn.in" style="color: #059669; text-decoration: none;">zoolearn.in</a>
    </p>
  </div>
</div>
        `
      })
    });

    const data = await res.json();

    if (res.ok) {
      return new Response(JSON.stringify({ message: "Email sent successfully", id: data.id }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      console.error("Resend API Error:", data);
      return new Response(JSON.stringify({ error: "Failed to send email", details: data }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

  } catch (err) {
    console.error("Internal Error:", err.message);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
})
