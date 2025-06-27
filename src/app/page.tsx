import { Suspense } from "react";
import ImageUploader from "@/components/ImageUploader";
import BackgroundSelector from "@/components/BackgroundSelector";
import CanvasEditor from "@/components/CanvasEditor";
import AIBlendButton from "@/components/AIBlendButton";
import HeroSection from "@/components/HeroSection";
import Testimonials from "@/components/Testimonials";
import PricingPlans from "@/components/PricingPlans";
import PricingPlansWithPayment from "@/components/PricingPlansWithPayment";
import PerformanceMetrics from "@/components/PerformanceMetrics";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import KeyFeatures from "@/components/KeyFeatures";
import WhatIs from "@/components/WhatIsGhibliAI";
import ExamplesGallery from "@/components/ExamplesGallery";
import BlogPreview from "@/components/BlogPreview";
import MainContent from "@/components/MainContent";
import ScrollToHash from "@/components/ScrollToHash";

interface Background {
  id: string;
  name: string;
  url: string;
}

export default function Home() {
  return (
    <main>
      <ScrollToHash />
      <div className="bg-gradient-to-br from-purple-50 to-purple-100">
        <MainContent />
        <HeroSection />
        <ExamplesGallery />
        <WhatIs />
        <KeyFeatures />
        <PerformanceMetrics />
        <Suspense fallback={<div className="bg-white py-16 text-center">加载定价计划...</div>}>
          <PricingPlansWithPayment />
        </Suspense>
        <Testimonials />
        <FAQ />
        <Suspense fallback={<div className="bg-white py-16 text-center">加载博客文章...</div>}>
          <BlogPreview />
        </Suspense>
        <Footer />
      </div>
    </main>
  );
}
