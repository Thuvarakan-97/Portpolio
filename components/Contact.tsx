// components/Contact.tsx

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure the component only renders on the client side for hCaptcha
  useEffect(() => {
    setIsClient(true);

    // Dynamically load the Web3Forms hCaptcha script
    const script = document.createElement("script");
    script.src = "https://web3forms.com/client/script.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null); // Reset status before submitting

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({ type: "error", message: "Please enter a valid email address." });
      setIsSubmitting(false);
      return;
    }

    // Basic phone number validation (if provided)
    // const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    // if (formData.phone && !phoneRegex.test(formData.phone)) {
    //   setFormStatus({ type: "error", message: "Please enter a valid phone number." });
    //   setIsSubmitting(false);
    //   return;
    // }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("access_key", "14be2c24-8db6-465b-a13e-689b6500e672"); // Replace with your Web3Forms access key
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone); // Add phone number to form data
      formDataToSend.append("message", formData.message);
      formDataToSend.append("subject", "New Contact Form Submission"); // Optional: Customize the email subject

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();
      if (result.success) {
        setFormStatus({ type: "success", message: "Message sent successfully!" });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setFormStatus({ type: "error", message: result.message || "Failed to send message." });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus({ type: "error", message: "An error occurred. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-gradient-to-b from-muted/50 to-background dark:from-black dark:to-black">
      <div className="container px-4 md:px-6">
        {/* Section Title with Gradient Underline */}
        <h2 className="text-4xl font-bold text-center mb-12 relative text-foreground dark:text-white">
          Get in Touch
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary to-transparent" />
        </h2>
        {/* Contact Form Card */}
        <Card className="max-w-md mx-auto p-8 bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 dark:bg-black/90 dark:border-gray-600 dark:shadow-gray-900">
          <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent" />
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="text-sm font-medium text-foreground dark:text-gray-200">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 dark:bg-black/50 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-primary-foreground"
                required
                placeholder="Your Name"
              />
            </div>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="text-sm font-medium text-foreground dark:text-gray-200">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 dark:bg-black/50 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-primary-foreground"
                required
                placeholder="your.email@example.com"
              />
            </div>
            {/* Phone Number Field (Optional) */}
            <div>
              <label htmlFor="phone" className="text-sm font-medium text-foreground dark:text-gray-200">
                Phone Number (Optional)
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 dark:bg-black/50 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-primary-foreground"
                placeholder="011 1234567"
              />
            </div>
            {/* Message Field */}
            <div>
              <label htmlFor="message" className="text-sm font-medium text-foreground dark:text-gray-200">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 dark:bg-black/50 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-primary-foreground"
                rows={4}
                required
                placeholder="Your message here..."
              />
            </div>
            {/* hCaptcha Widget (Render only on client side) */}
            {isClient && <div className="h-captcha" data-captcha="true" data-theme="dark"></div>}
            {/* Form Status Message */}
            {formStatus && (
              <div
                className={`text-sm text-center p-2 rounded-lg mx-auto ${
                  formStatus.type === "success"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                }`}
              >
                {formStatus.message}
              </div>
            )}
            {/* Submit Button with Loading Spinner */}
            <Button
              type="submit"
              className="w-full bg-primary text-white hover:bg-primary/90 hover:-translate-y-1 transition-all duration-300 dark:bg-primary-foreground dark:text-black dark:hover:bg-primary-foreground/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}