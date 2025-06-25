import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  coverImage: string;
  tags?: string[];
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export async function getBlogPosts(): Promise<BlogPost[]> {
  // 确保只在服务端运行
  if (typeof window !== 'undefined') {
    return [];
  }

  // 确保目录存在
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        return await getBlogPost(slug);
      })
  );

  // 按日期排序，最新的在前
  return allPostsData
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  // 确保只在服务端运行
  if (typeof window !== 'undefined') {
    return null;
  }

  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // 使用remark将Markdown转换为HTML
    const processedContent = await remark()
      .use(html)
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      coverImage: data.coverImage,
      tags: data.tags || [],
      content: contentHtml,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

export async function getLatestBlogPosts(count: number = 3): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  return posts.slice(0, count);
} 