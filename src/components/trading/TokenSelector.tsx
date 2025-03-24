import React, { useState } from 'react';

interface Token {
  id: string;
  symbol: string;
  name: string;
  logo: string;
  price: number;
  priceChange: number;
}

interface TokenSelectorProps {
  onSelect?: (token: Token) => void;
  selectedTokenId?: string;
}

const demoTokens: Token[] = [
  {
    id: 'sol',
    symbol: 'SOL',
    name: 'Solana',
    logo: '/tokens/solana.svg',
    price: 101.20,
    priceChange: 3.5
  },
  {
    id: 'bonk',
    symbol: 'BONK',
    name: 'Bonk',
    logo: '/tokens/bonk.svg',
    price: 0.00000932,
    priceChange: -1.2
  },
  {
    id: 'jito',
    symbol: 'JTO',
    name: 'Jito',
    logo: '/tokens/jito.svg',
    price: 2.83,
    priceChange: 5.7
  },
  {
    id: 'rndr',
    symbol: 'RNDR',
    name: 'Render',
    logo: '/tokens/render.svg',
    price: 7.41,
    priceChange: 2.1
  },
  {
    id: 'msol',
    symbol: 'mSOL',
    name: 'Marinade SOL',
    logo: '/tokens/msol.svg',
    price: 107.32,
    priceChange: 3.8
  }
];

const TokenSelector: React.FC<TokenSelectorProps> = ({ 
  onSelect, 
  selectedTokenId = 'sol' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selected, setSelected] = useState<Token>(
    demoTokens.find(t => t.id === selectedTokenId) || demoTokens[0]
  );

  // Filter tokens
  const filterTokens = (query: string) => {
    if (!query) return demoTokens;
    const lowercaseQuery = query.toLowerCase();
    return demoTokens.filter(
      token =>
        token.symbol.toLowerCase().includes(lowercaseQuery) ||
        token.name.toLowerCase().includes(lowercaseQuery)
    );
  };

  // Select token
  const handleTokenSelect = (token: Token) => {
    setSelected(token);
    setIsOpen(false);
    if (onSelect) {
      onSelect(token);
    }
  };

  // Format price change
  const formatPriceChange = (change: number) => {
    const isPositive = change >= 0;
    return {
      text: `${isPositive ? '+' : ''}${change.toFixed(2)}%`,
      color: isPositive ? 'text-green-500' : 'text-red-500',
    };
  };

  return (
    <div className="relative">
      {/* Selected Token Display */}
      <button
        className="flex items-center bg-gray-800 hover:bg-gray-700 rounded-lg p-2 text-white w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-8 h-8 rounded-full overflow-hidden mr-2 bg-gray-700 flex items-center justify-center">
          <img
            src={selected.logo}
            alt={selected.symbol}
            className="w-6 h-6 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/tokens/placeholder.svg';
            }}
          />
        </div>
        <div className="flex-1 text-left">
          <div className="font-medium">{selected.symbol}</div>
          <div className="text-xs text-gray-400">{selected.name}</div>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-20 mt-2 w-full bg-gray-800 rounded-lg shadow-xl">
          {/* Search Input */}
          <div className="p-2 border-b border-gray-700">
            <input
              type="text"
              className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="Search tokens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Token List */}
          <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
            {filterTokens(searchQuery).length > 0 ? (
              filterTokens(searchQuery).map((token) => (
                <div
                  key={token.id}
                  className={`flex items-center p-3 cursor-pointer hover:bg-gray-700 ${
                    selected.id === token.id ? 'bg-gray-700' : ''
                  }`}
                  onClick={() => handleTokenSelect(token)}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2 bg-gray-700 flex items-center justify-center">
                    <img
                      src={token.logo}
                      alt={token.symbol}
                      className="w-6 h-6 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/tokens/placeholder.svg';
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white">{token.symbol}</div>
                    <div className="text-xs text-gray-400">{token.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-white">${token.price.toLocaleString(undefined, {
                      minimumFractionDigits: token.price < 0.01 ? 8 : 2,
                      maximumFractionDigits: token.price < 0.01 ? 8 : 2
                    })}</div>
                    <div className={formatPriceChange(token.priceChange).color}>
                      {formatPriceChange(token.priceChange).text}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-3 text-center text-gray-400">No tokens found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenSelector; 