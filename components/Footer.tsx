
"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, ArrowUp, Send } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recaptchaSiteKey) {
      setError("reCAPTCHA is not configured. Please contact the site administrator.");
      return;
    }
    if (!recaptchaValue) {
      setError("Please complete the reCAPTCHA verification.");
      return;
    }

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, recaptchaValue }),
      });

      if (response.ok) {
        setSuccess(true);
        setEmail("");
        setRecaptchaValue(null);
      } else {
        const data = await response.json();
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <footer className="bg-muted dark:bg-muted/50 py-8">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold text-foreground dark:text-white mb-4">
              Subscribe to My Newsletter
            </h3>
            <p className="text-muted-foreground dark:text-gray-300 mb-4">
              Stay updated with my latest projects and blog posts.
            </p>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-2 border rounded-md dark:bg-muted dark:text-white dark:border-gray-600"
                required
              />
              {/* Honeypot Field */}
              <input
                type="text"
                name="honeypot"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />
              {/* reCAPTCHA */}
              {recaptchaSiteKey ? (
                <ReCAPTCHA
                  sitekey={recaptchaSiteKey}
                  onChange={(value) => setRecaptchaValue(value)}
                />
              ) : (
                <p className="text-red-600 dark:text-red-400">
                  reCAPTCHA is not configured. Please contact the site administrator.
                </p>
              )}
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-all duration-300"
              >
                Subscribe
              </button>
              {success && (
                <p className="text-green-600 dark:text-green-400 mt-2">
                  Thank you for subscribing!
                </p>
              )}
              {error && (
                <p className="text-red-600 dark:text-red-400 mt-2">{error}</p>
              )}
            </form>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-muted-foreground dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/#projects"
                  className="text-muted-foreground dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/#blog"
                  className="text-muted-foreground dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-muted-foreground dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground dark:text-white mb-4">
              Follow Me
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/thuvarakan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com/in/thuvarakan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://twitter.com/thuvarakan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              >
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center text-muted-foreground dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Thuvarakan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}