// components/Testimonials.tsx

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { MessageSquare } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16">
      <div className="container px-4 md:px-6">
      <h2 className="text-4xl font-bold text-center mb-12 relative text-foreground dark:text-white">
          <MessageSquare className="inline-block mr-2 h-8 w-8" />
          Testimonials
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary to-transparent" />
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="p-6 relative">
              <p className="italic mb-4 text-justify">{testimonial.content}</p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
              <Image
                src={testimonial.image}
                alt={`${testimonial.name}'s avatar`}
                width={40}
                height={40}
                className="absolute bottom-4 right-4 rounded-full border object-cover"
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}