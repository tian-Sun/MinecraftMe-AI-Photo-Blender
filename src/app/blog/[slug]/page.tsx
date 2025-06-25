import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Footer from '@/components/Footer';
import { getBlogPost, getBlogPosts } from '@/lib/blog';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - MinecraftStyle.online Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.coverImage],
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex flex-col">
      <div className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          {/* Cover Image */}
          <div className="relative w-full h-56 md:h-80 rounded-lg overflow-hidden mb-8 shadow-md">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Title & Meta */}
          <h1 className="text-3xl md:text-4xl font-bold text-[#22223b] mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-8">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            {post.description}
          </p>

          {/* Article Body */}
          <article className="prose prose-lg prose-purple max-w-none bg-white/90 rounded-xl p-6 md:p-10 shadow-lg mb-12 !leading-loose [&_p]:mb-6 [&_ul]:mb-6 [&_ol]:mb-6 [&_li]:mb-2">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </div>
      </div>
      <Footer />
    </div>
  );
} 