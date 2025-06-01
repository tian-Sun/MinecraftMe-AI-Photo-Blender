"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploaderProps {
  onImageUpload: (file: File, dataUrl: string) => Promise<void>;
  isLoading?: boolean;
}

export default function ImageUploader({ onImageUpload, isLoading }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const dataUrl = reader.result as string;
        setPreview(dataUrl);
        await onImageUpload(file, dataUrl);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"]
    },
    maxFiles: 1,
    disabled: isLoading
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
        isLoading
          ? "border-gray-300 bg-gray-50 cursor-not-allowed"
          : isDragActive
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:border-gray-400"
      }`}
    >
      <input {...getInputProps()} />
      {isLoading ? (
        <div className="text-gray-500">
          <p className="text-lg">AI智能处理中...</p>
          <div className="mt-2 animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500 mx-auto"></div>
        </div>
      ) : preview ? (
        <img src={preview} alt="Preview" className="max-h-64 mx-auto" />
      ) : isDragActive ? (
        <p className="text-lg text-blue-500">拖放照片到此，开启像素艺术之旅...</p>
      ) : (
        <p className="text-lg">点击或拖放照片上传，体验 AI 融合像素艺术</p>
      )}
    </div>
  );
} 