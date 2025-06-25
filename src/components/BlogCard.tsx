import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <time className="text-sm text-gray-500">
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
        
        <h3 className="text-xl font-semibold text-[#22223b] mb-2 group-hover:text-purple-600 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-gray-600 text-sm line-clamp-3">
          {post.description}
        </p>
        
        <div className="mt-4 flex items-center text-purple-600 text-sm font-medium group-hover:text-purple-700 transition-colors">
          Read More
          <svg
            className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform"
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
        </div>
      </div>
    </Link>
  );
} 