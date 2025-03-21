import React from 'react';
import { Inter, Roboto_Mono } from 'next/font/google';
import '../globals.css';
import { WalletProvider } from '@/components/providers/WalletProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Toaster } from '@/components/ui/Toaster';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
});

export const metadata = {
  title: 'NOVA - AI Trading Assistant Based on Solana',
  description: 'AI-powered trading assistant built on the Solana blockchain, providing actionable market intelligence, automated trading capabilities, and portfolio management tools.',
  keywords: ['Solana', 'Trading', 'AI', 'DeFi', 'Cryptocurrency', 'Blockchain', 'Trading Terminal'],
  authors: [{ name: 'NOVA Team' }],
  creator: 'NOVA',
  publisher: 'NOVA',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.novas.today'),
  openGraph: {
    title: 'NOVA - AI Trading Assistant Based on Solana',
    description: 'AI-powered trading assistant built on the Solana blockchain, providing actionable market intelligence, automated trading capabilities, and portfolio management tools.',
    url: 'https://www.novas.today',
    siteName: 'NOVA',
    images: [
      {
        url: 'https://www.novas.today/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOVA - AI Trading Assistant Based on Solana',
    description: 'AI-powered trading assistant built on the Solana blockchain, providing actionable market intelligence, automated trading capabilities, and portfolio management tools.',
    creator: '@NOVA_AIC',
    images: ['https://www.novas.today/twitter-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable}`}>
      <body className="min-h-screen bg-dark-500 text-white font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <WalletProvider>
            {children}
            <Toaster />
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 