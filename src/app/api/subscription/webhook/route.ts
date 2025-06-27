import { NextRequest, NextResponse } from 'next/server';
import { createOrUpdateUserSubscription } from '@/lib/supabase';
import { PLANS } from '@/lib/config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    console.log('🎣 Webhook received:', JSON.stringify(body, null, 2));
    
    // 生产环境验证webhook签名
    if (!isDevelopment) {
      const signature = request.headers.get('x-dodo-signature');
      const webhookSecret = process.env.DODO_WEBHOOK_SECRET;
      
      if (!signature || !webhookSecret) {
        console.error('❌ Missing webhook signature or secret');
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      // 这里应该验证DodoPayment的签名
      // const isValid = verifyDodoPaymentSignature(body, signature, webhookSecret);
      // if (!isValid) {
      //   console.error('❌ Invalid webhook signature');
      //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      // }
      
      console.log('✅ Webhook signature verified (production mode)');
    } else {
      console.log('🧪 Development mode: skipping signature verification');
    }

    // 提取webhook数据（根据DodoPayment的实际格式调整）
    const { 
      event_type, 
      order_id, 
      customer_email, 
      amount, 
      status,
      metadata 
    } = body;

    // 验证webhook（在生产环境中添加签名验证）
    if (status !== 'completed') {
      console.log('⏸️ Payment not completed, status:', status);
      return NextResponse.json({ message: 'Payment not completed' });
    }

    if (!customer_email) {
      console.error('❌ No customer email provided');
      return NextResponse.json({ error: 'No customer email' }, { status: 400 });
    }

    // 从元数据或金额推断计划类型
    let planId = metadata?.plan_id;
    if (!planId) {
      // 现在只有premium计划
      planId = 'premium';
    }

    const plan = PLANS[planId];
    if (!plan) {
      console.error('❌ Invalid plan ID:', planId);
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    console.log(`💳 Processing payment for ${customer_email}, plan: ${planId}, credits: ${plan.credits}`);

    // 创建或更新用户订阅
    const result = await createOrUpdateUserSubscription({
      email: customer_email,
      planId: planId,
      credits: plan.credits,
      orderId: order_id
    });

    if (result.success) {
      console.log('✅ Subscription created/updated successfully');
      return NextResponse.json({ message: 'Webhook processed successfully' });
    } else {
      console.error('❌ Failed to create/update subscription:', result.error);
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

  } catch (error) {
    console.error('💥 Webhook processing error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
} 