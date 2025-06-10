'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Monitor, MessageSquare, Code } from 'lucide-react';

export default function WhatIs() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cloud Image */}
        <div className="text-center mb-16">
          <p className="text-muted-foreground mb-8">MinecraftStyle: The Ultimate AI Photo Converter Powered by Advanced Technology</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
         

          {/* Left Image */}
          <div className="relative">
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <Image
                  src="/demo/result2.png"
                  alt="Minecraft style characters"
                  width={500}
                  height={400}
                  className="w-full h-auto"
                />
              </CardContent>
            </Card>
          </div>

 {/* Right Content */}
 <div className="space-y-8">
            <h2 className="text-4xl font-bold">What is Our Minecraft Style Generator?</h2>
            <p className="text-lg text-muted-foreground">
              Our Minecraft Style Generator is an advanced AI photo converter that instantly transforms your photos into authentic pixel art. This powerful pixel art generator blends your images with Minecraft-style backgrounds, creating high-quality digital art—completely free, no registration required, perfect for gamers, creators, and pixel art enthusiasts.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <Monitor className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">AI Photo Converter Technology</h3>
                  <p className="text-muted-foreground">
                    Our advanced AI photo converter automatically transforms your photos into authentic Minecraft-style pixel art with perfect background integration.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Instant Pixel Art Generator</h3>
                  <p className="text-muted-foreground">
                    Generate stunning pixel art instantly with our fast, free Minecraft style generator—no registration needed, just upload and create.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <Code className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Custom Minecraft Style Art</h3>
                  <p className="text-muted-foreground">
                    Create personalized Minecraft style art with any background. Perfect for social media, gaming profiles, and creative projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
