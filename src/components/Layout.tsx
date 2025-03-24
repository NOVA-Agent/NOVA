import React, { ReactNode } from 'react';
import Link from 'next/link';
import { BellIcon, MenuIcon } from '@heroicons/react/24/outline';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
        {/* Left Logo */}
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-purple-400">
            NOVA
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <a href="/" className="font-medium hover:text-purple-400 transition-colors">Home</a>
          <a href="/trading" className="font-medium text-purple-400 border-b-2 border-purple-400 pb-1">Trading</a>
          <a href="/dashboard" className="font-medium hover:text-purple-400 transition-colors">Dashboard</a>
          <a href="/ai-analyst" className="font-medium hover:text-purple-400 transition-colors">AI Analyst</a>
          <a href="/strategy-builder" className="font-medium hover:text-purple-400 transition-colors">Strategy Builder</a>
          <a href="/marketplace" className="font-medium hover:text-purple-400 transition-colors">Market</a>
        </div>

        {/* Right User Area */}
        <div className="flex items-center space-x-4">
          {/* Notification Icon */}
          <button className="p-2 hover:bg-gray-800 rounded-full">
            <BellIcon className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>

          {/* Wallet Button */}
          <button className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg transition-colors">
            Connect Wallet
          </button>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 hover:bg-gray-800 rounded-full">
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
      
      {/* Page Footer */}
      <footer className="bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img src="/logo.svg" alt="NOVA" className="h-8 w-8 mr-2" />
                <span className="text-xl font-bold text-purple-500">NOVA</span>
              </div>
              <p className="text-gray-400 mb-4">
                AI-driven Solana trading platform, making trading smarter and more efficient.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-purple-400">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-4">Products</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-purple-400">Trading Terminal</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">AI Analyst</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">Strategy Builder</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">Token Information</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-purple-400">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">Market Data</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-purple-400">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">Career Opportunities</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2023 NOVA. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-purple-400">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-purple-400">Service Terms</a>
              <a href="#" className="text-gray-400 hover:text-purple-400">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 