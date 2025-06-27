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

export interface UserSubscription {
  id?: number;
  user_email: string;
  plan_id: string;
  credits: number;
  status: 'active' | 'expired' | 'cancelled';
  order_id?: string;
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

// 获取用户订阅信息
export async function getUserSubscription(userEmail: string): Promise<UserSubscription | null> {
  if (!isSupabaseConfigured) {
    // 开发环境默认给Premium订阅
    return {
      user_email: userEmail,
      plan_id: 'premium',
      credits: 100,
      status: 'active'
    };
  }

  const { data, error } = await supabase!
    .from('user_subscriptions')
    .select('*')
    .eq('user_email', userEmail)
    .eq('status', 'active')
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching user subscription:', error);
    return null;
  }

  return data;
}

// 创建或更新用户订阅
export async function createOrUpdateUserSubscription(params: {
  email: string;
  planId: string;
  credits: number;
  orderId?: string;
}): Promise<{ success: boolean; error?: string }> {
  const { email, planId, credits, orderId } = params;

  if (!isSupabaseConfigured) {
    console.log('✅ Supabase not configured, subscription created in memory');
    return { success: true };
  }

  try {
    // 首先检查是否已有活跃订阅
    const existingSubscription = await getUserSubscription(email);
    
    if (existingSubscription) {
      // 更新现有订阅的积分
      const { error } = await supabase!
        .from('user_subscriptions')
        .update({
          credits: existingSubscription.credits + credits,
          updated_at: new Date().toISOString()
        })
        .eq('user_email', email)
        .eq('status', 'active');

      if (error) {
        console.error('Error updating subscription:', error);
        return { success: false, error: error.message };
      }
    } else {
      // 创建新订阅
      const { error } = await supabase!
        .from('user_subscriptions')
        .insert([{
          user_email: email,
          plan_id: planId,
          credits: credits,
          status: 'active',
          order_id: orderId
        }]);

      if (error) {
        console.error('Error creating subscription:', error);
        return { success: false, error: error.message };
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected error in createOrUpdateUserSubscription:', error);
    return { success: false, error: 'Unexpected error occurred' };
  }
}

// 更新用户订阅积分
export async function updateUserSubscriptionCredits(
  userEmail: string, 
  newCredits: number
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    console.log('✅ Supabase not configured, credits updated in memory');
    return { success: true };
  }

  try {
    const { error } = await supabase!
      .from('user_subscriptions')
      .update({
        credits: newCredits,
        updated_at: new Date().toISOString()
      })
      .eq('user_email', userEmail)
      .eq('status', 'active');

    if (error) {
      console.error('Error updating subscription credits:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected error in updateUserSubscriptionCredits:', error);
    return { success: false, error: 'Unexpected error occurred' };
  }
} 