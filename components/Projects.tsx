// components/Projects.tsx

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { useState, useEffect } from "react";

export default function Projects() {
  const [isMounted, setIsMounted] = useState(false);

  // Ensure images only render on the client side to avoid hydration mismatches
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="projects" className="py-16 bg-gradient-to-b from-muted/50 to-background dark:from-black dark:to-black">
      <div className="container px-4 md:px-6">
        {/* Section Title with Gradient Underline */}
        <h2 className="text-4xl font-bold text-center mb-12 relative text-foreground dark:text-white">
          My Projects
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary to-transparent" />
        </h2>
        {/* Projects Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.name}
              className="p-6 bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 dark:bg-black/90 dark:border-gray-600 dark:shadow-gray-900"
            >
              <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent" />
              {/* Project Image */}
              <div className="relative w-full h-48 mb-4">
                {isMounted ? (
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill // Replaced layout="fill"
                    className="rounded-lg object-cover" // Replaced objectFit="cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" // Added for responsive image optimization
                    onError={(e) => {
                      e.currentTarget.src = "/images/fallback.jpg"; // Fallback image on error
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-muted rounded-lg" /> // Placeholder during SSR
                )}
              </div>
              {/* Project Title */}
              <h3 className="text-xl font-semibold mb-2 text-primary dark:text-primary-foreground">
                {project.name}
              </h3>
              {/* Project Period */}
              <p className="text-sm text-muted-foreground mb-2 dark:text-gray-400">
                {project.period}
              </p>
              {/* Project Description */}
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed dark:text-gray-300 line-clamp-3 text-justify">
                {project.description}
              </p>
              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gradient-to-br from-primary/5 to-background rounded-full text-xs font-medium text-foreground border border-primary/20 hover:bg-primary/10 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 dark:from-black dark:to-black dark:border-gray-600 dark:hover:bg-gray-900"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {/* View Project Button */}
              <Button
                asChild
                className="w-full bg-primary text-white hover:bg-primary/90 hover:-translate-y-1 transition-all duration-300 dark:bg-primary-foreground dark:text-black dark:hover:bg-primary-foreground/90"
              >
                <Link href={project.link} target="_blank">
                  View Project
                </Link>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}