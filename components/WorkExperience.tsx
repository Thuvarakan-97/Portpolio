// components/WorkExperience.tsx
"use client";

import { Card } from "@/components/ui/card";
import experiences from "@/data/experiences";
import { Briefcase, MapPin, CalendarDays, CheckCircle, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function WorkExperience() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
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

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-muted/30 via-background to-muted/30 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Title */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Work Experience</span>
          </h2>
          <div className="mx-auto w-24 h-1.5 bg-gradient-to-r from-primary via-accent to-primary rounded-full"></div>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            My professional journey and career milestones
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary transform md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: `${index * 200 + 400}ms` }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {/* Timeline Node */}
                <div className={`absolute left-0 md:left-1/2 top-8 w-6 h-6 transform md:-translate-x-1/2 z-10 transition-all duration-300 ${
                  activeIndex === index ? 'scale-150' : 'scale-100'
                }`}>
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-primary to-accent rounded-full border-4 border-background shadow-lg flex items-center justify-center">
                      {activeIndex === index && (
                        <Sparkles className="w-3 h-3 text-primary-foreground" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Content Card */}
                <div className={`ml-12 md:ml-0 md:w-[calc(50%-3rem)] ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                }`}>
                  <Card className={`group p-6 border-2 hover:border-primary/50 transition-all duration-500 card-hover ${
                    activeIndex === index ? 'border-primary/50 shadow-2xl' : ''
                  }`}>
                    {/* Gradient Border Top */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
                    
                    {/* Hover Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>

                    {/* Header */}
                    <div className="relative z-10">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                          {exp.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
                          <Briefcase className="w-4 h-4" />
                          <span className="font-medium">{exp.company}</span>
                        </div>
                      </div>

                      {/* Meta Information */}
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span>{exp.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CalendarDays className="w-4 h-4 text-accent" />
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                          <span className="gradient-text">Tech Stack</span>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, techIndex) => (
                            <span
                              key={tech}
                              className="group/tech px-3 py-1.5 bg-gradient-to-br from-muted to-muted/50 rounded-lg text-xs font-medium border border-border/50 hover:border-primary/50 hover:shadow-md transition-all duration-300 cursor-default"
                              style={{ animationDelay: `${techIndex * 50}ms` }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Key Achievements */}
                      <div>
                        <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                          <span className="gradient-text">Key Achievements</span>
                        </h4>
                        <ul className="space-y-2">
                          {exp.keyAchievements.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-foreground/80 group/achievement"
                            >
                              <CheckCircle className="w-4 h-4 mt-0.5 text-primary flex-shrink-0 group-hover/achievement:scale-110 transition-transform" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Decorative Corner */}
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-accent/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}