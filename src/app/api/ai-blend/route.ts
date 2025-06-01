import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

function isReadableStream(obj: any): obj is ReadableStream {
  return obj && typeof obj.getReader === "function";
}

async function streamToBuffer(stream: ReadableStream): Promise<Buffer> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  return Buffer.concat(chunks);
}

export async function POST(request: Request) {
  try {
    const { input_image, prompt } = await request.json();

    console.log("🖼️ input_image:", input_image);
    console.log("📝 prompt:", prompt);

    // 只传必需参数 input_image 和 prompt
    const output = await replicate.run(
      "black-forest-labs/flux-kontext-pro",
      {
        input: {
          input_image,
          prompt,
        },
      }
    );

    // 1. 直接返回字符串（图片 URL）
    if (typeof output === "string") {
      return NextResponse.json({ success: true, result: output });
    }

    // 2. 处理 ReadableStream（图片流转 base64）
    if (isReadableStream(output)) {
      const buffer = await streamToBuffer(output);
      const base64 = buffer.toString("base64");
      const dataUrl = `data:image/png;base64,${base64}`;
      return NextResponse.json({ success: true, result: dataUrl });
    }

    // 3. 其它异常结构
    console.error("❌ Replicate 返回异常，output:", output);
    throw new Error("AI融合失败：Replicate 未返回图片 URL 或图片流，output=" + JSON.stringify(output));
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "AI 融合失败" },
      { status: 500 }
    );
  }
} 