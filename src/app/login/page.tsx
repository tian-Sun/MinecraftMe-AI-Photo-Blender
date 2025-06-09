'use client';

import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        router.push('/');
      }
    };
    
    checkSession();
  }, [router]);

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.login.title}</h2>
          <p className="text-gray-600">{t.login.subtitle}</p>
        </div>
        
        <div className="mt-8">
          <button
            onClick={handleGoogleSignIn}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md hover:shadow-lg transition-all duration-200 border-gray-300"
          >
            <div className="flex items-center">
              <Image
                src="/google.png"
                alt="Google"
                width={20}
                height={20}
                className="mr-3"
              />
              {t.login.googleButton}
            </div>
          </button>
        </div>
        
        <div className="text-center text-sm text-gray-500">
          {t.login.terms}
        </div>

        <div className="text-center">
          <button
            onClick={() => router.push('/')}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            {t.login.backToHome}
          </button>
        </div>
      </div>
    </div>
  );
} 