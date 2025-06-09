'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Globe, User, LogOut } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { languages, Language } from '@/lib/i18n';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  
  // 获取用户剩余使用次数
  const { data: usageData } = useSWR(
    session ? '/api/remaining' : null,
    fetcher,
    {
      refreshInterval: 0,
      revalidateOnFocus: true,
    }
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              scroll={false}
              onClick={e => {
                if (pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex items-center space-x-2 cursor-pointer select-none"
              aria-label="Go to homepage"
            >
              <Image
                src="/logo.png"
                alt="MinecraftStyle.online"
                width={32}
                height={32}
                className="rounded-md"
              />
              <span className="text-xl font-bold text-foreground">MinecraftStyle.online</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#feature"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.nav.features}
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.nav.pricing}
            </a>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* 用户状态显示 */}
            {status === 'loading' ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
            ) : session ? (
              <div className="flex items-center space-x-3">
                {/* 显示剩余使用次数 */}
                {usageData && (
                  <div className="hidden sm:flex text-sm text-gray-600">
                    <span className="font-medium text-purple-600">
                      {usageData.remainingGenerations}
                    </span>
                    <span className="ml-1">uses left today</span>
                  </div>
                )}
                
                {/* 用户头像和菜单 */}
                <div className="flex items-center space-x-2">
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="User avatar"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => signOut()}
                    className="hidden sm:flex"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="outline" className="hidden sm:inline-flex">
                  {t.nav.signIn}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
