// components/Hero.tsx
import { Button } from "@/components/ui/button";
import TypingText from "@/components/ui/TypingText";
import Link from "next/link";
import { socialLinksData } from "@/data/socialLinks";
import { Download, Mail, Github, Gitlab, Facebook, Twitter, Instagram, Linkedin} from "lucide-react";

const iconMap = {
  Facebook: Facebook,
  Twitter: Twitter,
  Instagram: Instagram,
  Github: Github,
  Gitlab: Gitlab,
  Linkedin: Linkedin,
};

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-primary/10 to-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-primary">
            Ponraj Thuvarakan
          </h1>
          <TypingText
            text="Full Stack Developer specializing in modern web technologies"
            speed={80}
          />
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link href="#contact">
                <Mail className="mr-2 h-4 w-4" />
                Contact Me
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <a href="/thuvarakan.pdf" download>
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </a>
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinksData.map(({ href, label, iconName }) => {
              const Icon = iconMap[iconName as keyof typeof iconMap];
              return (
                <Link key={href} href={href} target="_blank" aria-label={label}>
                  <Icon className="h-6 w-6 hover:text-primary transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}