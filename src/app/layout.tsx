import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Header from '@/components/Header';
import Script from 'next/script';
import { StagewiseToolbar } from '@stagewise/toolbar-next';
import Providers from '@/components/Providers';

const inter = Inter({ subsets: ["latin"] });

// Stagewise配置
const stagewiseConfig = {
  plugins: []
};

export const metadata: Metadata = {
  title: "Minecraft Photo Background Generator | Upload & Blend Instantly",
  description: "Upload your full-body photo and blend into Minecraft backgrounds instantly. A seamless way for Minecraft fans to create game-style portraits in seconds.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SD8Q3MPVZ9"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SD8Q3MPVZ9');
          `}
        </Script>
        
        {/* Microsoft Clarity */}
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "rwq7ye41zx");
          `}
        </Script>
      </head>
      <body suppressHydrationWarning className={inter.className}>
        <Providers>
          <Header />
          {children}
          {/* Stagewise工具栏 - 仅在开发模式下显示 */}
          {process.env.NODE_ENV === 'development' && (
            <StagewiseToolbar config={stagewiseConfig} />
          )}
        </Providers>
      </body>
    </html>
  );
}