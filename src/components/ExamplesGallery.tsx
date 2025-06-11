'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Copy } from 'lucide-react';

const examples = [
  {
    id: 1,
    image: '/gallery/6.png',
    description: 'Ghibli Art, a vibrant orange van is parked on a rocky hillside. The van is adorned with a white roof, adorned with an orange patch, adding a pop of color to the scene.',
  },
  {
    id: 2,
    image: '/gallery/4.png',
    description: 'Ghibli Art, a cartoon-like scene features a young man with short brown hair, dressed in a white t-shirt, brown pants, and brown boots, standing on a cliff overlooking a valley.',
  },
  {
    id: 3,
    image: '/gallery/3.png',
    description: 'Ghibli Art, a young boy is riding a bicycle on a wet, rainy day. The boy is dressed in a bright orange shirt, gray pants, and a red backpack.',
  },
  {
    id: 4,
    image: '/gallery/2.png',
    description: 'Ghibli Art, Captured at eye-level on a vibrant day, a man in a blue shirt, and a straw hat is standing in a field of wheat.',
  },
  {
    id: 5,
    image: '/gallery/5.png',
    description: 'Ghibli Art: A bustling village square on a sunny afternoon. A boy in a red scarf and green jacket rides a vintage bicycle through the cobblestone streets.',
  },
  {
    id: 6,
    image: '/gallery/1.png',
    description: 'Ghibli Art: A young girl with short black hair and a yellow raincoat stands under a red umbrella in the middle of a cobblestone street.',
  },
  {
    id: 7,
    image: '/gallery/8.png',
    description: 'Ghibli Art: A narrow mountain path shrouded in rain and mist. A traveler in a wide-brimmed straw hat and a long green cloak leans on a wooden staff.',
  },
  {
    id: 8,
    image: '/gallery/9.png',
    description: 'Ghibli Art: A vibrant spring meadow at dawn. A young woman in a lavender dress and straw hat is painting on an easel under a large cherry blossom tree.',
  },
  {
    id: 9,
    image: '/gallery/10.png',
    description: 'Ghibli Art: A young boy with tousled black hair sits on a grassy hill under a dark, star-filled sky. He wears a light blue sweater and brown pants.',
  },
];

export default function ExamplesGallery() {
  const copyPrompt = (description: string) => {
    navigator.clipboard.writeText(description);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Minecraft Pixel Art Gallery</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {examples.map((example) => (
            <Card key={example.id} className="overflow-hidden shadow-card hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-square relative">
                <Image
                  src={example.image}
                  alt={`Minecraft pixel art example ${example.id}`}
                  fill
                  className="object-cover"
                />
                {/* <Badge
                  className="absolute top-3 right-3 bg-white/90 text-foreground hover:bg-white cursor-pointer"
                  onClick={() => copyPrompt(example.description)}
                >
                  <Copy className="h-3 w-3" />
                </Badge> */}
              </div>
              {/* <CardContent className="p-4">
                <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                  {example.description}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-purple-600 border-purple-200 hover:bg-purple-50"
                  onClick={() => copyPrompt(example.description)}
                >
                  Copy Prompt
                </Button>
              </CardContent> */}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
