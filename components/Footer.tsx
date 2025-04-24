"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, ArrowUp, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // Handle newsletter signup form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY, // Add your Web3Forms access key
          email,
          honeypot: "", 
          subject: "Newsletter Subscription",
          from_name: "Thuvarakan Website",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to subscribe");
      }

      setMessage("Thank you for subscribing! We will continue with newsletters.");
      setEmail("");
    } catch (error: any) {
      setMessage(error.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-muted/50 to-background dark:from-muted-foreground dark:to-black py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Branding Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-bold text-foreground dark:text-white mb-4">
              Thuvarakan
            </h3>
            <p className="text-muted-foreground dark:text-gray-300 text-center md:text-left">
              Building innovative solutions with passion and creativity.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center">
            <h4 className="text-lg font-semibold text-foreground dark:text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-center">
              {[
                { name: "About", href: "#about" },
                { name: "Projects", href: "#projects" },
                { name: "Blog", href: "#blog" },
                { name: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="flex flex-col items-center">
            <h4 className="text-lg font-semibold text-foreground dark:text-white mb-4">
              Newsletter Signup
            </h4>
            <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-3">
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  name="honeypot"
                  className="hidden"
                  value=""
                  onChange={() => {}}
                  aria-hidden="true"
                />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-2 rounded-l-md border border-border focus:outline-none focus:ring-2 focus:ring-primary dark:bg-muted dark:text-white"
                  disabled={isSubmitting}
                  aria-label="Email address for newsletter"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-r-md hover:bg-primary/90 hover:scale-105 transition-all duration-300"
                >
                  {isSubmitting ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
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
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                  <span className="sr-only">Subscribe to newsletter</span>
                </Button>
              </div>
              {message && (
                <p
                  className={`text-sm text-center animate-fade-in ${
                    message.includes("error") ||
                    message.includes("valid")
                      ? "text-destructive"
                      : "text-primary"
                  }`}
                >
                  {message}
                </p>
              )}
              <p className="text-xs text-muted-foreground dark:text-gray-400 text-center">
                By subscribing, you agree to our{" "}
                <Link href="/privacy" className="underline hover:text-primary">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="text-lg font-semibold text-foreground dark:text-white mb-4">
              Connect With Me
            </h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Thuvarakan-97"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="text-muted-foreground dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground transition-colors duration-300"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/thuvarakan-ponraj-3163bb1b2/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="text-muted-foreground dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground transition-colors duration-300"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="https://x.com/thuvarakan1997"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter Profile"
                className="text-muted-foreground dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground transition-colors duration-300"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="mailto:p.thuvarakan1997@gmail.com"
                aria-label="Email Me"
                className="text-muted-foreground dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground transition-colors duration-300"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-border/50" />

        {/* Back-to-Top Button and Copyright Section */}
        <div className="flex flex-col items-center space-y-4">
          {/* Back-to-Top Button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center space-x-2 text-muted-foreground dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-3 py-1 group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5 group-hover:-translate-y-1 transition-transform duration-300" />
            <span>Back to Top</span>
          </button>

          {/* Copyright Section */}
          <div className="text-center text-muted-foreground dark:text-gray-300">
            <p>© {new Date().getFullYear()} Thuvarakan. All rights reserved.</p>
          </div>
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