import React, { useState } from 'react';

interface TradeFormProps {
  currentPrice?: number;
}

const TradeForm: React.FC<TradeFormProps> = ({ currentPrice = 101.20 }) => {
  // 交易类型
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  // 订单类型
  const [orderType, setOrderType] = useState<'market' | 'limit'>('limit');
  // 价格
  const [price, setPrice] = useState<string>(currentPrice.toString());
  // 数量
  const [quantity, setQuantity] = useState<string>('1');
  // 总额
  const [total, setTotal] = useState<string>((currentPrice * 1).toFixed(2));

  // 预设百分比
  const percentOptions = [25, 50, 75, 100];

  // 切换交易类型
  const toggleTradeType = (type: 'buy' | 'sell') => {
    setTradeType(type);
  };

  // 切换订单类型
  const toggleOrderType = (type: 'market' | 'limit') => {
    setOrderType(type);
    if (type === 'market') {
      setPrice(currentPrice.toString());
    }
  };

  // 处理价格变化
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = e.target.value;
    setPrice(newPrice);

    if (newPrice && quantity) {
      const newTotal = (parseFloat(newPrice) * parseFloat(quantity)).toFixed(2);
      setTotal(newTotal);
    }
  };

  // 处理数量变化
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = e.target.value;
    setQuantity(newQuantity);

    if (price && newQuantity) {
      const newTotal = (parseFloat(price) * parseFloat(newQuantity)).toFixed(2);
      setTotal(newTotal);
    }
  };

  // 选择预设数量百分比
  const selectPercentage = (percent: number) => {
    // 假设用户最大可用金额为10000
    const maxAvailableBalance = 10000;
    let newQuantity;

    if (orderType === 'limit' && price) {
      newQuantity = ((maxAvailableBalance * (percent / 100)) / parseFloat(price)).toFixed(4);
    } else {
      newQuantity = ((maxAvailableBalance * (percent / 100)) / currentPrice).toFixed(4);
    }

    setQuantity(newQuantity);
    
    const newTotal = (parseFloat(price || currentPrice.toString()) * parseFloat(newQuantity)).toFixed(2);
    setTotal(newTotal);
  };

  // 提交订单
  const submitOrder = () => {
    const orderDetails = {
      type: tradeType,
      orderType,
      price: orderType === 'market' ? 'Market' : price,
      quantity,
      total,
      timestamp: new Date().toISOString()
    };
    
    console.log('提交订单:', orderDetails);
    // 这里可以添加API调用逻辑
    alert(`${tradeType === 'buy' ? '买入' : '卖出'} ${quantity} SOL，价格：${orderType === 'market' ? '市价' : price}`);
  };

  return (
    <div className="w-full h-full bg-gray-900 rounded-lg shadow-md p-4">
      {/* 买入/卖出选项卡 */}
      <div className="flex rounded-lg bg-gray-800 mb-4">
        <button
          className={`flex-1 py-2 rounded-lg text-center font-medium ${
            tradeType === 'buy'
              ? 'bg-green-500 text-white'
              : 'bg-transparent text-gray-400 hover:text-white'
          }`}
          onClick={() => toggleTradeType('buy')}
        >
          买入
        </button>
        <button
          className={`flex-1 py-2 rounded-lg text-center font-medium ${
            tradeType === 'sell'
              ? 'bg-red-500 text-white'
              : 'bg-transparent text-gray-400 hover:text-white'
          }`}
          onClick={() => toggleTradeType('sell')}
        >
          卖出
        </button>
      </div>

      {/* 市价/限价选项卡 */}
      <div className="flex rounded-lg bg-gray-800 mb-4">
        <button
          className={`flex-1 py-2 rounded-lg text-center font-medium ${
            orderType === 'limit'
              ? 'bg-gray-700 text-white'
              : 'bg-transparent text-gray-400 hover:text-white'
          }`}
          onClick={() => toggleOrderType('limit')}
        >
          限价
        </button>
        <button
          className={`flex-1 py-2 rounded-lg text-center font-medium ${
            orderType === 'market'
              ? 'bg-gray-700 text-white'
              : 'bg-transparent text-gray-400 hover:text-white'
          }`}
          onClick={() => toggleOrderType('market')}
        >
          市价
        </button>
      </div>

      {/* 价格输入 */}
      <div className="mb-4">
        <label className="block text-gray-400 text-sm mb-1">价格</label>
        <div className="relative">
          <input
            type="number"
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 pr-12 focus:outline-none focus:ring-1 focus:ring-primary-500"
            value={price}
            onChange={handlePriceChange}
            disabled={orderType === 'market'}
            step="0.01"
            min="0"
          />
          <span className="absolute right-3 top-2 text-gray-400">USDC</span>
        </div>
      </div>

      {/* 数量输入 */}
      <div className="mb-4">
        <label className="block text-gray-400 text-sm mb-1">数量</label>
        <div className="relative">
          <input
            type="number"
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 pr-12 focus:outline-none focus:ring-1 focus:ring-primary-500"
            value={quantity}
            onChange={handleQuantityChange}
            step="0.0001"
            min="0"
          />
          <span className="absolute right-3 top-2 text-gray-400">SOL</span>
        </div>
      </div>

      {/* 数量百分比选择 */}
      <div className="flex justify-between mb-4">
        {percentOptions.map((percent) => (
          <button
            key={percent}
            className="bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white rounded-md px-2 py-1 text-sm"
            onClick={() => selectPercentage(percent)}
          >
            {percent}%
          </button>
        ))}
      </div>

      {/* 总额 */}
      <div className="mb-6">
        <label className="block text-gray-400 text-sm mb-1">总额</label>
        <div className="relative">
          <input
            type="text"
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 pr-12 focus:outline-none focus:ring-1 focus:ring-primary-500"
            value={total}
            readOnly
          />
          <span className="absolute right-3 top-2 text-gray-400">USDC</span>
        </div>
      </div>

      {/* 提交按钮 */}
      <button
        className={`w-full py-3 rounded-lg font-bold ${
          tradeType === 'buy'
            ? 'bg-green-500 hover:bg-green-600 text-white'
            : 'bg-red-500 hover:bg-red-600 text-white'
        }`}
        onClick={submitOrder}
      >
        {tradeType === 'buy' ? '买入 SOL' : '卖出 SOL'}
      </button>

      {/* 可用余额 */}
      <div className="mt-4 flex justify-between text-sm">
        <span className="text-gray-400">可用余额:</span>
        <span className="text-white">
          {tradeType === 'buy' ? '10,000.00 USDC' : '100.00 SOL'}
        </span>
      </div>
    </div>
  );
};

export default TradeForm; 