'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TabsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="style-art" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 bg-gray-100 rounded-lg p-1">
            <TabsTrigger
              value="style-art"
              className="gradient-primary data-[state=active]:text-white data-[state=active]:shadow-none rounded-md"
            >
              {t.tabs.styleArt}
            </TabsTrigger>
            <TabsTrigger
              value="text-to-image"
              className="data-[state=active]:bg-gray-200 rounded-md"
            >
              {t.tabs.textToImage}
            </TabsTrigger>
            <TabsTrigger
              value="image-to-image"
              className="data-[state=active]:bg-gray-200 rounded-md"
            >
              {t.tabs.imageToImage}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="style-art" className="mt-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                {t.tabs.styleArtTitle}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {t.tabs.styleArtDesc}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="text-to-image" className="mt-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                {t.tabs.textToImageTitle}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {t.tabs.textToImageDesc}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="image-to-image" className="mt-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                {t.tabs.imageToImageTitle}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {t.tabs.imageToImageDesc}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
