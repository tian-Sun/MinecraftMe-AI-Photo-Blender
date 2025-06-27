import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { getUserUsage, createUserUsage, updateUserUsage, getUserSubscription, updateUserSubscriptionCredits } from '@/lib/supabase';

const DAILY_USAGE_LIMIT = 1;

function getTodayKey(): string {
  return new Date().toISOString().split('T')[0];
}

function getTimeLeft() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const diff = tomorrow.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return { hours, minutes };
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userEmail = session.user.email;
    const todayKey = getTodayKey();
    
    // 检查用户是否有付费订阅
    const subscription = await getUserSubscription(userEmail);
    
    if (subscription && subscription.credits > 0) {
      // 付费用户：返回剩余积分
      return NextResponse.json({
        remainingGenerations: subscription.credits,
        isPaidUser: true,
        planId: subscription.plan_id,
        dailyLimit: subscription.credits,
      });
    } else {
      // 免费用户：使用每日限制
      let userUsage = await getUserUsage(userEmail, todayKey);
      
      if (!userUsage) {
        userUsage = await createUserUsage(userEmail, todayKey);
        if (!userUsage) {
          return NextResponse.json({ error: 'Failed to create user usage record' }, { status: 500 });
        }
      }

      const remainingGenerations = Math.max(0, DAILY_USAGE_LIMIT - userUsage.usage_count);
      const timeLeft = getTimeLeft();

      return NextResponse.json({
        remainingGenerations,
        isPaidUser: false,
        hours: timeLeft.hours,
        minutes: timeLeft.minutes,
        dailyLimit: DAILY_USAGE_LIMIT,
      });
    }
  } catch (error) {
    console.error('GET /api/remaining error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userEmail = session.user.email;
    const todayKey = getTodayKey();
    
    // 检查用户是否有付费订阅
    const subscription = await getUserSubscription(userEmail);
    
    if (subscription && subscription.credits > 0) {
      // 付费用户：扣除积分
      const newCredits = subscription.credits - 1;
      
      // 更新数据库中的积分
      const updateResult = await updateUserSubscriptionCredits(userEmail, newCredits);
      
      if (!updateResult.success) {
        console.error('Failed to update subscription credits:', updateResult.error);
        return NextResponse.json({ error: 'Failed to update credits' }, { status: 500 });
      }
      
      return NextResponse.json({ 
        success: true, 
        remainingGenerations: newCredits,
        isPaidUser: true
      });
    } else {
      // 免费用户：使用每日限制
      let userUsage = await getUserUsage(userEmail, todayKey);
      
      if (!userUsage) {
        userUsage = await createUserUsage(userEmail, todayKey);
        if (!userUsage) {
          return NextResponse.json({ error: 'Failed to create user usage record' }, { status: 500 });
        }
      }

      // 检查是否还有剩余次数
      if (userUsage.usage_count >= DAILY_USAGE_LIMIT) {
        return NextResponse.json({ error: 'Daily limit exceeded' }, { status: 429 });
      }

      // 增加使用次数
      const newCount = userUsage.usage_count + 1;
      const success = await updateUserUsage(userEmail, todayKey, newCount);
      
      if (!success) {
        return NextResponse.json({ error: 'Failed to update usage count' }, { status: 500 });
      }

      return NextResponse.json({ 
        success: true, 
        remainingGenerations: Math.max(0, DAILY_USAGE_LIMIT - newCount),
        isPaidUser: false
      });
    }
  } catch (error) {
    console.error('POST /api/remaining error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 