import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://minecraftstyle.online'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/auth/',  // 禁止爬取认证相关API
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
} 