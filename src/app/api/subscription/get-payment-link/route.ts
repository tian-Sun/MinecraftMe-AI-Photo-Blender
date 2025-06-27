import { NextRequest, NextResponse } from 'next/server';
import { PLANS, DODOPAYMENT_CONFIG } from '@/lib/config';

export async function POST(request: NextRequest) {
  try {
    const { planId, userEmail, returnUrl } = await request.json();

    if (!planId || !userEmail) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const plan = PLANS[planId];
    if (!plan) {
      return NextResponse.json(
        { success: false, error: 'Invalid plan ID' },
        { status: 400 }
      );
    }

    // 获取对应的支付链接（现在只有premium）
    const paymentUrl = DODOPAYMENT_CONFIG.premiumPaymentLink;

    // 在实际的DodoPayment集成中，你需要调用他们的API来创建支付会话
    // 这里为了演示，直接返回配置的链接
    const paymentUrlWithParams = `${paymentUrl}?email=${encodeURIComponent(userEmail)}&plan=${planId}&return_url=${encodeURIComponent(returnUrl || '')}`;

    return NextResponse.json({
      success: true,
      paymentUrl: paymentUrlWithParams,
      plan: {
        id: plan.id,
        name: plan.name,
        price: plan.price,
        credits: plan.credits
      }
    });

  } catch (error) {
    console.error('Payment link generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 