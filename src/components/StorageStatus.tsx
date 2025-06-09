'use client';

import { isSupabaseConfigured } from '@/lib/supabase';

export default function StorageStatus() {
  if (process.env.NODE_ENV !== 'development') {
    return null; // 仅在开发环境显示
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`px-3 py-2 rounded-lg text-sm font-medium ${
        isSupabaseConfigured 
          ? 'bg-green-100 text-green-800 border border-green-200' 
          : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
      }`}>
        {isSupabaseConfigured ? (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>数据库已连接</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>使用临时存储</span>
          </div>
        )}
      </div>
    </div>
  );
} 