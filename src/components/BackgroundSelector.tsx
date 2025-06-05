"use client";

import { useState } from "react";

interface Background {
  id: string;
  name: string;
  url: string;
}

interface BackgroundSelectorProps {
  onBackgroundSelect: (background: Background) => void;
  selectedBackground: Background | null;
}

// 默认背景列表
const defaultBackgrounds: Background[] = [
  {
    id: "1",
    name: "Plains",
    url: "/backgrounds/plains.jpg"
  },
  {
    id: "2",
    name: "Desert",
    url: "/backgrounds/desert.jpg"
  },
  {
    id: "3",
    name: "Snow",
    url: "/backgrounds/snow.jpg"
  }
];

export default function BackgroundSelector({ onBackgroundSelect, selectedBackground }: BackgroundSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {defaultBackgrounds.map((bg) => (
        <div
          key={bg.id}
          className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
            selectedBackground?.id === bg.id ? "border-blue-500 scale-105" : "border-transparent hover:border-gray-300"
          }`}
          onClick={() => onBackgroundSelect(bg)}
        >
          <img
            src={bg.url}
            alt={bg.name}
            className="w-full h-32 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
            {bg.name}
          </div>
        </div>
      ))}
    </div>
  );
} 