"use client";

import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import BackgroundSelector from "@/components/BackgroundSelector";
import CanvasEditor from "@/components/CanvasEditor";
import AIBlendButton from "@/components/AIBlendButton";
import HeroSection from "@/components/HeroSection";
import Testimonials from "@/components/Testimonials";
import PricingPlans from "@/components/PricingPlans";
import PerformanceMetrics from "@/components/PerformanceMetrics";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import KeyFeatures from "@/components/KeyFeatures";
import WhatIs from "@/components/WhatIsGhibliAI";
import ExamplesGallery from "@/components/ExamplesGallery";
interface Background {
  id: string;
  name: string;
  url: string;
}

export default function Home() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [personImage, setPersonImage] = useState<string | null>(null);
  const [selectedBackground, setSelectedBackground] =
    useState<Background | null>(null);
  const [canvasImage, setCanvasImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [blendResult, setBlendResult] = useState<string | null>(null);

  const handleImageUpload = async (file: File, dataUrl: string) => {
    console.log("🖼️ 开始上传图片:", {
      name: file.name,
      type: file.type,
      size: file.size,
    });

    setOriginalImage(dataUrl);
    setIsProcessing(true);
    setCurrentStep(2);

    try {
      // 创建 FormData 对象
      const formData = new FormData();
      formData.append("image", file);
      console.log("📦 已创建 FormData 对象");

      // 调用背景移除 API
      console.log("🔄 正在调用背景移除 API...");
      const response = await fetch("/api/remove-background", {
        method: "POST",
        body: formData,
      });

      console.log("📡 API 响应状态:", response.status);
      const data = await response.json();
      console.log("📄 API 响应数据:", data);

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${
            data.error || "Unknown error"
          }`
        );
      }

      if (data.success && data.result) {
        console.log("✅ 背景移除成功");
        setPersonImage(data.result);
        setCurrentStep(3);
      } else {
        throw new Error(data.error || "背景移除失败");
      }
    } catch (error) {
      console.error("❌ 背景移除错误:", error);
      alert(
        `背景移除处理失败: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
      setCurrentStep(1);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBackgroundSelect = (background: Background) => {
    setSelectedBackground(background);
    if (personImage) {
      setCurrentStep(4);
    }
  };

  const handleCanvasUpdate = (canvasDataUrl: string) => {
    setCanvasImage(canvasDataUrl);
  };

  const handleBlendComplete = (blendedImage: string) => {
    if (typeof blendedImage === "string") {
      console.log("🎉 AI融合完成回调被触发");
      console.log("📦 融合结果:", blendedImage.substring(0, 50) + "...");
      setBlendResult(blendedImage);
    } else {
      console.log("🎉 AI融合完成回调被触发，但结果不是字符串:", blendedImage);
    }
    setCurrentStep(5);
  };

  const resetToStart = () => {
    setOriginalImage(null);
    setPersonImage(null);
    setSelectedBackground(null);
    setCanvasImage(null);
    setBlendResult(null);
    setCurrentStep(1);
  };

  return (
    <main>
      <HeroSection />

      <div className="bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto px-4 py-8">
          {/* 标题 */}
          <header className="text-center mb-8">
            <h2 className="text-4xl font-bold text-[#22223b] mb-2">
            Ready to Minecraft Yourself? 
            </h2>
            <p className="text-lg text-[#a259ff]">
            Upload a Photo and Begin!
            </p>
          </header>
          <div>
            {/* 顶部标题+步骤条区域，纯白背景，适中上下间距，全屏宽度 */}
            <div className="bg-white w-full py-12 mb-8">
              <div className="max-w-4xl mx-auto mb-0">
                <div className="flex items-center justify-center">
                  {[
                    { step: 1, label: "Upload Photo" },
                    { step: 2, label: "Choose Background" },
                    { step: 3, label: "Canvas Edit" },
                    { step: 4, label: "Generate" },
                  ].map(({ step, label }) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`
                          w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold
                          ${
                            currentStep >= step
                              ? "bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c084fc] text-white"
                              : "bg-gray-200 text-gray-500"
                          }
                        `}
                      >
                        {step}
                      </div>
                      <span className="text-xs text-gray-600 ml-1 hidden sm:block whitespace-nowrap">
                        {label}
                      </span>
                      {step < 4 && (
                        <div
                          className={`
                            w-6 h-0.5 mx-1 rounded-full
                            ${
                              currentStep > step
                                ? "bg-[#a259ff]"
                                : "bg-gray-200"
                            }
                          `}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 py-8">
            {/* 主要内容区域 */}
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col gap-6 items-center">
                {/* 步骤 1：图片上传 */}
                <div className="bg-white rounded-lg p-6 shadow-sm w-full">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    1. Upload Your Photo
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Please upload an image smaller than 2MB, otherwise the generation may fail.
                  </p>
                  <ImageUploader
                    onImageUpload={handleImageUpload}
                    isLoading={isProcessing}
                  />
                </div>

                {/* 步骤 2：背景选择 */}
                {personImage && (
                  <div className="bg-white rounded-lg p-6 shadow-sm w-full">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      3. Choose a Minecraft-style Background
                    </h2>
                    <BackgroundSelector
                      onBackgroundSelect={handleBackgroundSelect}
                      selectedBackground={selectedBackground}
                    />
                  </div>
                )}

                {/* 步骤 3：画布编辑 */}
                {personImage && selectedBackground && (
                  <div className="bg-white rounded-lg p-6 shadow-sm w-full">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      4. Canvas Edit · Drag/Scale Character
                    </h2>
                    <CanvasEditor
                      personImage={personImage}
                      background={selectedBackground}
                      onCanvasUpdate={handleCanvasUpdate}
                    />
                  </div>
                )}

                {/* 步骤 4：AI 融合 */}
                {canvasImage && selectedBackground && (
                  <div className="bg-white rounded-lg p-6 shadow-sm w-full">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      5. AI Blend · One-click Pixel Art
                    </h2>
                    <AIBlendButton
                      canvasImage={canvasImage}
                      backgroundUrl={selectedBackground.url}
                      disabled={!canvasImage || !selectedBackground}
                      onBlendComplete={handleBlendComplete}
                    />
                  </div>
                )}
              </div>

              {/* 融合结果展示与下载 */}
              {blendResult && (
                <div className="bg-white rounded-lg p-6 shadow-sm mt-8 text-center">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    AI Blend Result · Download Your Pixel Art
                  </h2>
                  <img
                    src={blendResult}
                    alt="AI Blend Result"
                    className="w-full max-w-lg mx-auto rounded-lg border"
                    style={{ background: "#eee" }}
                  />
                  <a
                    href={blendResult}
                    download="minecraftstyle-art.png"
                    className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                    Download Pixel Art
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* <ExamplesGallery /> */}
        <WhatIs />
        <KeyFeatures />
        <PerformanceMetrics />
        <PricingPlans />
        <Testimonials />
        <FAQ />
        <Footer />
      </div>
    </main>
  );
}
