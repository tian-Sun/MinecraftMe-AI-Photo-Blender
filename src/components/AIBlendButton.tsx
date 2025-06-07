"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface AIBlendButtonProps {
  canvasImage: string | null;
  backgroundUrl: string;
  disabled?: boolean;
  onBlendComplete: (blendedImage: string) => void;
}

// Cloudinary 上传函数
async function uploadToCloudinary(base64: string): Promise<string> {
  const formData = new FormData();
  formData.append("file", base64);
  formData.append("upload_preset", "haotian");
  
  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
  
  const data = await response.json();
  if (data.url) return data.url;
  throw new Error(data.error || "Cloudinary upload failed");
}

export default function AIBlendButton({
  canvasImage,
  backgroundUrl,
  disabled = false,
  onBlendComplete,
}: AIBlendButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasResult, setHasResult] = useState(false);

  const handleBlendCompleteWrapper = (blendedImage: string) => {
    setHasResult(true);
    onBlendComplete(blendedImage);
  };

  const handleClick = async () => {
    console.log("🎯 AI融合按钮被点击");
    console.log("📦 当前状态:", {
      hasCanvasImage: !!canvasImage,
      backgroundUrl,
      disabled,
      isLoading
    });

    if (!canvasImage) {
      console.error("❌ 错误：canvasImage 为空");
      setError("Please adjust the character position first");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 1. 上传到 Cloudinary
      console.log("☁️ 开始上传图片到 Cloudinary...");
      const imageUrl = await uploadToCloudinary(canvasImage);
      console.log("☁️ Cloudinary 上传成功，图片地址：", imageUrl);

      // 2. 调用 AI 融合 API（只传必需参数 input_image 和 prompt）
      console.log("🔄 开始调用 AI 融合 API...");
      const response = await fetch("/api/ai-blend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input_image: imageUrl, // Cloudinary 上传后的图片 URL
          prompt:"Place the human subject in a suitable position within a Minecraft background scene, ensuring natural fusion between the character and the environment. Keep the original look of the character without beautification, but allow slight pose adjustment for better interaction with the scene (e.g., sitting on blocks, walking paths, standing near trees or cliffs). Match the lighting of the character to the background light source for seamless integration—whether sunlight, shadows, or evening light. Composition should guide focus subtly to the subject without making it stand out unnaturally; align with the rule of thirds or golden ratio if needed. Avoid harsh edges or cut-out appearance. Preserve the pixelated style and lighting of the Minecraft environment, and adjust the subject's tone and shadows to match accordingly. Don't altered face, repainted face, beautified, artificial skin, unrealistic texture, face retouch, makeup, cartoonized face, doll-like, AI-generated face",
          output_format: "png",
          safety_tolerance: 0,
          aspect_ratio: "match_input_image"
        }),
      });

      console.log("📡 API 响应状态:", response.status);
      const data = await response.json();
      console.log("📄 API 响应数据:", data);

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      if (!data.result) {
        throw new Error("AI blending failed: no result returned");
      }

      console.log("✅ AI 融合成功，调用 onBlendComplete");
      handleBlendCompleteWrapper(data.result);
    } catch (error) {
      console.error("❌ AI 融合错误:", error);
      setError(error instanceof Error ? error.message : "AI blending failed, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={handleClick}
        disabled={disabled || isLoading || !canvasImage || hasResult}
        className="w-full"
      >
        {hasResult
          ? "Pixel Art Generated"
          : isLoading
            ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />AI blending in progress...</>)
            : "Generate Pixel Art with One Click"
        }
      </Button>
      
      {error && (
        <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
} 