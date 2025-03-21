import React from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { FaExchangeAlt, FaRobot, FaBrain, FaChartLine, FaWallet } from 'react-icons/fa';
import Image from 'next/image';

export default function HomePage() {
  const features = [
    {
      icon: <FaExchangeAlt className="w-8 h-8 text-purple-500" />,
      title: 'Trading Terminal',
      description: 'Professional trading interface with multiple order types and advanced chart analysis',
      link: '/trading',
      color: 'from-purple-500 to-indigo-600',
    },
    {
      icon: <FaRobot className="w-8 h-8 text-blue-500" />,
      title: 'AI Market Analyst',
      description: 'Use artificial intelligence to analyze market trends, sentiment and news to predict price movements',
      link: '/ai-analyst',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: <FaBrain className="w-8 h-8 text-green-500" />,
      title: 'Strategy Builder',
      description: 'Create and backtest custom trading strategies through a visual interface without coding',
      link: '/strategy-builder',
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: <FaChartLine className="w-8 h-8 text-red-500" />,
      title: 'Portfolio Management',
      description: 'Comprehensive portfolio tracking and analysis tools for optimizing asset allocation',
      link: '/portfolio',
      color: 'from-red-500 to-pink-600',
    },
    {
      icon: <FaWallet className="w-8 h-8 text-amber-500" />,
      title: 'Wallet Connection',
      description: 'Securely connect your Solana wallet for seamless trading and asset management',
      link: '/wallet',
      color: 'from-amber-500 to-orange-600',
    },
  ];

  return (
    <Layout>
      <div className="relative overflow-hidden">
        {/* Main Banner */}
        <div className="relative pt-6 pb-16 sm:pb-24">
          <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-100 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">NOVA AI</span>{' '}
                <span className="block text-purple-500">Next-Gen Trading Platform</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Combining artificial intelligence, visual strategy building, and advanced trading tools to provide comprehensive support for traders in the crypto market
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Start Trading
                  </a>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Features Section */}
        <div className="relative bg-gray-900 py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
            <h2 className="text-base font-semibold tracking-wider text-indigo-400 uppercase">FEATURES</h2>
            <p className="mt-2 text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
              Powerful Trading Features
            </p>
            <p className="mt-5 max-w-prose mx-auto text-xl text-gray-300">
              A comprehensive toolkit to meet the needs of everyone from beginners to professional traders
            </p>
            <div className="mt-10">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => (
                  <Link key={index} href={feature.link} className="group">
                    <div className="flex flex-col h-full bg-gray-800 overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]">
                      <div className={`p-6 bg-gradient-to-r ${feature.color}`}>
                        <div className="inline-flex items-center justify-center rounded-md bg-white bg-opacity-10 p-3">
                          {feature.icon}
                        </div>
                      </div>
                      <div className="px-6 py-4 flex-1">
                        <h3 className="text-lg font-medium text-white">{feature.title}</h3>
                        <p className="mt-3 text-base text-gray-300">{feature.description}</p>
                      </div>
                      <div className="px-6 pb-4">
                        <div className="group-hover:bg-opacity-80 group-hover:text-indigo-400 flex items-center text-sm font-medium text-indigo-300 transition">
                          Learn more
                          <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Market Data */}
        <div className="relative bg-black py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white text-center mb-8">Real-time Market Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Content would go here */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 