import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { ConnectWalletButton } from '@/components/solana/ConnectWalletButton';

interface NavItemProps {
  href: string;
  label: string;
  isActive?: boolean;
  hasDropdown?: boolean;
  children?: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ 
  href, 
  label, 
  isActive = false, 
  hasDropdown = false, 
  children 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleToggle = () => {
    if (hasDropdown) {
      setIsOpen(!isOpen);
    }
  };
  
  return (
    <div className="relative">
      <Link
        href={href}
        className={`px-4 py-2 rounded-md font-medium hover:text-primary-300 transition-colors ${
          isActive ? 'text-primary-400' : 'text-gray-200'
        } ${hasDropdown ? 'cursor-pointer flex items-center gap-1' : ''}`}
        onClick={handleToggle}
      >
        {label}
        {hasDropdown && (
          <FaChevronDown 
            className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          />
        )}
      </Link>
      
      {hasDropdown && isOpen && (
        <div className="absolute top-full left-0 mt-2 py-2 w-48 bg-dark-300 rounded-md shadow-lg z-10 border border-dark-200">
          {children}
        </div>
      )}
    </div>
  );
};

export const MainNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <nav className="bg-dark-400 border-b border-dark-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
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
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <NavItem href="/trading" label="Trading Terminal" />
            <NavItem href="/ai-analyst" label="AI Analyst" />
            <NavItem href="/strategy-builder" label="Strategy Builder" />
            <NavItem href="/portfolio" label="Portfolio" />
            <NavItem 
              href="#" 
              label="Learn" 
              hasDropdown={true}
            >
              <Link href="/learn/academy" className="block px-4 py-2 text-sm text-gray-200 hover:bg-dark-200 hover:text-primary-300">
                Academy
              </Link>
              <Link href="/learn/docs" className="block px-4 py-2 text-sm text-gray-200 hover:bg-dark-200 hover:text-primary-300">
                Documentation
              </Link>
              <Link href="/learn/community" className="block px-4 py-2 text-sm text-gray-200 hover:bg-dark-200 hover:text-primary-300">
                Community
              </Link>
            </NavItem>
          </div>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <ConnectWalletButton />
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="text-gray-400 hover:text-white focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-dark-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/trading"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-dark-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Trading Terminal
            </Link>
            <Link
              href="/ai-analyst"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-dark-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              AI Analyst
            </Link>
            <Link
              href="/strategy-builder"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-dark-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Strategy Builder
            </Link>
            <Link
              href="/portfolio"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-dark-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link
              href="/learn/academy"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-dark-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Learn
            </Link>
          </div>
          
          <div className="pt-4 pb-3 border-t border-dark-400">
            <div className="px-5 flex items-center">
              <ConnectWalletButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}; 