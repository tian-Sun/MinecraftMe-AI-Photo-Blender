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
          <p className="text-muted-foreground mb-8">MinecraftStyle: Powered by Advanced AI Technology</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
         

          {/* Left Image */}
          <div className="relative">
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <Image
                  src="/demo/result.png"
                  alt="Ghibli style characters"
                  width={500}
                  height={400}
                  className="w-full h-auto"
                />
              </CardContent>
            </Card>
          </div>

 {/* Right Content */}
 <div className="space-y-8">
            <h2 className="text-4xl font-bold">What is Minecraft Style Online?</h2>
            <p className="text-lg text-muted-foreground">
              Minecraft Style Online is an AI-powered platform that lets you instantly blend your own photos with any Minecraft-style background. Effortlessly create high-quality, pixel-art inspired images—no registration required, completely free, and perfect for fans, creators, and anyone who loves unique digital art.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <Monitor className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">AI Fusion</h3>
                  <p className="text-muted-foreground">
                    Automatically blend your photo with Minecraft-style backgrounds using advanced AI.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Instant & Free</h3>
                  <p className="text-muted-foreground">
                    No registration needed. Enjoy fast, high-quality results for free.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <Code className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Custom & Shareable</h3>
                  <p className="text-muted-foreground">
                    Upload any background, create your own Minecraft-style art, and share with friends or on social media.
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
