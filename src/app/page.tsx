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
  preview: string;
}

export default function Home() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [personImage, setPersonImage] = useState<string | null>(null);
  const [selectedBackground, setSelectedBackground] = useState<Background | null>(null);
  const [canvasImage, setCanvasImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleImageUpload = async (file: File, dataUrl: string) => {
    setOriginalImage(dataUrl);
    setIsProcessing(true);
    setCurrentStep(2);

    try {
      // Create FormData to send file
      const formData = new FormData();
      formData.append("image", file);

      // Call background removal API
      const response = await fetch("/api/remove-background", {
        method: "POST",
        body: formData, // Use FormData instead of JSON
      });

      const data = await response.json();

      if (data.success && data.result) {
        const resultImage = Array.isArray(data.result) ? data.result[0] : data.result;
        setPersonImage(resultImage);
        setCurrentStep(3);

        // Show demo mode message
        if (data.message) {
          console.log("API Message:", data.message);
        }
      } else {
        alert(`Background removal failed: ${data.error || "Unknown error"}`);
        setCurrentStep(1);
      }
    } catch (error) {
      console.error("Background removal error:", error);
      alert("Background removal processing failed");
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
    setCurrentStep(5);
  };

  const resetToStart = () => {
    setOriginalImage(null);
    setPersonImage(null);
    setSelectedBackground(null);
    setCanvasImage(null);
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">
            MinecraftMe
          </h1>
          <p className="text-lg text-green-600">
            Transform your photos into Minecraft worlds ✨
          </p>

          {/* Demo mode notification */}
          <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg max-w-2xl mx-auto">
            <p className="text-sm text-yellow-800">
              🎮 <strong>Demo Mode</strong> - This is a feature demonstration version. Real AI background removal and blending requires Replicate API configuration.
            </p>
          </div>
        </header>

        {/* Progress indicator */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {[
              { step: 1, label: "Upload Photo" },
              { step: 2, label: "Remove Background" },
              { step: 3, label: "Choose Background" },
              { step: 4, label: "Adjust Position" },
              { step: 5, label: "AI Blend" },
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

        {/* Main content area */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left side: Control panel */}
            <div className="space-y-6">
              {/* Step 1: Image upload */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  1. Upload Your Photo
                </h2>
                <ImageUploader
                  onImageUpload={handleImageUpload}
                  isLoading={isProcessing}
                />

                {originalImage && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Original image:</p>
                    <img
                      src={originalImage}
                      alt="Original photo"
                      className="w-full max-w-xs rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Step 2: Background removal result */}
              {personImage && (
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    2. Background Removal Complete ✅
                  </h2>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Background removed:</p>
                    <img
                      src={personImage}
                      alt="Background removed photo"
                      className="w-full max-w-xs rounded-lg bg-gray-100"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Background selection */}
              {personImage && (
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    3. Choose Minecraft Background
                  </h2>
                  <BackgroundSelector
                    onBackgroundSelect={handleBackgroundSelect}
                    selectedBackground={selectedBackground}
                  />
                </div>
              )}
            </div>

            {/* Right side: Canvas and AI blending */}
            <div className="space-y-6">
              {/* Step 4: Canvas editing */}
              {personImage && selectedBackground && (
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    4. Adjust Portrait Position
                  </h2>
                  <CanvasEditor
                    personImage={personImage}
                    background={selectedBackground}
                    onCanvasUpdate={handleCanvasUpdate}
                  />
                </div>
              )}

              {/* Step 5: AI blending */}
              {canvasImage && (
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    5. AI Magic Blending
                  </h2>
                  <AIBlendButton
                    canvasImage={canvasImage}
                    disabled={!canvasImage}
                    onBlendComplete={handleBlendComplete}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Restart button */}
          {currentStep > 1 && (
            <div className="text-center mt-8">
              <button
                onClick={resetToStart}
                className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Start Over
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-500">
          <p>Use AI technology to perfectly blend your photos into Minecraft worlds</p>
          <div className="mt-2 text-xs text-gray-400">
            <p>Demo version - Configure Replicate API to enable real AI processing features</p>
          </div>
        </footer>
      </div>
    </div>
  );
}