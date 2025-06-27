"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PLANS } from '@/lib/config';
import { PaymentPlan } from '@/types/payment';

export default function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState<number>(5);
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);
  
  const planId = searchParams.get('plan') || 'premium';
  const plan: PaymentPlan = PLANS[planId] || PLANS.premium;

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev: number) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShouldRedirect(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (shouldRedirect) {
      router.push('/');
    }
  }, [shouldRedirect, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Payment Successful! 🎉
        </h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for your purchase! Your <strong>{plan.name}</strong> plan has been activated.
        </p>

        {/* Plan Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Plan:</span>
            <span className="font-semibold text-gray-900">{plan.name}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Credits:</span>
            <span className="font-semibold text-purple-600">{plan.credits}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Amount:</span>
            <span className="font-semibold text-gray-900">${plan.price}</span>
          </div>
        </div>

        {/* Auto Redirect Info */}
        <p className="text-sm text-gray-500 mb-6">
          You will be redirected to the homepage in <strong>{countdown}</strong> seconds.
        </p>

        {/* Action Button */}
        <button
          onClick={() => router.push('/')}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-200"
        >
          Start Creating Now
        </button>

        {/* Support Info */}
        <p className="text-xs text-gray-400 mt-4">
          Need help? Contact us at support@minecraftstyle.online
        </p>
      </div>
    </div>
  );
} 