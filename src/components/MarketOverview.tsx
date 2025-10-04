'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { StockData } from '@/types/stock';

interface MarketOverviewProps {
  stocks: StockData[];
  title?: string;
}

export default function MarketOverview({ stocks, title = "Market Overview" }: MarketOverviewProps) {
  // Calculate market cap distribution (using volume as proxy since we don't have market cap)
  const marketData = stocks
    .filter(stock => stock.volume)
    .sort((a, b) => (b.volume || 0) - (a.volume || 0))
    .slice(0, 6)
    .map(stock => ({
      name: stock.symbol,
      value: stock.volume || 0,
      price: stock.price,
    }));

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  const formatVolume = (value: number) => {
    if (value >= 1e9) {
      return `${(value / 1e9).toFixed(1)}B`;
    } else if (value >= 1e6) {
      return `${(value / 1e6).toFixed(1)}M`;
    } else if (value >= 1e3) {
      return `${(value / 1e3).toFixed(1)}K`;
    }
    return value.toFixed(0);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={marketData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(props: any) => `${props.name} ${(props.percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {marketData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [formatVolume(value), 'Volume']}
              labelFormatter={(label) => `Symbol: ${label}`}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
