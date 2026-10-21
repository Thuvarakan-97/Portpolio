// components/Hero.tsx
"use client";

import { Button } from "@/components/ui/button";
import TypingText from "@/components/ui/TypingText";
import Link from "next/link";
import { socialLinksData } from "@/data/socialLinks";
import { Download, Mail, Github, Gitlab, Facebook, Twitter, Instagram, Linkedin, Sparkles, ArrowDown} from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/language";

const iconMap = {
  Facebook: Facebook,
  Twitter: Twitter,
  Instagram: Instagram,
  Github: Github,
  Gitlab: Gitlab,
  Linkedin: Linkedin,
};

export default function Hero() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background animate-gradient">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          {/* Profile Image with Glow Effect */}
          <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-primary/20 ring-offset-4 ring-offset-background shadow-2xl">
              <Image
                src="/profile.jpeg"
                alt="Ponraj Thuvarakan"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>

          {/* Name with Gradient */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="gradient-text">Ponraj Thuvarakan</span>
            </h1>
            <div className="mt-2 h-1 w-24 mx-auto bg-gradient-to-r from-primary to-accent rounded-full"></div>
          </div>

          {/* Typing Text */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <TypingText
              text={t("Full Stack Developer specializing in modern web technologies")}
              speed={80}
            />
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-wrap justify-center gap-4 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-all duration-300 group bg-gradient-to-r from-primary to-accent">
              <Link href="/project-request">
                <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-180 transition-transform" />
                {t("Start a Project")}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="shadow-lg hover:shadow-xl transition-all duration-300 group border-2">
              <Link href="#contact">
                <Mail className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                {t("Contact Me")}
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="shadow-lg hover:shadow-xl transition-all duration-300 group border-2">
              <a href="/thuvarakan.pdf" download>
                <Download className="mr-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
                {t("Download CV")}
              </a>
            </Button>
          </div>

          {/* Social Links */}
          <div className={`flex flex-wrap justify-center gap-6 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {socialLinksData.map(({ href, label, iconName }, index) => {
              const Icon = iconMap[iconName as keyof typeof iconMap];
              return (
                <Link 
                  key={href} 
                  href={href} 
                  target="_blank" 
                  aria-label={label}
                  className="group relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:bg-primary/40 transition-all duration-300 scale-0 group-hover:scale-100"></div>
                  <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-card border border-border hover:border-primary transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 shadow-lg">
                    <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Scroll Indicator */}
          <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <Link href="#about" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
              <span className="text-sm font-medium">{t("Scroll to explore")}</span>
              <ArrowDown className="h-5 w-5 animate-bounce" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}