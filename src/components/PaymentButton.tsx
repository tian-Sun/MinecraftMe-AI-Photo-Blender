"use client";

import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PaymentPlan } from '@/types/payment';

interface PaymentButtonProps {
  plan: PaymentPlan;
  className?: string;
  children?: React.ReactNode;
}

export default function PaymentButton({ plan, className = "", children }: PaymentButtonProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // 检查是否需要自动发起支付
  useEffect(() => {
    const shouldAutoPay = searchParams.get('autoPay') === plan.id;
    if (shouldAutoPay && session?.user?.email && !isLoading) {
      handlePayment();
    }
  }, [session, searchParams, plan.id]);

  const handlePayment = async () => {
    // 如果是免费版本，直接跳转到主页面
    if (plan.id === 'free') {
      window.location.href = '/';
      return;
    }

    if (!session?.user?.email) {
      // 未登录，跳转到登录页面，并设置回调参数
      signIn('google', {
        callbackUrl: `/?autoPay=${plan.id}`
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/subscription/get-payment-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: plan.id,
          userEmail: session.user.email,
          returnUrl: `${window.location.origin}/payment-success?plan=${plan.id}`
        }),
      });

      const data = await response.json();
      
      if (data.success && data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        throw new Error(data.error || 'Failed to create payment link');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const buttonText = () => {
    if (isLoading) return 'Processing...';
    if (status === 'loading') return 'Loading...';
    if (plan.id === 'free') return 'Try Free';
    if (!session) return `Login & Get ${plan.name}`;
    return children || `Get ${plan.name}`;
  };

  const isDisabled = isLoading || status === 'loading';

  return (
    <button
      onClick={handlePayment}
      disabled={isDisabled}
      className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
        isDisabled
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : plan.id === 'free'
          ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800'
          : plan.popular
          ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-xl'
          : 'bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50'
      } ${className}`}
    >
      {buttonText()}
    </button>
  );
} 