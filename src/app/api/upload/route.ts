import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const response = await fetch("https://api.cloudinary.com/v1_1/du6txwq9b/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || "Cloudinary 上传失败");
    }

    return NextResponse.json({ url: data.secure_url });
  } catch (error) {
    console.error("上传错误:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "上传失败" },
      { status: 500 }
    );
  }
} 