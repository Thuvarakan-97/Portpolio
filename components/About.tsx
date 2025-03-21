// components/About.tsx

import Image from "next/image";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { technologyCategories } from "@/data/technologies";

export default function About() {
  const [openCategory, setOpenCategory] = useState<string | null>("languages");

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <section id="about" className="py-16 bg-gradient-to-b from-muted/50 to-background dark:from-black dark:to-black">
      <div className="container px-4 md:px-6">
        {/* Section Title with Gradient Underline */}
        <h2 className="text-4xl font-bold text-center mb-12 relative text-foreground dark:text-white">
          About Me
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary to-transparent" />
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Professional Summary Card */}
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-background border border-primary/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden dark:bg-gradient-to-br dark:from-black dark:to-black dark:border-gray-600">
            <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent" />
            {/* Profile Image */}
            <div className="flex justify-center mb-6">
              <Image
                src="/profile.jpeg"
                alt="Ponraj Thuvarakan"
                width={120}
                height={120}
                className="rounded-full border-4 border-primary/20 object-cover dark:border-gray-500"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-center text-primary dark:text-primary-foreground">
              Professional Summary
            </h3>
            <p className="text-muted-foreground leading-relaxed text-justify dark:text-gray-300">
              I am a skilled Full Stack Developer with extensive experience in designing and deploying scalable web applications using advanced technologies such as Next.js, React, Laravel, and Node.js. My proficiency in both front-end and back-end development allows me to deliver seamless user experiences and efficient server-side solutions. With a Bachelor’s degree in Information Technology and a strong commitment to excellence, I consistently address complex technical challenges while prioritizing performance and user satisfaction. I also contribute to the tech community by sharing expertise through my Medium blog, covering topics like Next.js 15 integration with Laravel 12, React vs. Next.js comparisons, and mobile development workflows with Expo CLI and React Native CLI. I am dedicated to driving innovation and delivering impactful solutions in software development.
            </p>
          </Card>

          {/* Skills & Technologies Card with Black Background in Dark Mode */}
          <Card className="p-8 bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 dark:bg-black/90 dark:border-gray-600 dark:shadow-gray-900">
            <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent" />
            <h3 className="text-2xl font-semibold mb-6 text-center text-primary dark:text-primary-foreground">
              Skills & Technologies
            </h3>
            <div className="space-y-4">
              {Object.entries(technologyCategories).map(([category, items]) => (
                <div
                  key={category}
                  className="border border-gray-200/50 rounded-lg overflow-hidden dark:border-gray-600"
                >
                  {/* Category Header with "Shake" Effect */}
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full flex justify-between items-center px-4 py-3 bg-gradient-to-r from-primary/10 to-transparent hover:from-primary/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 dark:bg-gradient-to-r dark:from-black dark:to-black dark:hover:from-gray-900"
                  >
                    <span className="text-lg font-medium text-foreground dark:text-gray-200">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                    {openCategory === category ? (
                      <ChevronUp className="w-5 h-5 text-primary dark:text-primary-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-primary dark:text-primary-foreground" />
                    )}
                  </button>
                  {/* Category Content */}
                  {openCategory === category && (
                    <div className="p-4 bg-background/50 dark:bg-black/50">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {items.map((item) => (
                          <div
                            key={item}
                            className="flex items-center justify-center px-3 py-2 bg-gradient-to-br from-primary/5 to-background rounded-lg border border-primary/20 hover:bg-primary/10 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 dark:from-black dark:to-black dark:border-gray-600 dark:hover:bg-gray-900"
                          >
                            <span className="text-sm font-medium text-foreground dark:text-gray-200">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}