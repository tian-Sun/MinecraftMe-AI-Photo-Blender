export type Language = 'en' | 'zh';

export const languages: Record<Language, string> = {
  en: 'English',
  zh: '中文',
};

export const translations = {
  en: {
    nav: {
      features: 'Features',
      pricing: 'Pricing',
      signIn: 'Sign In',
    },
    hero: {
      badge: '2025 🎉 Free Minecraft Style AI Image Generator Now Available',
      title: 'Step into the Minecraft World — With Your Own Photo',
      titleHighlight: 'Free',
      description: `Transform your photos into enchanting Minecraft-style artwork with our free AI image generator. Experience the magic of Minecraft\'s art style powered by advanced AI technology.`,
      cta: 'Click To Generate Minecraft-Style Now!',
    },
  },
  zh: {
    nav: {
      features: '功能',
      pricing: '价格',
      signIn: '登录',
    },
    hero: {
      badge: 'AI驱动',
      title: '将您的照片转换为',
      titleHighlight: 'Minecraft 风格艺术',
      description: '使用我们的 AI 工具，将您的照片转换为独特的 Minecraft 风格像素艺术。只需上传照片，让 AI 为您创造魔法！',
      cta: '立即体验',
      before: '原图',
      after: '效果图',
    },
  },
}; 