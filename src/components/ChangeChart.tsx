'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StockData } from '@/types/stock';

interface ChangeChartProps {
  stocks: StockData[];
  title?: string;
}

export default function ChangeChart({ stocks, title = "24h Change %" }: ChangeChartProps) {
  // Sort stocks by change percentage
  const sortedStocks = [...stocks].sort((a, b) => b.changePercent - a.changePercent);
  
  // Take top 10 stocks for better chart readability
  const chartData = sortedStocks.slice(0, 10).map(stock => ({
    symbol: stock.symbol,
    change: stock.changePercent,
  }));

  const formatChange = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const getBarColor = (value: number) => {
    return value >= 0 ? '#10b981' : '#ef4444';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="symbol" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickFormatter={formatChange}
            />
            <Tooltip 
              formatter={(value: number) => [formatChange(value), 'Change %']}
              labelFormatter={(label) => `Symbol: ${label}`}
            />
            <Bar 
              dataKey="change" 
              fill="#3b82f6"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
