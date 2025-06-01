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
  const res = await fetch("https://api.cloudinary.com/v1_1/du6txwq9b/image/upload", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  if (data.secure_url) return data.secure_url;
  throw new Error(data.error?.message || "Cloudinary 上传失败");
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
      setError("请先调整人物位置");
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
          prompt: "A scene with modern architecture in the background: place the character at the left rule-of-thirds intersection, making them roughly one-third the height of the building; preserve the character’s original illustration style untouched; harmonize the palette and lighting so the character’s colors blend seamlessly into the background for a cohesive composition." // 只传必需参数
        }),
      });

      console.log("📡 API 响应状态:", response.status);
      const data = await response.json();
      console.log("📄 API 响应数据:", data);

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      if (!data.result) {
        throw new Error("AI 融合失败：未返回结果");
      }

      console.log("✅ AI 融合成功，调用 onBlendComplete");
      handleBlendCompleteWrapper(data.result);
    } catch (error) {
      console.error("❌ AI 融合错误:", error);
      setError(error instanceof Error ? error.message : "AI 融合失败，请重试");
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
          ? "像素艺术已生成"
          : isLoading
            ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />AI融合生成中...</>)
            : "一键生成像素艺术"
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