'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Alex Chen',
    role: 'Digital Artist',
    avatar: 'https://ext.same-assets.com/3798290750/2048697749.png',
    rating: 5,
    content: "This app makes it so easy to blend my photos with Minecraft backgrounds. The AI fusion is seamless and the results look amazing!",
  },
  {
    name: 'Sarah Miller',
    role: 'Content Creator',
    avatar: 'https://ext.same-assets.com/3798290750/64329983.png',
    rating: 5,
    content: "I love how quickly I can turn any selfie into a Minecraft-style portrait. No registration needed and it's totally free right now!",
  },
  {
    name: 'James Liu',
    role: 'Game Developer',
    avatar: 'https://ext.same-assets.com/3798290750/35535824.png',
    rating: 5,
    content: "Perfect for fan art and social sharing. The quality of the AI-generated images is top-notch. Highly recommended for Minecraft fans!",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-6">Testimonial</Badge>
          <h2 className="text-4xl font-bold mb-4">What Users Say About Minecraft Style Online</h2>
          <p className="text-lg text-muted-foreground">
            Hear from artists and creators using Minecraft Style Online in their work.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={testimonial.name} className="shadow-card hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={`${testimonial.name}-star-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-muted-foreground italic">
                  "{testimonial.content}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
