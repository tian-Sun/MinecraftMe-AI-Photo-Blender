"use client";

import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import BackgroundSelector from "@/components/BackgroundSelector";
import CanvasEditor from "@/components/CanvasEditor";
import AIBlendButton from "@/components/AIBlendButton";

interface Background {
  id: string;
  name: string;
  url: string;
}

export default function Home() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [personImage, setPersonImage] = useState<string | null>(null);
  const [selectedBackground, setSelectedBackground] = useState<Background | null>(null);
  const [canvasImage, setCanvasImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [blendResult, setBlendResult] = useState<string | null>(null);

  const handleImageUpload = async (file: File, dataUrl: string) => {
    console.log("🖼️ 开始上传图片:", {
      name: file.name,
      type: file.type,
      size: file.size
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
        throw new Error(`HTTP error! status: ${response.status}, message: ${data.error || "Unknown error"}`);
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
      alert(`背景移除处理失败: ${error instanceof Error ? error.message : String(error)}`);
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="container mx-auto px-4 py-8">
        {/* 标题 */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">
            MinecraftMe
          </h1>
          <p className="text-lg text-green-600">
            将您的照片融入 Minecraft 世界 ✨
          </p>
        </header>

        {/* 进度指示器 */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {[
              { step: 1, label: "上传照片" },
              { step: 2, label: "移除背景" },
              { step: 3, label: "选择背景" },
              { step: 4, label: "调整位置" },
              { step: 5, label: "AI 融合" },
            ].map(({ step, label }) => (
              <div key={step} className="flex items-center">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                    ${currentStep >= step
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                    }
                  `}
                >
                  {step}
                </div>
                <span className="text-sm text-gray-600 ml-2 hidden sm:block">
                  {label}
                </span>
                {step < 5 && (
                  <div
                    className={`
                      w-8 h-1 mx-2
                      ${currentStep > step ? "bg-green-500" : "bg-gray-200"}
                    `}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 左侧：控制面板 */}
            <div className="space-y-6">
              {/* 步骤 1：图片上传 */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  1. 上传您的照片
                </h2>
                <ImageUploader
                  onImageUpload={handleImageUpload}
                  isLoading={isProcessing}
                />
              </div>

              {/* 步骤 2：背景移除结果 */}
              {personImage && (
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    2. 背景移除完成 ✅
                  </h2>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">已移除背景：</p>
                    <img
                      src={personImage}
                      alt="已移除背景的照片"
                      className="w-full max-w-xs rounded-lg bg-gray-100"
                    />
                  </div>
                </div>
              )}

              {/* 步骤 3：背景选择 */}
              {personImage && (
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    3. 选择 Minecraft 背景
                  </h2>
                  <BackgroundSelector
                    onBackgroundSelect={handleBackgroundSelect}
                    selectedBackground={selectedBackground}
                  />
                </div>
              )}
            </div>

            {/* 右侧：画布和 AI 融合 */}
            <div className="space-y-6">
              {/* 步骤 4：画布编辑 */}
              {personImage && selectedBackground && (
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    4. 调整人物位置
                  </h2>
                  <CanvasEditor
                    personImage={personImage}
                    background={selectedBackground}
                    onCanvasUpdate={handleCanvasUpdate}
                  />
                </div>
              )}

              {/* 步骤 5：AI 融合 */}
              {canvasImage && selectedBackground && (
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    5. AI 魔法融合
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
          </div>

          {/* 重新开始按钮 */}
          {currentStep > 1 && (
            <div className="text-center mt-8">
              <button
                onClick={resetToStart}
                className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                重新开始
              </button>
            </div>
          )}

          {/* 融合结果展示与下载 */}
          {blendResult && (
            <div className="bg-white rounded-lg p-6 shadow-sm mt-8 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                AI融合结果
              </h2>
              <img
                src={blendResult}
                alt="AI融合结果"
                className="w-full max-w-lg mx-auto rounded-lg border"
                style={{ background: "#eee" }}
              />
              <a
                href={blendResult}
                download="minecraft-blend.png"
                className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                下载图片
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}