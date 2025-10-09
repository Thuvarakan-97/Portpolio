// components/About.tsx
"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Code2, Palette, Database, Zap } from "lucide-react";
import { technologyCategories } from "@/data/technologies";

const categoryIcons: Record<string, any> = {
  languages: Code2,
  frontend: Palette,
  backend: Database,
  tools: Zap,
};

export default function About() {
  const [openCategory, setOpenCategory] = useState<string | null>("languages");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
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

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-20 bg-gradient-to-b from-muted/30 via-background to-muted/30 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>

      <div className="container px-4 md:px-6 relative z-10">
        {/* Section Title with Gradient Underline */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">About Me</span>
          </h2>
          <div className="mx-auto w-24 h-1.5 bg-gradient-to-r from-primary via-accent to-primary rounded-full"></div>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Passionate about creating exceptional digital experiences
          </p>
        </div>
        <div className={`grid gap-8 lg:grid-cols-2 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Professional Summary Card */}
          <Card className="group relative p-8 bg-gradient-to-br from-card via-card to-card/50 border-2 hover:border-primary/50 transition-all duration-500 overflow-hidden card-hover">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary"></div>
            
            {/* Profile Image */}
            <div className="relative z-10 flex justify-center mb-6">
              <div className="relative group/image">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-50 group-hover/image:opacity-100 transition-opacity"></div>
                <Image
                  src="/profile.jpeg"
                  alt="Ponraj Thuvarakan"
                  width={140}
                  height={140}
                  className="relative rounded-full border-4 border-primary/30 object-cover shadow-2xl ring-4 ring-primary/10 group-hover/image:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            
            <h3 className="relative z-10 text-2xl font-bold mb-4 text-center">
              <span className="gradient-text">Professional Summary</span>
            </h3>
            
            <p className="relative z-10 text-muted-foreground leading-relaxed text-justify">
              I am a skilled Full Stack Developer with extensive experience in designing and deploying scalable web applications using advanced technologies such as Next.js, React, Laravel, and Node.js. My proficiency in both front-end and back-end development allows me to deliver seamless user experiences and efficient server-side solutions. With a Bachelor's degree in Information Technology and a strong commitment to excellence, I consistently address complex technical challenges while prioritizing performance and user satisfaction. I also contribute to the tech community by sharing expertise through my Medium blog, covering topics like Next.js 15 integration with Laravel 12, React vs. Next.js comparisons, and mobile development workflows with Expo CLI and React Native CLI. I am dedicated to driving innovation and delivering impactful solutions in software development.
            </p>

            {/* Decorative Corner */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-accent/10 to-transparent rounded-tl-full"></div>
          </Card>

          {/* Skills & Technologies Card */}
          <Card className="group relative p-8 bg-gradient-to-br from-card via-card to-card/50 border-2 hover:border-primary/50 transition-all duration-500 overflow-hidden card-hover">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-primary to-accent"></div>
            
            <h3 className="relative z-10 text-2xl font-bold mb-6 text-center">
              <span className="gradient-text">Skills & Technologies</span>
            </h3>
            
            <div className="relative z-10 space-y-3">
              {Object.entries(technologyCategories).map(([category, items], index) => {
                const Icon = categoryIcons[category] || Code2;
                return (
                  <div
                    key={category}
                    className="border-2 border-border/50 rounded-xl overflow-hidden backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Category Header */}
                    <button
                      onClick={() => toggleCategory(category)}
                      className="w-full flex justify-between items-center px-5 py-3 bg-gradient-to-r from-muted/50 to-transparent hover:from-primary/10 transition-all duration-300 group/btn"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 group-hover/btn:bg-primary/20 transition-colors">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-base font-semibold">
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </span>
                      </div>
                      <div className="p-1.5 rounded-full bg-primary/10 group-hover/btn:bg-primary/20 transition-colors">
                        {openCategory === category ? (
                          <ChevronUp className="w-4 h-4 text-primary" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-primary" />
                        )}
                      </div>
                    </button>
                    
                    {/* Category Content */}
                    {openCategory === category && (
                      <div className="p-4 bg-muted/20 animate-fade-in">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {items.map((item, itemIndex) => (
                            <div
                              key={item}
                              className="group/skill relative px-3 py-2 bg-gradient-to-br from-background to-muted/30 rounded-lg border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-default"
                              style={{ animationDelay: `${itemIndex * 50}ms` }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg opacity-0 group-hover/skill:opacity-100 transition-opacity"></div>
                              <span className="relative text-sm font-medium text-center block">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Decorative Corner */}
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-primary/10 to-transparent rounded-tr-full"></div>
          </Card>
        </div>
      </div>
    </section>
  );
}