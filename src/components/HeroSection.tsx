'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  // 回到顶部函数
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative gradient-hero py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-white/50 text-foreground border border-border/20">
                {t.hero.badge}
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                {t.hero.title}{' '}
                <span className="text-[#a259ff]">{t.hero.titleHighlight}</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-lg">
                {t.hero.description}
              </p>
            </div>

            <Button
              onClick={scrollToTop}
              className="bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c084fc] hover:shadow-glow transition-all duration-300 text-white px-8 py-6 text-lg border-0"
              style={{ backgroundImage: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)' }}
            >
              {t.hero.cta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Right Image */}
          <div className="relative max-w-[520px] max-h-[520px] w-full h-full mx-auto">
            <div className="relative bg-white rounded-2xl shadow-card p-2 sm:p-4">
              <div className="grid" style={{ gridTemplateColumns: '1fr 48px 1fr' }}>
                {/* Before 区域：上下两张图 */}
                <div className="space-y-2 flex flex-col h-full justify-between">
                  <div>
                    <div className="text-sm font-medium text-center bg-gray-100 rounded-lg py-1 mb-1">
                      Before
                    </div>
                    <div className="aspect-square rounded-lg overflow-hidden max-w-[140px] max-h-[140px] mx-auto">
                      <Image
                        src="/demo/person.png"
                        alt="Before 1"
                        width={240}
                        height={240}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="aspect-square rounded-lg overflow-hidden mt-1 max-w-[140px] max-h-[140px] mx-auto">
                      <Image
                        src="/demo/desert.jpeg"
                        alt="Before 2"
                        width={240}
                        height={240}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                {/* 箭头区域（绝对定位SVG） */}
                <div className="relative flex flex-col items-center justify-center">
                  {/* 上箭头：30度斜线 */}
                  <svg style={{ position: 'absolute', top: '22%', left: 0, right: 0, maxWidth: '32px', maxHeight: '64px' }} width="32" height="64" viewBox="0 0 32 64" fill="none">
                    <defs>
                      <marker id="arrowhead1" markerWidth="6" markerHeight="6" refX="4.8" refY="3.2" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L6.4,3.2 L0,6.4 L1.6,3.2 L0,0" fill="#a259ff" />
                      </marker>
                    </defs>
                    <line x1="6.4" y1="11.2" x2="25.6" y2="48" stroke="#a259ff" strokeWidth="3.2" markerEnd="url(#arrowhead1)" />
                  </svg>
                  {/* 下箭头：-30度斜线 */}
                  <svg style={{ position: 'absolute', bottom: '22%', left: 0, right: 0, maxWidth: '32px', maxHeight: '64px' }} width="32" height="64" viewBox="0 0 32 64" fill="none">
                    <defs>
                      <marker id="arrowhead2" markerWidth="6" markerHeight="6" refX="4.8" refY="3.2" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L6.4,3.2 L0,6.4 L1.6,3.2 L0,0" fill="#a259ff" />
                      </marker>
                    </defs>
                    <line x1="6.4" y1="52.8" x2="25.6" y2="16" stroke="#a259ff" strokeWidth="3.2" markerEnd="url(#arrowhead2)" />
                  </svg>
                </div>
                {/* After 区域 */}
                <div className="space-y-2 flex flex-col h-full justify-center">
                  <div className="text-sm font-medium text-center bg-gray-100 rounded-lg py-1 mb-1">
                    After
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="aspect-square rounded-lg overflow-hidden max-w-[240px] max-h-[240px] mx-auto">
                      <Image
                        src="/demo/result.png"
                        alt="After transformation"
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
