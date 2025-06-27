import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { getUserSubscription } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userEmail = session.user.email;
    const subscription = await getUserSubscription(userEmail);

    return NextResponse.json({
      userEmail,
      subscription,
      hasSubscription: !!subscription,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Debug subscription error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 