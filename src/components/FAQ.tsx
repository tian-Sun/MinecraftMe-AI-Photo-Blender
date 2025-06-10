'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

const faqs = [
  {
    question: 'What is this Minecraft style generator and how does it work?',
    answer: 'Our AI photo converter transforms your photos into stunning Minecraft style pixel art. Simply upload your photo and choose a background—our pixel art generator creates seamlessly blended, high-quality Minecraft style images for free.',
  },
  {
    question: 'Do I need to register to use the AI photo converter?',
    answer: 'No registration required! Our Minecraft style generator is completely free to use without creating an account. Start creating pixel art instantly.',
  },
  {
    question: 'Will this pixel art generator always be free?',
    answer: 'Yes! Our Minecraft style generator and AI photo converter are currently free for everyone. We may introduce premium features in the future, but core pixel art generation will remain free.',
  },
  {
    question: 'Can I use generated Minecraft style art commercially?',
    answer: 'Generated pixel art from our AI photo converter is perfect for personal use, social media, and fan projects. For commercial use, please ensure your uploaded backgrounds comply with relevant copyrights.',
  },
  {
    question: 'Is my photo safe with your AI photo converter?',
    answer: 'Absolutely! We prioritize your privacy. Photos uploaded to our Minecraft style generator are processed securely and never stored or shared.',
  },
  {
    question: 'How can I contact support for the pixel art generator?',
    answer: 'For questions about our Minecraft style generator or AI photo converter, reach us at: wendy.1031ht@gmail.com',
  },
  {
    question: 'What photos work best with the Minecraft style generator?',
    answer: 'Our AI photo converter works best with clear, well-lit photos featuring a single subject. Any photo can become amazing pixel art with our Minecraft style generator!',
  },
  {
    question: 'Can I upload custom backgrounds to the pixel art generator?',
    answer: 'Yes! Our Minecraft style generator accepts any background image. For authentic results, we recommend Minecraft-style backgrounds, but any image works with our AI photo converter.',
  },
];

export default function FAQ() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-6">FAQ</Badge>
          <h2 className="text-4xl font-bold mb-4">Minecraft Style Generator FAQ - AI Photo Converter Guide</h2>
          <p className="text-lg text-muted-foreground">
            Questions about our pixel art generator? Contact us at <a href="mailto:wendy.1031ht@gmail.com" className="text-[#a259ff] underline">wendy.1031ht@gmail.com</a>.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`item-${index}`}
              className="border border-gray-200 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <div className="flex items-start gap-3">
                  <div className="bg-gray-100 text-gray-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <span className="font-medium">{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pl-9 text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
