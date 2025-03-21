import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* 顶部导航栏 */}
      <header className="bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* 左侧Logo */}
            <div className="flex items-center">
              <div className="flex items-center mr-8">
                <img src="/logo.svg" alt="NOVA" className="h-8 w-8 mr-2" />
                <span className="text-xl font-bold text-purple-500">NOVA</span>
              </div>
              
              {/* 导航链接 */}
              <nav className="hidden md:flex space-x-8">
                <a href="/" className="font-medium hover:text-purple-400 transition-colors">首页</a>
                <a href="/trading" className="font-medium text-purple-400 border-b-2 border-purple-400 pb-1">交易</a>
                <a href="/dashboard" className="font-medium hover:text-purple-400 transition-colors">仪表盘</a>
                <a href="/ai-analyst" className="font-medium hover:text-purple-400 transition-colors">AI分析师</a>
                <a href="/strategy-builder" className="font-medium hover:text-purple-400 transition-colors">策略构建器</a>
                <a href="/marketplace" className="font-medium hover:text-purple-400 transition-colors">市场</a>
              </nav>
            </div>
            
            {/* 右侧用户区域 */}
            <div className="flex items-center space-x-4">
              {/* 通知图标 */}
              <button className="p-2 rounded-full hover:bg-gray-700 relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              
              {/* 钱包按钮 */}
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-sm font-medium transition-colors">
                连接钱包
              </button>
              
              {/* 移动端菜单按钮 */}
              <button className="md:hidden p-2 rounded-full hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* 主要内容 */}
      <main className="flex-1 w-full">
        {children}
      </main>
      
      {/* 页脚 */}
      <footer className="bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img src="/logo.svg" alt="NOVA" className="h-8 w-8 mr-2" />
                <span className="text-xl font-bold text-purple-500">NOVA</span>
              </div>
              <p className="text-gray-400 mb-4">
                AI驱动的Solana交易平台，让交易更智能、更高效。
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
              <h3 className="text-white font-medium mb-4">产品</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-purple-400">交易终端</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">AI分析师</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">策略构建器</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">代币信息</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-4">资源</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-purple-400">文档</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">市场数据</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">帮助中心</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-4">公司</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-purple-400">关于我们</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">博客</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">联系我们</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">职业机会</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2023 NOVA. 保留所有权利。</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-purple-400">隐私政策</a>
              <a href="#" className="text-gray-400 hover:text-purple-400">服务条款</a>
              <a href="#" className="text-gray-400 hover:text-purple-400">Cookie 政策</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 