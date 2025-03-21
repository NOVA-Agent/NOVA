import React from 'react';
import Layout from '@/components/Layout';
import TokenSelector from '@/components/trading/TokenSelector';
import { mockAnalysisReport } from '@/modules/ai-analyst/mockData';

export default function AIAnalystPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col space-y-6">
          {/* Header with token selector */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">AI Market Analyst</h1>
            <div className="w-64">
              <TokenSelector />
            </div>
          </div>

          {/* Analysis summary */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Analysis Summary</h2>
            <p className="text-gray-300 mb-4">{mockAnalysisReport.summary}</p>
            
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Technical Analysis:</span>
                <span className={`font-semibold ${
                  mockAnalysisReport.technicalAnalysis.rating === 'strong_buy' || 
                  mockAnalysisReport.technicalAnalysis.rating === 'buy' ? 
                  'text-green-400' : 
                  mockAnalysisReport.technicalAnalysis.rating === 'sell' || 
                  mockAnalysisReport.technicalAnalysis.rating === 'strong_sell' ? 
                  'text-red-400' : 'text-yellow-400'
                }`}>
                  {mockAnalysisReport.technicalAnalysis.rating.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Fundamental Analysis:</span>
                <span className={`font-semibold ${
                  mockAnalysisReport.fundamentalAnalysis.rating === 'strong_buy' || 
                  mockAnalysisReport.fundamentalAnalysis.rating === 'buy' ? 
                  'text-green-400' : 
                  mockAnalysisReport.fundamentalAnalysis.rating === 'sell' || 
                  mockAnalysisReport.fundamentalAnalysis.rating === 'strong_sell' ? 
                  'text-red-400' : 'text-yellow-400'
                }`}>
                  {mockAnalysisReport.fundamentalAnalysis.rating.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Sentiment Analysis:</span>
                <span className={`font-semibold ${
                  mockAnalysisReport.sentimentAnalysis.rating === 'positive' || 
                  mockAnalysisReport.sentimentAnalysis.rating === 'very_positive' ? 
                  'text-green-400' : 
                  mockAnalysisReport.sentimentAnalysis.rating === 'negative' || 
                  mockAnalysisReport.sentimentAnalysis.rating === 'very_negative' ? 
                  'text-red-400' : 'text-yellow-400'
                }`}>
                  {mockAnalysisReport.sentimentAnalysis.rating.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Technical Analysis */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <h2 className="text-xl font-semibold text-white mb-4">Technical Analysis</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-gray-400 font-medium mb-2">Indicators</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Moving Averages</span>
                        <span className={`font-medium ${
                          mockAnalysisReport.technicalAnalysis.indicators.moving_averages === 'bullish' ? 
                          'text-green-400' : 
                          mockAnalysisReport.technicalAnalysis.indicators.moving_averages === 'bearish' ? 
                          'text-red-400' : 'text-yellow-400'
                        }`}>
                          {mockAnalysisReport.technicalAnalysis.indicators.moving_averages.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Oscillators</span>
                        <span className={`font-medium ${
                          mockAnalysisReport.technicalAnalysis.indicators.oscillators === 'bullish' ? 
                          'text-green-400' : 
                          mockAnalysisReport.technicalAnalysis.indicators.oscillators === 'bearish' ? 
                          'text-red-400' : 'text-yellow-400'
                        }`}>
                          {mockAnalysisReport.technicalAnalysis.indicators.oscillators.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-gray-400 font-medium mb-2">Support & Resistance</h3>
                    <div className="space-y-3">
                      {mockAnalysisReport.technicalAnalysis.indicators.support_resistance.map((level, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className={`text-gray-300 ${level.type === 'support' ? 'text-green-400' : 'text-red-400'}`}>
                            {level.type.charAt(0).toUpperCase() + level.type.slice(1)}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-white">${level.level.toFixed(2)}</span>
                            <div className="w-20 bg-gray-700 h-2 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${level.type === 'support' ? 'bg-green-500' : 'bg-red-500'}`}
                                style={{ width: `${level.strength}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Fundamental Analysis */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <h2 className="text-xl font-semibold text-white mb-4">Fundamental Analysis</h2>
                
                <div className="grid grid-cols-2 gap-6">
                  {/* Metrics visualization */}
                  {Object.entries(mockAnalysisReport.fundamentalAnalysis.metrics).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">{key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                        <span className="font-medium text-white">{value}/100</span>
                      </div>
                      <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${value >= 70 ? 'bg-green-500' : value >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Sentiment Analysis */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <h2 className="text-xl font-semibold text-white mb-4">Sentiment Analysis</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(mockAnalysisReport.sentimentAnalysis.sources).map(([source, sentiment]) => (
                    <div key={source} className="bg-gray-800 p-4 rounded-lg">
                      <h3 className="text-gray-400 font-medium mb-2">{source.charAt(0).toUpperCase() + source.slice(1)}</h3>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                          sentiment === 'positive' || sentiment === 'very_positive' ? 
                          'bg-green-500' : 
                          sentiment === 'negative' || sentiment === 'very_negative' ? 
                          'bg-red-500' : 'bg-yellow-500'
                        }`} />
                        <span className={`font-medium ${
                          sentiment === 'positive' || sentiment === 'very_positive' ? 
                          'text-green-400' : 
                          sentiment === 'negative' || sentiment === 'very_negative' ? 
                          'text-red-400' : 'text-yellow-400'
                        }`}>
                          {sentiment.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right column */}
            <div className="space-y-6">
              {/* Recommended Actions */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <h2 className="text-xl font-semibold text-white mb-4">Recommended Actions</h2>
                
                <div className="space-y-4">
                  {mockAnalysisReport.recommendedActions.map((action, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full text-white bg-purple-600 flex-shrink-0 mt-0.5`}>
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-medium text-white mb-1">{action.action}</h3>
                          <p className="text-gray-400 text-sm">{action.reasoning}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-gray-500">Confidence</span>
                            <div className="w-24 bg-gray-700 h-1.5 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${
                                  action.confidence >= 70 ? 'bg-green-500' : 
                                  action.confidence >= 40 ? 'bg-yellow-500' : 
                                  'bg-red-500'
                                }`}
                                style={{ width: `${action.confidence}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-400">{action.confidence}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors">
                    Generate New Analysis
                  </button>
                </div>
              </div>
              
              {/* Last Updated */}
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 text-center">
                <p className="text-gray-400 text-sm">
                  Last updated: {mockAnalysisReport.timestamp.toLocaleString()}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Powered by NOVA AI
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 