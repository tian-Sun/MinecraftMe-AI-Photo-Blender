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
    title: 'Advanced AI Photo Converter',
    description: 'Transform photos into authentic Minecraft style art using our cutting-edge AI photo converter technology.',
  },
  {
    icon: ImageIcon,
    title: 'High-Quality Pixel Art Output',
    description: 'Our pixel art generator creates crisp, high-resolution Minecraft style images perfect for sharing and printing.',
  },
  {
    icon: Palette,
    title: 'Custom Minecraft Style Backgrounds',
    description: 'Upload any background for personalized Minecraft style generator results that match your creative vision.',
  },
  {
    icon: BarChart3,
    title: 'Multiple Pixel Art Styles',
    description: 'Choose from various Minecraft-inspired pixel art styles with our versatile AI photo converter.',
  },
  {
    icon: MessageSquare,
    title: 'Instant Minecraft Style Results',
    description: 'Our fast Minecraft style generator delivers lightning-quick pixel art transformations in seconds.',
  },
  {
    icon: Shield,
    title: 'Free Pixel Art Generator',
    description: 'Enjoy unlimited access to our AI photo converter—completely free, no registration required!',
  },
];

export default function KeyFeatures() {
  return (
    <section id="feature" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Minecraft Style Generator Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the power of our AI photo converter and pixel art generator. Create stunning Minecraft style art with advanced features designed for creators, gamers, and digital artists.
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
