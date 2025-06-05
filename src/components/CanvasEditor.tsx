"use client";

import { useEffect, useRef, useState } from "react";

interface CanvasEditorProps {
  personImage: string | null;
  background: { url: string } | null;
  onCanvasUpdate: (dataUrl: string) => void;
}

export default function CanvasEditor({ personImage, background, onCanvasUpdate }: CanvasEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!canvasRef.current || !personImage || !background) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bgImg = new Image();
    const fgImg = new Image();

    bgImg.onload = () => {
      canvas.width = bgImg.width;
      canvas.height = bgImg.height;
      ctx.drawImage(bgImg, 0, 0);

      fgImg.src = personImage;
    };

    fgImg.onload = () => {
      const scaledWidth = fgImg.width * scale;
      const scaledHeight = fgImg.height * scale;
      ctx.drawImage(fgImg, position.x, position.y, scaledWidth, scaledHeight);
      onCanvasUpdate(canvas.toDataURL());
    };

    bgImg.src = background.url;
  }, [personImage, background, position, scale, onCanvasUpdate]);

  // 修复滚轮缩放 passive 警告
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    function handleWheel(e: WheelEvent) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setScale(prev => Math.max(0.1, Math.min(5, prev * delta)));
    }
    canvas.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition(prev => ({
      x: prev.x + e.movementX,
      y: prev.y + e.movementY
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full aspect-video">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded text-sm">
        Drag/scale the character to achieve the best pixel art effect
      </div>
    </div>
  );
} 