import { NextResponse } from "next/server";
import mailchimp from "@mailchimp/mailchimp_marketing";
import fetch from "node-fetch";


interface RecaptchaResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
}


mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: "us3", 
});

const listId = process.env.MAILCHIMP_AUDIENCE_ID;


console.log("MAILCHIMP_API_KEY:", process.env.MAILCHIMP_API_KEY);
console.log("MAILCHIMP_AUDIENCE_ID:", process.env.MAILCHIMP_AUDIENCE_ID);

export async function POST(request: Request) {
  const { email, honeypot, recaptchaToken } = await request.json();

  if (honeypot) {
    return NextResponse.json({ message: "Spam detected" }, { status: 400 });
  }

  const recaptchaResponse = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    { method: "POST" }
  );
  const recaptchaData = (await recaptchaResponse.json()) as RecaptchaResponse;

  if (!recaptchaData.success) {
    console.error("reCAPTCHA verification failed with errors:", recaptchaData["error-codes"]);
    return NextResponse.json(
      { message: "reCAPTCHA verification failed" },
      { status: 400 }
    );
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { message: "Invalid email address" },
      { status: 400 }
    );
  }

  if (!process.env.MAILCHIMP_API_KEY) {
    return NextResponse.json(
      { message: "Mailchimp API key not configured" },
      { status: 500 }
    );
  }

  if (!listId) {
    return NextResponse.json(
      { message: "Mailchimp Audience ID not configured" },
      { status: 500 }
    );
  }

  try {

    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: "subscribed",
    });

    if (response.status === "subscribed") {
      return NextResponse.json({ message: "Subscribed successfully" });
    } else {
      throw new Error("Failed to subscribe");
    }
  } catch (error: any) {
    if (error.response?.body?.title === "Member Exists") {
      return NextResponse.json(
        { message: "Email already subscribed" },
        { status: 400 }
      );
    }
    console.error("Mailchimp error:", error.response?.body || error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}