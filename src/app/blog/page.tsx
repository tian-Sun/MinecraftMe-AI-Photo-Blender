import { Metadata } from 'next';
import BlogCard from '@/components/BlogCard';
import Footer from '@/components/Footer';
import { getBlogPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog - MinecraftStyle.online',
  description: 'Discover tips, tutorials, and insights about creating Minecraft style art with AI',
  openGraph: {
    title: 'Blog - MinecraftStyle.online',
    description: 'Discover tips, tutorials, and insights about creating Minecraft style art with AI',
    type: 'website',
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#22223b] mb-4">
            Minecraft Style Blog
          </h1>
          <p className="text-lg text-[#a259ff] max-w-2xl mx-auto">
            Discover tips, tutorials, and insights about creating stunning Minecraft style art with our AI-powered tools
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blog posts available yet.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
} 