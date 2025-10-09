"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Loader2, 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Calendar, 
  DollarSign,
  FileText,
  CheckCircle2,
  Sparkles,
  Briefcase,
  Clock,
  Target,
  Link as LinkIcon
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function ProjectRequest() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
    website: "",
    additionalInfo: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setIsVisible(true);

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

    return () => observer.disconnect();
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
      case "projectType":
        if (!value) {
          newErrors.projectType = "Please select a project type";
        } else {
          delete newErrors.projectType;
        }
        break;
      case "budget":
        if (!value) {
          newErrors.budget = "Please select a budget range";
        } else {
          delete newErrors.budget;
        }
        break;
      case "timeline":
        if (!value) {
          newErrors.timeline = "Please select a timeline";
        } else {
          delete newErrors.timeline;
        }
        break;
      case "description":
        if (!value.trim()) {
          newErrors.description = "Project description is required";
        } else if (value.trim().length < 20) {
          newErrors.description = "Please provide more details (at least 20 characters)";
        } else {
          delete newErrors.description;
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

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);

    // Validate all required fields
    const requiredFields = ["name", "email", "projectType", "budget", "timeline", "description"];
    requiredFields.forEach((field) => {
      validateField(field, formData[field as keyof typeof formData]);
    });

    if (Object.keys(errors).length > 0) {
      setIsSubmitting(false);
      setFormStatus({ type: "error", message: "Please fix the errors above before submitting." });
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("access_key", "14be2c24-8db6-465b-a13e-689b6500e672");
      formDataToSend.append("subject", "New Project Request");
      formDataToSend.append("from_name", `${formData.name} - Project Request`);
      
      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          formDataToSend.append(key, value);
        }
      });

      // Format the message nicely
      const message = `
NEW PROJECT REQUEST
==================

CLIENT INFORMATION:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone || "Not provided"}
- Company: ${formData.company || "Not provided"}
- Website: ${formData.website || "Not provided"}

PROJECT DETAILS:
- Type: ${formData.projectType}
- Budget: ${formData.budget}
- Timeline: ${formData.timeline}

PROJECT DESCRIPTION:
${formData.description}

ADDITIONAL INFORMATION:
${formData.additionalInfo || "None provided"}

==================
Submitted via Project Request Form
      `;

      formDataToSend.append("message", message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();
      
      if (result.success) {
        setFormStatus({ 
          type: "success", 
          message: "🎉 Thank you! Your project request has been submitted. I'll get back to you within 12-24 hours." 
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          projectType: "",
          budget: "",
          timeline: "",
          description: "",
          website: "",
          additionalInfo: ""
        });
        setErrors({});
        
        // Scroll to success message
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setFormStatus({ type: "error", message: result.message || "Failed to submit request." });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus({ type: "error", message: "An error occurred. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        ref={sectionRef}
        className="relative py-20 bg-gradient-to-b from-primary/10 via-accent/5 to-background overflow-hidden"
      >
        {/* Background Decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-70 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                <span className="gradient-text">Start Your Project</span>
              </h1>
              <Sparkles className="w-8 h-8 text-accent animate-pulse" />
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mt-4">
              Let's bring your ideas to life! Fill out the form below and I'll get back to you within 12-24 hours 
              with a detailed proposal and timeline.
            </p>
          </div>

          {/* Success/Error Message */}
          {formStatus && (
            <div
              className={`max-w-2xl mx-auto mb-8 flex items-center gap-3 p-4 rounded-xl animate-fade-in ${
                formStatus.type === "success"
                  ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
                  : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
              }`}
            >
              {formStatus.type === "success" && <CheckCircle2 className="w-6 h-6 flex-shrink-0" />}
              <span className="font-medium">{formStatus.message}</span>
            </div>
          )}

          {/* Main Form Card */}
          <Card className={`max-w-4xl mx-auto p-8 md:p-10 border-2 hover:border-primary/50 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: '200ms' }}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary"></div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl font-bold gradient-text">Contact Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold mb-2">
                      <User className="w-4 h-4 text-primary" />
                      <span>Full Name *</span>
                    </label>
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`border-2 rounded-xl bg-background/50 focus:ring-2 focus:ring-primary/50 ${
                        errors.name ? 'border-red-500' : 'border-border'
                      }`}
                      placeholder="Enter Your Name"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold mb-2">
                      <Mail className="w-4 h-4 text-primary" />
                      <span>Email Address *</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`border-2 rounded-xl bg-background/50 focus:ring-2 focus:ring-primary/50 ${
                        errors.email ? 'border-red-500' : 'border-border'
                      }`}
                      placeholder="Enter your email"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="flex items-center gap-2 text-sm font-semibold mb-2">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>Phone Number <span className="text-muted-foreground font-normal">(Optional)</span></span>
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border-2 border-border rounded-xl bg-background/50 focus:ring-2 focus:ring-primary/50"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="company" className="flex items-center gap-2 text-sm font-semibold mb-2">
                      <Building2 className="w-4 h-4 text-primary" />
                      <span>Company/Organization <span className="text-muted-foreground font-normal">(Optional)</span></span>
                    </label>
                    <Input
                      id="company"
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="border-2 border-border rounded-xl bg-background/50 focus:ring-2 focus:ring-primary/50"
                      placeholder="Enter Your Company Name"
                    />
                  </div>

                  {/* Website */}
                  <div className="md:col-span-2">
                    <label htmlFor="website" className="flex items-center gap-2 text-sm font-semibold mb-2">
                      <LinkIcon className="w-4 h-4 text-primary" />
                      <span>Website <span className="text-muted-foreground font-normal">(Optional)</span></span>
                    </label>
                    <Input
                      id="website"
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="border-2 border-border rounded-xl bg-background/50 focus:ring-2 focus:ring-primary/50"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

              {/* Project Details Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl font-bold gradient-text">Project Details</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Project Type */}
                  <div>
                    <label htmlFor="projectType" className="flex items-center gap-2 text-sm font-semibold mb-2">
                      <Target className="w-4 h-4 text-primary" />
                      <span>Project Type *</span>
                    </label>
                    <Select value={formData.projectType} onValueChange={(value) => handleSelectChange("projectType", value)}>
                      <SelectTrigger className={`border-2 rounded-xl ${errors.projectType ? 'border-red-500' : 'border-border'}`}>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web-development">Web Development</SelectItem>
                        <SelectItem value="mobile-app">Mobile App</SelectItem>
                        <SelectItem value="full-stack">Full Stack Application</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="portfolio">Portfolio Website</SelectItem>
                        <SelectItem value="landing-page">Landing Page</SelectItem>
                        <SelectItem value="web-app">Web Application</SelectItem>
                        <SelectItem value="api-integration">API Integration</SelectItem>
                        <SelectItem value="maintenance">Website Maintenance</SelectItem>
                        <SelectItem value="consulting">Consulting</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.projectType && <p className="text-red-500 text-xs mt-1">{errors.projectType}</p>}
                  </div>

                   {/* Budget */}
                  <div>
                    <label htmlFor="budget" className="flex items-center gap-2 text-sm font-semibold mb-2">
                      <DollarSign className="w-4 h-4 text-primary" />
                      <span>Budget Range *</span>
                    </label>
                    <Select value={formData.budget} onValueChange={(value) => handleSelectChange("budget", value)}>
                      <SelectTrigger className={`border-2 rounded-xl ${errors.budget ? 'border-red-500' : 'border-border'}`}>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-100">Under $100</SelectItem>
                        <SelectItem value="100-200">$100 - $200</SelectItem>
                        <SelectItem value="200-500">$200 - $500</SelectItem>
                        <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                        <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
                        <SelectItem value="above-2000">Above $2,000</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget}</p>}
                  </div>

                  {/* Timeline */}
                  <div>
                    <label htmlFor="timeline" className="flex items-center gap-2 text-sm font-semibold mb-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>Timeline *</span>
                    </label>
                    <Select value={formData.timeline} onValueChange={(value) => handleSelectChange("timeline", value)}>
                      <SelectTrigger className={`border-2 rounded-xl ${errors.timeline ? 'border-red-500' : 'border-border'}`}>
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">ASAP (1-2 weeks)</SelectItem>
                        <SelectItem value="1-month">1 Month</SelectItem>
                        <SelectItem value="2-3-months">2-3 Months</SelectItem>
                        <SelectItem value="3-6-months">3-6 Months</SelectItem>
                        <SelectItem value="6-plus-months">6+ Months</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.timeline && <p className="text-red-500 text-xs mt-1">{errors.timeline}</p>}
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label htmlFor="description" className="flex items-center gap-2 text-sm font-semibold mb-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <span>Project Description *</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none ${
                      errors.description ? 'border-red-500' : 'border-border'
                    }`}
                    rows={6}
                    placeholder="Please describe your project in detail. Include:
- What problem you're trying to solve
- Key features and functionality needed
- Target audience
- Any specific requirements or preferences
- Examples of similar projects you like"
                  />
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>

                {/* Additional Information */}
                <div>
                  <label htmlFor="additionalInfo" className="flex items-center gap-2 text-sm font-semibold mb-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <span>Additional Information <span className="text-muted-foreground font-normal">(Optional)</span></span>
                  </label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-border rounded-xl bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    rows={4}
                    placeholder="Any other details you'd like to share? (e.g., brand guidelines, preferred technologies, existing systems to integrate with, etc.)"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="flex-1 shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting Request...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Submit Project Request
                      <CheckCircle2 className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    </span>
                  )}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  asChild
                  className="border-2 hover:border-primary"
                >
                  <Link href="/#contact">
                    Or Send Quick Message
                  </Link>
                </Button>
              </div>

              {/* Privacy Notice */}
              <p className="text-xs text-center text-muted-foreground">
                By submitting this form, you agree to our{" "}
                <Link href="/privacy" className="underline hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
                . Your information will be kept confidential and used solely for project communication.
              </p>
            </form>
          </Card>

          {/* Why Choose Me Section */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Card className="p-6 text-center border-2 hover:border-primary/50 transition-all duration-300 card-hover">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Fast Response</h3>
              <p className="text-sm text-muted-foreground">
                I'll review your request and respond within 12-24 hours with initial feedback and next steps.
              </p>
            </Card>

            <Card className="p-6 text-center border-2 hover:border-primary/50 transition-all duration-300 card-hover">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold mb-2">Tailored Solutions</h3>
              <p className="text-sm text-muted-foreground">
                Every project is unique. I'll create a custom proposal that fits your specific needs and goals.
              </p>
            </Card>

            <Card className="p-6 text-center border-2 hover:border-primary/50 transition-all duration-300 card-hover">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Quality Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Committed to delivering high-quality work on time, with regular updates throughout the process.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}

