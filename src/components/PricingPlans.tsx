'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles } from 'lucide-react';

const plans = [
  {
    name: 'Free Edition',
    price: 'Free',
    currency: 'USD',
    description: 'Free Try.',
    features: [
      'One free trial per account per day',
      'Basic style options',
      'Access to free Minecraft style image generator',
      '@black-forest-labs/flux-kontext-pro integration',
      'Standard resolution',
    ],
    buttonText: 'Try Free',
    buttonIcon: Sparkles,
    popular: false,
    note: 'Great for getting started!',
  },
  // {
  //   name: 'Standard',
  //   price: '$6.9',
  //   currency: 'USD',
  //   description: 'For new artists and creators.',
  //   features: [
  //     '14000 credits, 140 generation',
  //     'price: $6.9 USD',
  //     'Images to Image Ghibli Style Generations',
  //     'Advanced Ghibli styles',
  //     'High resolution output',
  //     'Priority processing',
  //     'One Time Perchance',
  //   ],
  //   buttonText: 'Get Standard',
  //   buttonIcon: Sparkles,
  //   popular: false,
  //   note: 'Best for new user!',
  // },
  // {
  //   name: 'Pro',
  //   price: '$12.9',
  //   currency: 'USD',
  //   description: 'For professional artists and creators.',
  //   features: [
  //     '30000 credits, 300 generation',
  //     'price: $12.9 USD',
  //     '13% discount',
  //     'Images to Image Ghibli Style Generations',
  //     'Advanced Ghibli styles',
  //     'High resolution output',
  //     'Priority processing',
  //     'One Time Perchance',
  //   ],
  //   buttonText: 'Get Geblee AI Pro',
  //   buttonIcon: Sparkles,
  //   popular: true,
  //   note: 'Best for professional use!',
  // },
  // {
  //   name: 'Pro Max',
  //   price: '$22.9',
  //   currency: 'USD',
  //   description: 'For Professional artists and creators.',
  //   features: [
  //     '60000 credits, 600 generation',
  //     'price: $22.9 USD',
  //     '23% discount',
  //     'Images to Image Ghibli Style Generations',
  //     'Advanced Ghibli styles',
  //     'High resolution output',
  //     'Priority processing',
  //     'One Time Perchance',
  //   ],
  //   buttonText: 'Get Geblee AI Pro Max',
  //   buttonIcon: Sparkles,
  //   popular: false,
  //   note: 'Best for professional use!',
  // },
];

export default function PricingPlans() {
  const freePlan = plans[0];
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Minecraft Style Generator Pricing - Free AI Photo Converter</h2>
          <p className="text-lg text-muted-foreground">
            Start creating pixel art with our free Minecraft style generator and AI photo converter.
          </p>
        </div>

        <div className="flex justify-center">
          <Card className="relative overflow-hidden shadow-card hover:shadow-lg transition-shadow duration-300 max-w-sm w-full">
            <CardHeader className="text-center p-6">
              <h3 className="text-xl font-semibold mb-2">Free Pixel Art Generator - {freePlan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">{freePlan.price}</span>
                {freePlan.price !== 'Free' && (
                  <span className="text-muted-foreground ml-1">{freePlan.currency}</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{freePlan.description}</p>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <ul className="space-y-3 mb-8">
                {freePlan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full mb-4 gradient-primary text-white">
                {freePlan.buttonText}
                <freePlan.buttonIcon className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                {freePlan.note}
              </p>
            </CardContent>
          </Card>
        </div>

        {/*
        // 恢复多计划时，将下方注释取消并删除上方 <div className="flex justify-center"> ... </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`relative overflow-hidden shadow-card hover:shadow-lg transition-shadow duration-300 ${
                plan.popular ? 'border-purple-200 shadow-glow' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute top-4 right-4 gradient-primary text-white">
                  Popular
                </Badge>
              )}
              <CardHeader className="text-center p-6">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== 'Free' && (
                    <span className="text-muted-foreground ml-1">{plan.currency}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full mb-4 ${
                    plan.popular
                      ? 'gradient-primary text-white hover:shadow-glow'
                      : 'gradient-primary text-white'
                  }`}
                >
                  {plan.buttonText}
                  <plan.buttonIcon className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  {plan.note}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        // 还原多计划时，将上方单卡片渲染删除，并取消本注释即可
        */}
      </div>
    </section>
  );
}
