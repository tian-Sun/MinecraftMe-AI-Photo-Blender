"use client";

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// 动态导入避免SSR问题
const PaymentSuccessContent = dynamic(() => import('./PaymentSuccessContent'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <div className="w-8 h-8 bg-green-300 rounded-full animate-pulse"></div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h1>
        <p className="text-gray-600">Processing your payment information...</p>
      </div>
    </div>
  )
});

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-8 h-8 bg-green-300 rounded-full animate-pulse"></div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h1>
          <p className="text-gray-600">Processing your payment information...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
} 