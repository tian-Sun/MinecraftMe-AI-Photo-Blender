import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MinecraftMe - AI Photo Blender",
  description: "Transform your photos into Minecraft worlds using AI technology. Upload your photo, remove background, and blend with iconic Minecraft scenes.",
  keywords: ["minecraft", "ai", "photo", "blending", "background removal", "image processing"],
  authors: [{ name: "MinecraftMe Team" }],
  openGraph: {
    title: "MinecraftMe - AI Photo Blender",
    description: "Transform your photos into Minecraft worlds using AI technology",
    url: "https://same-ou8ycr3k41z-latest.netlify.app",
    siteName: "MinecraftMe",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MinecraftMe - AI Photo Blender",
    description: "Transform your photos into Minecraft worlds using AI technology",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}