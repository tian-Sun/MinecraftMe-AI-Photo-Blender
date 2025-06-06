'use client';

import { Badge } from '@/components/ui/badge';

const metrics = [
  {
    title: 'Images Generated',
    value: '1M+',
    subtitle: 'Minecraft-style Artworks',
  },
  {
    title: 'Daily Users',
    value: '50,000+',
    subtitle: 'Active Users',
  },
  {
    title: 'Style Options',
    value: '20+',
    subtitle: 'Minecraft Art Styles',
  },
];

export default function PerformanceMetrics() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-6">Stats</Badge>
          <h2 className="text-4xl font-bold mb-4">Minecraft AI Performance Metrics</h2>
          <p className="text-lg text-muted-foreground">
            Leading the way in Minecraft-style art generation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {metrics.map((metric, index) => (
            <div key={metric.title} className="text-center">
              <div className="mb-4">
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  {metric.title}
                </p>
                <p className="text-6xl md:text-7xl font-bold text-foreground mb-2">
                  {metric.value}
                </p>
                <p className="text-muted-foreground">
                  {metric.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
