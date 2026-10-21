"use client";

import { Card } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { education } from "@/data/education";
import { useLanguage } from "@/lib/language";

export default function Education() {
  const { t } = useLanguage();
  return (
    <section id="education" className="py-16 bg-muted/50">
      <div className="container px-4 md:px-6">
      <h2 className="text-4xl font-bold text-center mb-12 relative text-foreground dark:text-white">
          <GraduationCap className="inline-block mr-2 h-8 w-8" />
          {t("Education")}
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary to-transparent" />
        </h2>
        <div className="grid gap-6">
          {education.map((edu) => (
            <Card key={edu.degree} className="p-6 text-center">
              <h3 className="text-xl font-semibold">{t(edu.degree)}</h3>
              <p className="text-muted-foreground">{t(edu.institution)}</p>
              <p className="text-muted-foreground">{t(edu.place)}</p>
              <p className="text-sm text-muted-foreground">{edu.year}</p>
              <p className="mt-2">{t(edu.description)}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}