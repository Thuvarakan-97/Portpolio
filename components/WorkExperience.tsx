// components/WorkExperience.tsx

import { Card } from "@/components/ui/card";
import experiences from "@/data/experiences";
import { Briefcase, MapPin, CalendarDays, CheckCircle } from "lucide-react";

export default function WorkExperience() {
  return (
    <section className="container mx-auto my-16 px-4">
      <h2 className="text-4xl font-bold text-center mb-12 relative text-foreground dark:text-white">Work Experience
      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary to-transparent" />
      </h2>
      <div className="relative border-l border-muted-foreground/30 space-y-12">
        {experiences.map((exp, index) => (
          <div key={index} className="relative pl-10 group">
            <span className="absolute left-0 top-2 w-4 h-4 bg-primary rounded-full border-2 border-white transition-transform group-hover:scale-110" />
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-xl font-semibold">{exp.title}</h3>
                <div className="flex items-center text-sm text-muted-foreground mt-2 sm:mt-0">
                  <Briefcase className="w-4 h-4 mr-1" />
                  {exp.company}
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {exp.location}
                </div>
                <div className="flex items-center">
                  <CalendarDays className="w-4 h-4 mr-1" />
                  {exp.period}
                </div>
              </div>
              <p className="mt-4 text-base text-foreground/90">{exp.description}</p>
              <div className="mt-4">
                <strong className="text-sm text-primary">Tech Stack:</strong>
                <div className="flex flex-wrap gap-2 mt-1">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="bg-muted text-xs px-2 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                {exp.keyAchievements.map((item, i) => (
                  <li key={i} className="flex items-start text-sm text-foreground/80">
                    <CheckCircle className="w-4 h-4 mt-0.5 mr-2 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}