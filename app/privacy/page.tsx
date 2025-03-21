// app/privacy/page.tsx

import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="py-16 bg-background dark:bg-black">
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground dark:text-white text-center mb-8">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground dark:text-gray-300 text-center mb-12">
          Last updated: March 20, 2025
        </p>

        <section className="space-y-6 text-foreground dark:text-gray-200">
          {/* Introduction */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              Welcome to Thuvarakan’s portfolio website ("we," "us," or "our"). We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services, including subscribing to our newsletter and interacting with our chatbot.
            </p>
            <p>
              By using our website, you agree to the terms of this Privacy Policy. If you do not agree with the practices described in this policy, please do not use our website.
            </p>
          </div>

          {/* Information We Collect */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Personal Information:</strong> When you sign up for our newsletter, we collect your email address. If you interact with our chatbot, we may collect your name, email address, and chat messages if you provide them. We do not collect any other personal information unless you voluntarily provide it (e.g., through a contact form, if available).
              </li>
              <li>
                <strong>Non-Personal Information:</strong> We may collect non-identifiable information such as your browser type, IP address, and pages visited on our website through cookies and similar technologies. This helps us improve your experience and analyze website usage.
              </li>
            </ul>
          </div>

          {/* How We Use Your Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Newsletter Subscription:</strong> To send you updates, news, and promotional content via email if you subscribe to our newsletter. You can unsubscribe at any time using the link provided in each email.
              </li>
              <li>
                <strong>Chatbot Interaction:</strong> To provide assistance, answer questions, and guide you through our website via our chatbot. Chat messages may be stored to improve our services and respond to your inquiries.
              </li>
              <li>
                <strong>Website Improvement:</strong> To analyze how users interact with our website and improve its functionality and content.
              </li>
              <li>
                <strong>Security:</strong> To protect our website from fraudulent or unauthorized access, including using reCAPTCHA to prevent spam submissions.
              </li>
            </ul>
          </div>

          {/* Third-Party Services */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">4. Third-Party Services</h2>
            <p>
              We use third-party services to manage our newsletter subscriptions, enhance website functionality, and provide chatbot services. These services may have access to your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Mailchimp:</strong> We use Mailchimp to manage our newsletter subscriptions. When you sign up for our newsletter, your email address is stored in Mailchimp’s servers. Mailchimp’s privacy policy can be found{" "}
                <a
                  href="https://mailchimp.com/legal/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  here
                </a>
                .
              </li>
              <li>
                <strong>Google reCAPTCHA:</strong> We use Google reCAPTCHA to prevent spam submissions in our newsletter signup form. This may involve collecting hardware and software information, such as IP addresses and device data. Google’s privacy policy can be found{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  here
                </a>
                .
              </li>
              <li>
                <strong>Tawk.to:</strong> We use Tawk.to to provide chatbot and live chat functionality on our website. If you interact with the chatbot, Tawk.to may collect your name, email address, and chat messages if you provide them. Tawk.to’s privacy policy can be found{" "}
                <a
                  href="https://www.tawk.to/privacy-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  here
                </a>
                .
              </li>
            </ul>
          </div>

          {/* Data Storage and Security */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">5. Data Storage and Security</h2>
            <p>
              We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            <p>
              Your email address is stored securely in Mailchimp’s servers, and chat data is stored in Tawk.to’s servers. We do not store this information directly on our website’s servers. We retain your information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by law.
            </p>
          </div>

          {/* Your Rights */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
            <p>You have the following rights regarding your personal information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Access and Update:</strong> You can access or update your email address by managing your subscription preferences through the link provided in our newsletter emails. For chat data, you can request access by contacting us.
              </li>
              <li>
                <strong>Unsubscribe:</strong> You can unsubscribe from our newsletter at any time by clicking the "Unsubscribe" link in any email you receive from us.
              </li>
              <li>
                <strong>Request Deletion:</strong> You can request the deletion of your personal information, including chat data, by contacting us at{" "}
                <a
                  href="mailto:thuvarakan@example.com"
                  className="text-primary hover:underline"
                >
                  thuvarakan@example.com
                </a>
                .
              </li>
            </ul>
          </div>

          {/* Cookies */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">7. Cookies</h2>
            <p>
              We use cookies and similar technologies to enhance your experience on our website. Cookies are small data files stored on your device that help us understand how you use our site. The chatbot may also use cookies to maintain chat sessions. You can manage your cookie preferences through your browser settings.
            </p>
          </div>

          {/* Changes to This Privacy Policy */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">8. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting the updated policy on this page with a revised "Last updated" date.
            </p>
          </div>

          {/* Contact Us */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or how we handle your personal information, please contact us at:
            </p>
            <p className="mt-2">
              Email:{" "}
              <a
                href="mailto:thuvarakan@example.com"
                className="text-primary hover:underline"
              >
                thuvarakan@example.com
              </a>
            </p>
          </div>
        </section>

        {/* Back to Home Link */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-primary hover:underline text-lg font-medium"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}