// components/Projects.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { useState, useEffect, useRef } from "react";
import { ExternalLink, Calendar, Sparkles } from "lucide-react";

export default function Projects() {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState("all");
  const sectionRef = useRef<HTMLElement>(null);

  // Get unique technologies for filter
  const allTechnologies = Array.from(
    new Set(projects.flatMap((p) => p.technologies))
  );

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter((p) => p.technologies.includes(filter));

  useEffect(() => {
    setIsMounted(true);

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
      id="projects" 
      className="py-20 bg-gradient-to-b from-muted/30 via-background to-muted/30 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="container px-4 md:px-6 relative z-10">
        {/* Section Title */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">My Projects</span>
          </h2>
          <div className="mx-auto w-24 h-1.5 bg-gradient-to-r from-primary via-accent to-primary rounded-full"></div>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and creative endeavors
          </p>
        </div>

        {/* Filter Buttons */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
              filter === "all"
                ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg scale-105"
                : "bg-card border-2 border-border hover:border-primary/50 hover:scale-105"
            }`}
          >
            All Projects
          </button>
          {allTechnologies.slice(0, 5).map((tech) => (
            <button
              key={tech}
              onClick={() => setFilter(tech)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                filter === tech
                  ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg scale-105"
                  : "bg-card border-2 border-border hover:border-primary/50 hover:scale-105"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <Card
              key={project.name}
              className={`group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-500 card-hover ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100 + 400}ms` }}
            >
              {/* Gradient Border Top */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary"></div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              {/* Project Image */}
              <div className="relative w-full h-56 overflow-hidden">
                {isMounted ? (
                  <>
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      onError={(e) => {
                        e.currentTarget.src = "/images/fallback.jpg";
                      }}
                    />
                    {/* Image Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <ExternalLink className="w-12 h-12 text-primary" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full bg-muted animate-pulse" />
                )}
              </div>

              {/* Project Content */}
              <div className="p-6 relative z-10">
                {/* Project Title */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.name}
                </h3>

                {/* Project Period */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{project.period}</span>
                </div>

                {/* Project Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="group/tech px-3 py-1 bg-gradient-to-br from-muted to-muted/50 rounded-full text-xs font-medium border border-border/50 hover:border-primary/50 hover:shadow-md transition-all duration-300 cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full text-xs font-medium border border-primary/30">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* View Project Button */}
                <Button
                  asChild
                  className="w-full group/btn shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <Link href={project.link} target="_blank" rel="noopener noreferrer">
                    <span>View Project</span>
                    <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>

              {/* Decorative Sparkle */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Sparkles className="w-6 h-6 text-accent animate-pulse" />
              </div>
            </Card>
          ))}
        </div>

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No projects found with this filter.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}