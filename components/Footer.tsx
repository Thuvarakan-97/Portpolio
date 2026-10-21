"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, ArrowUp, Send, CheckCircle2, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language";

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Handle newsletter signup form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "14be2c24-8db6-465b-a13e-689b6500e672", // Your Web3Forms access key
          email,
          honeypot: "", 
          subject: "Newsletter Subscription",
          from_name: "Thuvarakan Portfolio",
          message: `New newsletter subscription from: ${email}`,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to subscribe");
      }

      setMessage({ 
        type: "success", 
        text: "🎉 Thank you for subscribing! Check your inbox for updates." 
      });
      setEmail("");
    } catch (error: any) {
      setMessage({ 
        type: "error", 
        text: error.message || "An error occurred. Please try again." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-muted/30 via-background to-muted/50 py-16 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>

      <div className="container px-4 md:px-6 relative z-10">
        {/* Newsletter Section - Featured at Top */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative group">
            {/* Gradient Border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            
            <div className="relative bg-card rounded-2xl p-8 md:p-10 border-2 border-primary/20">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 mb-3">
                  <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                  <h3 className="text-2xl md:text-3xl font-bold">
                    <span className="gradient-text">{t("Stay Updated!")}</span>
                  </h3>
                  <Sparkles className="w-6 h-6 text-accent animate-pulse" />
                </div>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t("Subscribe to my newsletter for the latest updates on web development, tutorials, and tech insights.")}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                {/* Honeypot field */}
                <input
                  type="text"
                  name="honeypot"
                  className="hidden"
                  value=""
                  onChange={() => {}}
                  aria-hidden="true"
                  tabIndex={-1}
                />

                {/* Email Input */}
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground group-focus-within/input:text-primary transition-colors" />
                  </div>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (message) setMessage(null);
                    }}
                    required
                    disabled={isSubmitting}
                    className="pl-12 pr-4 py-6 text-center text-base border-2 border-border rounded-xl bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 disabled:opacity-50"
                    aria-label={t("Email address for newsletter")}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      {t("Subscribing...")}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      {t("Subscribe to Newsletter")}
                      <Send className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>

                {/* Status Message */}
                {message && (
                  <div
                    className={`flex items-center justify-center gap-3 p-4 rounded-xl text-center animate-fade-in ${
                      message.type === "success"
                        ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
                        : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
                    }`}
                  >
                    {message.type === "success" && (
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    )}
                    <span className="text-sm font-medium">{t(message.text)}</span>
                  </div>
                )}

                {/* Privacy Notice */}
                <p className="text-xs text-center text-muted-foreground">
                  {t("By subscribing, you agree to our")}{" "}
                  <Link href="/privacy" className="underline hover:text-primary transition-colors">
                    {t("Privacy Policy")}
                  </Link>
                  . {t("Unsubscribe anytime.")}
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 text-center">
          {/* Branding Section */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold gradient-text">
                Thuvarakan
              </h3>
            </div>
            <p className="text-muted-foreground text-center leading-relaxed">
              {t("Building innovative solutions with passion and creativity. Let's create something amazing together.")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center">
            <h4 className="text-lg font-semibold mb-4 gradient-text">
              {t("Quick Links")}
            </h4>
            <ul className="space-y-2 text-center">
              {[
                { name: "About", href: "#about" },
                { name: "Projects", href: "#projects" },
                { name: "Experience", href: "#experience" },
                { name: "Blog", href: "#blog" },
                { name: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 inline-block hover:translate-x-1 transform"
                  >
                    {t(link.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="flex flex-col items-center">
            <h4 className="text-lg font-semibold mb-4 gradient-text">
              {t("Resources")}
            </h4>
            <ul className="space-y-2 text-center">
              {[
                { name: "Start a Project", href: "/project-request" },
                { name: "Download CV", href: "/thuvarakan.pdf" },
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Testimonials", href: "#testimonials" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.href.startsWith("http") || link.href.endsWith(".pdf") ? "_blank" : undefined}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 inline-block hover:translate-x-1 transform"
                  >
                    {t(link.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-center">
            <h4 className="text-lg font-semibold mb-4 gradient-text">
              {t("Connect With Me")}
            </h4>
            <div className="flex gap-4">
              {[
                { icon: Github, href: "https://github.com/Thuvarakan-97", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/thuvarakan-ponraj-3163bb1b2/", label: "LinkedIn" },
                { icon: Twitter, href: "https://x.com/thuvarakan1997", label: "Twitter" },
                { icon: Mail, href: "mailto:p.thuvarakan1997@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="group relative w-12 h-12 flex items-center justify-center rounded-full bg-muted border border-border hover:border-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors relative z-10" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          {/* Copyright */}
          <div className="text-center text-muted-foreground text-sm">
            <p>© {new Date().getFullYear()} Thuvarakan. {t("All rights reserved.")}</p>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:border-primary bg-background hover:bg-primary/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={t("Scroll to top")}
          >
            <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
              {t("Back to Top")}
            </span>
            <ArrowUp className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:-translate-y-1 transition-all" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;






























// "use client";

// import React, { useState, FormEvent } from "react";
// import Link from "next/link";
// import { Github, Linkedin, Twitter, Mail, ArrowUp, Send } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import ReCAPTCHA from "react-google-recaptcha";

// const Footer: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [message, setMessage] = useState("");
//   const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

//   // Handle newsletter signup form submission
//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     // Client-side validation
//     if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       setMessage("Please enter a valid email address.");
//       return;
//     }

//     if (!recaptchaToken) {
//       setMessage("Please complete the CAPTCHA.");
//       return;
//     }

//     setIsSubmitting(true);
//     setMessage("");

//     try {
//       const response = await fetch("https://api.web3forms.com/submit", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify({
//           access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY, // Add your Web3Forms access key
//           email,
//           honeypot: "", 
//           "g-recaptcha-response": recaptchaToken, // ReCAPTCHA token
//           subject: "Newsletter Subscription",
//           from_name: "Thuvarakan Website",
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok || !data.success) {
//         throw new Error(data.message || "Failed to subscribe");
//       }

//       setMessage("Thank you for subscribing! We will continue with newsletters.");
//       setEmail("");
//       setRecaptchaToken(null);
//     } catch (error: any) {
//       setMessage(error.message || "An error occurred. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <footer className="bg-gradient-to-b from-muted/50 to-background dark:from-muted-foreground dark:to-black py-12">
//       <div className="container px-4 md:px-6">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           {/* Branding Section */}
//           <div className="flex flex-col items-center md:items-start">
//             <h3 className="text-2xl font-bold text-foreground dark:text-white mb-4">
//               Thuvarakan
//             </h3>
//             <p className="text-muted-foreground dark:text-gray-300 text-center md:text-left">
//               Building innovative solutions with passion and creativity.
//             </p>
//           </div>

//           {/* Navigation Links */}
//           <div className="flex flex-col items-center">
//             <h4 className="text-lg font-semibold text-foreground dark:text-white mb-4">
//               Quick Links
//             </h4>
//             <ul className="space-y-2 text-center">
//               {[
//                 { name: "About", href: "#about" },
//                 { name: "Projects", href: "#projects" },
//                 { name: "Blog", href: "#blog" },
//                 { name: "Contact", href: "#contact" },
//               ].map((link) => (
//                 <li key={link.href}>
//                   <Link
//                     href={link.href}
//                     className="text-muted-foreground dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground transition-colors duration-300"
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Newsletter Signup */}
//           <div className="flex flex-col items-center">
//             <h4 className="text-lg font-semibold text-foreground dark:text-white mb-4">
//               Newsletter Signup
//             </h4>
//             <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-3">
//               <div className="flex items-center space-x-2">
//                 <Input
//                   type="text"
//                   name="honeypot"
//                   className="hidden"
//                   value=""
//                   onChange={() => {}}
//                   aria-hidden="true"
//                 />
//                 <Input
//                   type="email"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="flex-1 px-4 py-2 rounded-l-md border border-border focus:outline-none focus:ring-2 focus:ring-primary dark:bg-muted dark:text-white"
//                   disabled={isSubmitting}
//                   aria-label="Email address for newsletter"
//                 />
//                 <Button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="px-4 py-2 bg-primary text-primary-foreground rounded-r-md hover:bg-primary/90 hover:scale-105 transition-all duration-300"
//                 >
//                   {isSubmitting ? (
//                     <svg
//                       className="animate-spin h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       />
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8v8H4z"
//                       />
//                     </svg>
//                   ) : (
//                     <Send className="h-5 w-5" />
//                   )}
//                   <span className="sr-only">Subscribe to newsletter</span>
//                 </Button>
//               </div>
//               <div className="flex justify-center">
//                 <ReCAPTCHA
//                   sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
//                   onChange={(token) => setRecaptchaToken(token)}
//                 />
//               </div>
//               {message && (
//                 <p
//                   className={`text-sm text-center animate-fade-in ${
//                     message.includes("error") ||
//                     message.includes("valid") ||
//                     message.includes("CAPTCHA")
//                       ? "text-destructive"
//                       : "text-primary"
//                   }`}
//                 >
//                   {message}
//                 </p>
//               )}
//               <p className="text-xs text-muted-foreground dark:text-gray-400 text-center">
//                 By subscribing, you agree to our{" "}
//                 <Link href="/privacy" className="underline hover:text-primary">
//                   Privacy Policy
//                 </Link>
//                 .
//               </p>
//             </form>
//           </div>

//           {/* Social Media Links */}
//           <div className="flex flex-col items-center md:items-end">
//             <h4 className="text-lg font-semibold text-foreground dark:text-white mb-4">
//               Connect With Me
//             </h4>
//             <div className="flex space-x-4">
//               <a
//                 href="https://github.com/Thuvarakan-97"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="GitHub Profile"
//                 className="text-muted-foreground dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground transition-colors duration-300"
//               >
//                 <Github className="h-6 w-6" />
//               </a>
//               <a
//                 href="https://www.linkedin.com/in/thuvarakan-ponraj-3163bb1b2/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="LinkedIn Profile"
//                 className="text-muted-foreground dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground transition-colors duration-300"
//               >
//                 <Linkedin className="h-6 w-6" />
//               </a>
//               <a
//                 href="https://x.com/thuvarakan1997"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Twitter Profile"
//                 className="text-muted-foreground dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground transition-colors duration-300"
//               >
//                 <Twitter className="h-6 w-6" />
//               </a>
//               <a
//                 href="mailto:p.thuvarakan1997@gmail.com"
//                 aria-label="Email Me"
//                 className="text-muted-foreground dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground transition-colors duration-300"
//               >
//                 <Mail className="h-6 w-6" />
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="my-8 border-t border-border/50" />

//         {/* Back-to-Top Button and Copyright Section */}
//         <div className="flex flex-col items-center space-y-4">
//           {/* Back-to-Top Button */}
//           <button
//             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//             className="flex items-center space-x-2 text-muted-foreground dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-3 py-1 group"
//             aria-label="Scroll to top"
//           >
//             <ArrowUp className="h-5 w-5 group-hover:-translate-y-1 transition-transform duration-300" />
//             <span>Back to Top</span>
//           </button>

//           {/* Copyright Section */}
//           <div className="text-center text-muted-foreground dark:text-gray-300">
//             <p>© {new Date().getFullYear()} Thuvarakan. All rights reserved.</p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;