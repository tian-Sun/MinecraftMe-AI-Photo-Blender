import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 检查 Supabase 是否配置
export const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

// 内存存储回退（当 Supabase 未配置时使用）
const memoryStorage: Record<string, { count: number; date: string }> = {};

// 数据库表接口
export interface UserUsage {
  id?: number;
  user_email: string;
  usage_count: number;
  usage_date: string;
  created_at?: string;
  updated_at?: string;
}

// 获取或创建用户使用记录
export async function getUserUsage(userEmail: string, date: string): Promise<UserUsage | null> {
  if (!isSupabaseConfigured) {
    // 使用内存存储
    const key = `${userEmail}_${date}`;
    if (!memoryStorage[key] || memoryStorage[key].date !== date) {
      memoryStorage[key] = { count: 0, date };
    }
    return {
      user_email: userEmail,
      usage_count: memoryStorage[key].count,
      usage_date: date,
    };
  }

  const { data, error } = await supabase!
    .from('user_usage')
    .select('*')
    .eq('user_email', userEmail)
    .eq('usage_date', date)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
    console.error('Error fetching user usage:', error);
    return null;
  }

  return data;
}

// 创建用户使用记录
export async function createUserUsage(userEmail: string, date: string): Promise<UserUsage | null> {
  if (!isSupabaseConfigured) {
    // 使用内存存储
    const key = `${userEmail}_${date}`;
    memoryStorage[key] = { count: 0, date };
    return {
      user_email: userEmail,
      usage_count: 0,
      usage_date: date,
    };
  }

  const { data, error } = await supabase!
    .from('user_usage')
    .insert([
      {
        user_email: userEmail,
        usage_count: 0,
        usage_date: date,
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating user usage:', error);
    return null;
  }

  return data;
}

// 更新用户使用次数
export async function updateUserUsage(userEmail: string, date: string, newCount: number): Promise<boolean> {
  if (!isSupabaseConfigured) {
    // 使用内存存储
    const key = `${userEmail}_${date}`;
    if (memoryStorage[key]) {
      memoryStorage[key].count = newCount;
    }
    return true;
  }

  const { error } = await supabase!
    .from('user_usage')
    .update({ usage_count: newCount, updated_at: new Date().toISOString() })
    .eq('user_email', userEmail)
    .eq('usage_date', date);

  if (error) {
    console.error('Error updating user usage:', error);
    return false;
  }

  return true;
} 