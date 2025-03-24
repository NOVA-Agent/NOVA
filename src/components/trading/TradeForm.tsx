import React, { useState } from 'react';

// Trade type
export type TradeType = 'buy' | 'sell';

// Order type
export type OrderType = 'market' | 'limit' | 'stop' | 'stop_limit';

// Price
export interface PriceInfo {
  current: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  change24h: number;
}

interface TradeFormProps {
  type: TradeType;
  orderType: OrderType;
  price: PriceInfo;
  onSubmit: (values: TradeFormValues) => void;
}

interface TradeFormValues {
  type: TradeType;
  orderType: OrderType;
  amount: number;
  price?: number;
  stopPrice?: number;
  total?: number;
}

export const TradeForm: React.FC<TradeFormProps> = ({
  type,
  orderType,
  price,
  onSubmit,
}) => {
  const [values, setValues] = useState<TradeFormValues>({
    type,
    orderType,
    amount: 0,
    price: price.current,
    stopPrice: price.current,
    total: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  const handleAmountChange = (amount: number) => {
    setValues(prev => ({
      ...prev,
      amount,
      total: amount * (prev.price || price.current),
    }));
  };

  const handlePriceChange = (newPrice: number) => {
    setValues(prev => ({
      ...prev,
      price: newPrice,
      total: prev.amount * newPrice,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Amount
        </label>
        <Input
          type="number"
          value={values.amount}
          onChange={e => handleAmountChange(parseFloat(e.target.value))}
          min={0}
          step={0.0001}
          required
        />
      </div>

      {orderType !== 'market' && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Price
          </label>
          <Input
            type="number"
            value={values.price}
            onChange={e => handlePriceChange(parseFloat(e.target.value))}
            min={0}
            step={0.01}
            required
          />
        </div>
      )}

      {(orderType === 'stop' || orderType === 'stop_limit') && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Stop Price
          </label>
          <Input
            type="number"
            value={values.stopPrice}
            onChange={e =>
              setValues(prev => ({ ...prev, stopPrice: parseFloat(e.target.value) }))
            }
            min={0}
            step={0.01}
            required
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Total
        </label>
        <Input
          type="number"
          value={values.total}
          readOnly
          className="bg-gray-700"
        />
      </div>

      <Button
        type="submit"
        variant={type === 'buy' ? 'success' : 'error'}
        className="w-full"
      >
        {type === 'buy' ? 'Buy' : 'Sell'} {orderType === 'market' ? 'Market' : 'Limit'}
      </Button>
    </form>
  );
}; 