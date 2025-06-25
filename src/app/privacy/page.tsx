import type { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | MinecraftStyle.online',
  description: 'Read the Privacy Policy for MinecraftStyle.online, the AI-powered Minecraft-style image generator.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4 text-muted-foreground">
          Your privacy is important to us. This policy explains how MinecraftStyle.online collects, uses, and protects your information.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">1. Information We Collect</h2>
        <p className="mb-4">We collect images you upload and basic usage data to improve our service. We do not collect personal identification information unless you provide it voluntarily.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">2. Use of Information</h2>
        <p className="mb-4">Uploaded images are used solely for generating Minecraft-style artwork and are not shared with third parties. Usage data helps us enhance our platform.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">3. Data Security</h2>
        <p className="mb-4">We implement reasonable security measures to protect your data. However, no method of transmission over the Internet is 100% secure.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">4. Third-Party Services</h2>
        <p className="mb-4">We may use third-party services for analytics or hosting. These providers have their own privacy policies.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">5. Changes to This Policy</h2>
        <p className="mb-4">We may update this Privacy Policy from time to time. Please review this page periodically for changes.</p>
        <p className="mt-8 text-sm text-muted-foreground">If you have any questions about this Privacy Policy, please contact us at wendy.1031ht@gmail.com.</p>
      </div>
      <Footer />
    </div>
  );
} 