'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Monitor,
  MessageSquare,
  Palette,
  Image as ImageIcon,
  BarChart3,
  Shield
} from 'lucide-react';

const features = [
  {
    icon: Monitor,
    title: 'AI-Powered Fusion',
    description: 'Automatically blend your photo with any Minecraft-style background using advanced AI.',
  },
  {
    icon: ImageIcon,
    title: 'High-Resolution Output',
    description: 'Generate crisp, high-quality images perfect for sharing and printing.',
  },
  {
    icon: Palette,
    title: 'Custom Backgrounds',
    description: 'Upload any background you like for a truly personalized Minecraft-style creation.',
  },
  {
    icon: BarChart3,
    title: 'Multiple Styles',
    description: 'Choose from various Minecraft-inspired art styles for unique results.',
  },
  {
    icon: MessageSquare,
    title: 'Instant Results',
    description: 'Enjoy lightning-fast, one-click image generation—no waiting, no hassle.',
  },
  {
    icon: Shield,
    title: 'Free & No Registration',
    description: 'Completely free to use, no sign-up required. Start creating in seconds!',
  },
];

export default function KeyFeatures() {
  return (
    <section id="feature" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Key Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Instantly create high-quality, AI-blended Minecraft-style images. Perfect for fans, creators, and anyone who loves unique digital art.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={feature.title} className="border-0 shadow-card hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
