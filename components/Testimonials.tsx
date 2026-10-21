"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { MessageSquare } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { useLanguage } from "@/lib/language";

export default function Testimonials() {
  const { t } = useLanguage();
  return (
    <section id="testimonials" className="py-16">
      <div className="container px-4 md:px-6">
      <h2 className="text-4xl font-bold text-center mb-12 relative text-foreground dark:text-white">
          <MessageSquare className="inline-block mr-2 h-8 w-8" />
          {t("Testimonials")}
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary to-transparent" />
        </h2>
        <div className="mx-auto grid max-w-6xl grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="relative w-full max-w-md p-6 pb-20 text-center">
              <p className="italic mb-4">{t(testimonial.content)}</p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{t(testimonial.role)}</p>
                <p className="text-sm italic text-primary">{t(testimonial.company)}</p>
              </div>
              <Image
                src={testimonial.image}
                alt={`${testimonial.name} ${t("avatar")}`}
                width={40}
                height={40}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border object-cover"
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}