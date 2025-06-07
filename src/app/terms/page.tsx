import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | MinecraftStyle.online',
  description: 'Read the Terms of Service for MinecraftStyle.online, the AI-powered Minecraft-style image generator.',
};

export default function TermsPage() {
  return (
    <main className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4 text-muted-foreground">
        Welcome to MinecraftStyle.online. By accessing or using our AI image generation service, you agree to the following terms and conditions. Please read them carefully.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">1. Use of Service</h2>
      <p className="mb-4">You may use our service for personal, non-commercial purposes only. Do not use the service for any unlawful or harmful activities.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">2. Intellectual Property</h2>
      <p className="mb-4">All content, including generated images, website design, and text, is owned by MinecraftStyle.online or its licensors. You may not reproduce, distribute, or create derivative works without permission.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">3. User Content</h2>
      <p className="mb-4">You retain ownership of any images you upload. By uploading, you grant us a license to process and display your images for the purpose of providing the service.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">4. Disclaimer</h2>
      <p className="mb-4">Our service is provided "as is" without warranties of any kind. We do not guarantee uninterrupted or error-free operation.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">5. Changes to Terms</h2>
      <p className="mb-4">We may update these terms from time to time. Continued use of the service constitutes acceptance of the new terms.</p>
      <p className="mt-8 text-sm text-muted-foreground">If you have any questions about these Terms, please contact us at support@minecraftstyle.online.</p>
    </main>
  );
} 