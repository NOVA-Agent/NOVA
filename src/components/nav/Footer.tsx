import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaTwitter, FaGithub, FaTelegram } from 'react-icons/fa';

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Trading Terminal', href: '/trading' },
      { label: 'AI Analyst', href: '/ai-analyst' },
      { label: 'Strategy Builder', href: '/strategy' },
      { label: 'Portfolio Manager', href: '/portfolio' },
      { label: 'Learning Center', href: '/learn' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'API Reference', href: '/docs/api' },
      { label: 'Status', href: '/status' },
      { label: 'Support', href: '/support' },
      { label: 'Changelog', href: '/changelog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Security', href: '/security' },
      { label: 'Risk Disclosure', href: '/risk-disclosure' },
    ],
  },
];

const socialLinks = [
  { icon: <FaTwitter className="w-5 h-5" />, href: 'https://x.com/NOVA_AIC', label: 'Twitter' },
  { icon: <FaGithub className="w-5 h-5" />, href: 'https://github.com/NOVA-Agent', label: 'GitHub' },
  { icon: <FaTelegram className="w-5 h-5" />, href: 'https://t.me/nova_official', label: 'Telegram' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-400 border-t border-dark-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo and Social */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <Image
                  src="/logo.svg"
                  alt="NOVA Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-white">NOVA</span>
            </Link>
            
            <p className="mt-4 text-gray-400 text-sm">
              AI-powered trading assistant built on the Solana blockchain, providing actionable market intelligence and automated trading capabilities.
            </p>
            
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-primary-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-dark-300 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} NOVA. All rights reserved.
          </p>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <span className="text-gray-400 text-sm">
              Built on <a href="https://solana.com" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">Solana</a>
            </span>
            <span className="h-4 w-px bg-dark-300"></span>
            <span className="text-gray-400 text-sm">
              <Link href="/" className="text-primary-400 hover:text-primary-300">www.novas.today</Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}; 