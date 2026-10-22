// components/Contact.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, User, Phone, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/language";

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsClient(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Dynamically load the Web3Forms hCaptcha script
    const script = document.createElement("script");
    script.src = "https://web3forms.com/client/script.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      observer.disconnect();
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    switch (name) {
      case "name":
        if (!value.trim()) {
          newErrors.name = "Name is required";
        } else if (value.trim().length < 2) {
          newErrors.name = "Name must be at least 2 characters";
        } else {
          delete newErrors.name;
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          newErrors.email = "Email is required";
        } else if (!emailRegex.test(value)) {
          newErrors.email = "Please enter a valid email";
        } else {
          delete newErrors.email;
        }
        break;
      case "message":
        if (!value.trim()) {
          newErrors.message = "Message is required";
        } else if (value.trim().length < 10) {
          newErrors.message = "Message must be at least 10 characters";
        } else {
          delete newErrors.message;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);

    // Validate all fields
    Object.keys(formData).forEach((key) => {
      if (key !== "phone") {
        validateField(key, formData[key as keyof typeof formData]);
      }
    });

    if (Object.keys(errors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("access_key", "14be2c24-8db6-465b-a13e-689b6500e672");
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("message", formData.message);
      formDataToSend.append("subject", "New Contact Form Submission");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();
      if (result.success) {
        setFormStatus({ type: "success", message: "Message sent successfully! I'll get back to you soon." });
        setFormData({ name: "", email: "", phone: "", message: "" });
        setErrors({});
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
    <section 
      ref={sectionRef}
      id="contact" 
      className="py-20 bg-gradient-to-b from-muted/30 via-background to-muted/30 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="container px-4 md:px-6 relative z-10">
        {/* Section Title */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t("Get in Touch")}</span>
          </h2>
          <div className="mx-auto w-24 h-1.5 bg-gradient-to-r from-primary via-accent to-primary rounded-full"></div>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            {t("Have a project in mind? Let's work together to bring your ideas to life")}
          </p>
        </div>

        {/* Contact Form Card */}
        <Card className={`max-w-2xl mx-auto p-5 sm:p-8 md:p-10 border-2 text-center hover:border-primary/50 transition-all duration-1000 card-hover ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '400ms' }}>
          {/* Gradient Border Top */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Name Field */}
            <div className="group">
              <label htmlFor="name" className="flex items-center justify-center gap-2 text-sm font-semibold mb-2">
                <User className="w-4 h-4 text-primary" />
                <span>{t("Name")}</span>
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl bg-background/50 text-center focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 ${
                    errors.name ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder={t("Your Name")}
                />
                {errors.name && (
                  <p className="text-center text-red-500 text-xs mt-1">{t(errors.name)}</p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className="group">
              <label htmlFor="email" className="flex items-center justify-center gap-2 text-sm font-semibold mb-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>{t("Email")}</span>
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl bg-background/50 text-center focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 ${
                    errors.email ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-center text-red-500 text-xs mt-1">{t(errors.email)}</p>
                )}
              </div>
            </div>

            {/* Phone Number Field (Optional) */}
            <div className="group">
              <label htmlFor="phone" className="flex items-center justify-center gap-2 text-sm font-semibold mb-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>{t("Phone Number")} <span className="text-muted-foreground font-normal">({t("Optional")})</span></span>
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-border rounded-xl bg-background/50 text-center focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                placeholder="+49 (123) 456-7890"
              />
            </div>

            {/* Message Field */}
            <div className="group">
              <label htmlFor="message" className="flex items-center justify-center gap-2 text-sm font-semibold mb-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                <span>{t("Message")}</span>
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl bg-background/50 text-center focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 resize-none ${
                    errors.message ? 'border-red-500' : 'border-border'
                  }`}
                  rows={5}
                  placeholder={t("Tell me about your project...")}
                />
                {errors.message && (
                  <p className="text-center text-red-500 text-xs mt-1">{t(errors.message)}</p>
                )}
              </div>
            </div>

            {/* hCaptcha Widget */}
            {isClient && <div className="h-captcha" data-captcha="true" data-theme="dark"></div>}

            {/* Form Status Message */}
            {formStatus && (
              <div
                className={`flex items-center justify-center gap-3 p-4 rounded-xl animate-fade-in ${
                  formStatus.type === "success"
                    ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
                    : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
                }`}
              >
                {formStatus.type === "success" && <CheckCircle2 className="w-5 h-5 flex-shrink-0" />}
                <span className="text-sm font-medium">{t(formStatus.message)}</span>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {t("Sending...")}
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  {t("Send Message")}
                  <Send className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}