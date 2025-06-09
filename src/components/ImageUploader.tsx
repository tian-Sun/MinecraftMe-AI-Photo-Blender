"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';

interface ImageUploaderProps {
  onImageUpload: (file: File, dataUrl: string) => Promise<void>;
  isLoading?: boolean;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ImageUploader({ onImageUpload, isLoading }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // 获取用户剩余使用次数
  const { data: usageData, mutate } = useSWR(
    session ? '/api/remaining' : null,
    fetcher,
    {
      refreshInterval: 0,
      revalidateOnFocus: true,
    }
  );

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // 检查用户是否已登录
    if (!session) {
      router.push('/login?callbackUrl=' + encodeURIComponent(window.location.href));
      return;
    }

    // 检查是否还有剩余使用次数
    if (usageData && usageData.remainingGenerations <= 0) {
      alert('You have reached your daily limit. Please try again tomorrow.');
      return;
    }

    const file = acceptedFiles[0];
    if (file) {
      // 减少使用次数
      try {
        const response = await fetch('/api/remaining', {
          method: 'POST',
        });
        
        if (!response.ok) {
          throw new Error('Failed to update usage count');
        }
        
        await mutate(); // 更新使用次数数据
        
        const reader = new FileReader();
        reader.onloadend = async () => {
          const dataUrl = reader.result as string;
          setPreview(dataUrl);
          await onImageUpload(file, dataUrl);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error updating usage count:', error);
        alert('Failed to process your request. Please try again.');
      }
    }
  }, [onImageUpload, session, router, usageData, mutate]);

  const handleLoginRedirect = () => {
    if (!session) {
      router.push('/login?callbackUrl=' + encodeURIComponent(window.location.href));
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"]
    },
    maxFiles: 1,
    disabled: isLoading || (usageData && usageData.remainingGenerations <= 0),
  });

  // 如果用户未登录，显示登录提示
  if (status === 'loading') {
    return (
      <div className="border-2 border-dashed rounded-lg p-6 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500 mx-auto"></div>
        <p className="text-lg text-gray-500 mt-2">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div
        className="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer hover:border-purple-400 hover:bg-purple-50"
        onClick={handleLoginRedirect}
      >
        <div className="text-gray-600">
          <Upload className="w-12 h-12 mx-auto mb-2" />
          <p className="text-lg">Sign in to upload photos</p>
          <p className="text-sm text-gray-500 mt-1">Click here to sign in with Google</p>
        </div>
      </div>
    );
  }

  // 如果用户已达到每日限制
  if (usageData && usageData.remainingGenerations <= 0) {
    return (
      <div className="border-2 border-dashed rounded-lg p-6 text-center border-gray-300 bg-gray-50">
        <div className="text-gray-500">
          <Upload className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="text-lg">Daily limit reached</p>
          <p className="text-sm mt-1">
            Next reset in: {usageData.hours}h {usageData.minutes}m
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
        isLoading
          ? "border-gray-300 bg-gray-50 cursor-not-allowed"
          : isDragActive
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:border-gray-400 cursor-pointer"
      }`}
    >
      <input {...getInputProps()} />
      {isLoading ? (
        <div className="text-gray-500">
          <p className="text-lg">AI is processing...</p>
          <div className="mt-2 animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500 mx-auto"></div>
        </div>
      ) : preview ? (
        <img src={preview} alt="Preview" className="max-h-64 mx-auto" />
      ) : isDragActive ? (
        <div className="text-blue-500">
          <Upload className="w-12 h-12 mx-auto mb-2" />
          <p className="text-lg">Drop your photo here to start your pixel art journey...</p>
        </div>
      ) : (
        <div className="text-gray-600">
          <Upload className="w-12 h-12 mx-auto mb-2" />
          <p className="text-lg">Upload a full-body photo (head to feet) for best results</p>
          {usageData && (
            <p className="text-sm text-purple-600 mt-2">
              {usageData.remainingGenerations} uses remaining today
            </p>
          )}
        </div>
      )}
    </div>
  );
} 