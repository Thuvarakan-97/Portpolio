// app/page.tsx

"use client";

import Footer from "@/components/Footer";
import BlogAndPublications from "@/components/BlogAndPublications";
import WorkExperience from "@/components/WorkExperience";
import Testimonials from "@/components/Testimonials";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import About from "@/components/About";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section id="hero">
        <Hero />
      </section>

      {/* About Section */}
      <section id="about">
        <About />
      </section>

      
      {/* Projects Section */}
      <section id="projects">
        <Projects />
      </section>

      {/* Work Experience Section */}
      <section id="experience">
        <WorkExperience />
      </section>

      {/* Education */}
      <section id="education">
        <Education />
      </section>

      {/* Blogs and Publications */}
      <section id="blog">
        <BlogAndPublications />
      </section>

      {/* Testimonials */}
      <section id="testimonials">
        <Testimonials />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <Contact />
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}