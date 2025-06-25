import Link from 'next/link';
import Image from 'next/image';
import { getLatestBlogPosts } from '@/lib/blog';

export default async function BlogPreview() {
  const posts = await getLatestBlogPosts(3);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#22223b] mb-4">
            Latest Blog Posts
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover tips, tutorials, and insights about creating stunning Minecraft style art with our AI-powered tools
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {posts.map((post) => (
            <div key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <time>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                    {post.tags && post.tags.length > 0 && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                        {post.tags[0]}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-[#22223b] group-hover:text-purple-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {post.description}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            View All Posts
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
} 