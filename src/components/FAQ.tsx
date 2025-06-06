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
    question: 'What is this website and what can I do here?',
    answer: 'You can upload your own photo and a Minecraft-style background, and our AI will generate a high-quality, seamlessly blended image for you. The service is currently free to use.',
  },
  {
    question: 'Do I need to register or log in to use the service?',
    answer: 'No registration is required. You can try out all features for free without creating an account.',
  },
  {
    question: 'Will this service always be free?',
    answer: 'The service is currently free for everyone. In the future, we may introduce paid plans for advanced features or higher usage limits.',
  },
  {
    question: 'Can I use the generated images for commercial purposes?',
    answer: 'Please note that if you use official Minecraft backgrounds or assets without authorization, commercial use may not be allowed. The generated images are intended for personal or fan use.',
  },
  {
    question: 'Is my uploaded photo safe?',
    answer: 'We will not use your uploaded images.',
  },
  {
    question: 'How can I contact you if I have questions or issues?',
    answer: 'You can reach us at: wendy.1031ht@gmail.com',
  },
  {
    question: 'What kind of images work best?',
    answer: 'Clear, well-lit photos with a single subject and a Minecraft-style background will produce the best results.',
  },
  {
    question: 'Can I use any background image?',
    answer: 'Yes, you can upload any background you like, but for the best effect, we recommend using Minecraft-style images.',
  },
];

export default function FAQ() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-6">FAQ</Badge>
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions About Minecraft Style Online</h2>
          <p className="text-lg text-muted-foreground">
            Have another question? Contact us at <a href="mailto:wendy.1031ht@gmail.com" className="text-[#a259ff] underline">wendy.1031ht@gmail.com</a>.
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
