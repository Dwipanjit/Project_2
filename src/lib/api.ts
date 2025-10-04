import { StockData, ApiResponse, ApiError } from '@/types/stock';

// Mock data for development - replace with actual Delta Exchange India API
const MOCK_STOCK_DATA: StockData[] = [
  { symbol: 'BTCUSDT', price: 43250.50, changePercent: 2.45, volume: 1234567, marketCap: 850000000000 },
  { symbol: 'ETHUSDT', price: 2650.75, changePercent: -1.23, volume: 987654, marketCap: 320000000000 },
  { symbol: 'ADAUSDT', price: 0.485, changePercent: 5.67, volume: 2345678, marketCap: 17000000000 },
  { symbol: 'SOLUSDT', price: 98.45, changePercent: 3.21, volume: 456789, marketCap: 42000000000 },
  { symbol: 'DOTUSDT', price: 7.89, changePercent: -2.15, volume: 345678, marketCap: 9000000000 },
  { symbol: 'MATICUSDT', price: 0.95, changePercent: 4.32, volume: 567890, marketCap: 8500000000 },
  { symbol: 'AVAXUSDT', price: 38.25, changePercent: 1.87, volume: 234567, marketCap: 14000000000 },
  { symbol: 'LINKUSDT', price: 14.67, changePercent: -0.95, volume: 123456, marketCap: 7500000000 },
  { symbol: 'UNIUSDT', price: 6.45, changePercent: 2.78, volume: 345678, marketCap: 4800000000 },
  { symbol: 'ATOMUSDT', price: 12.34, changePercent: -1.45, volume: 234567, marketCap: 3600000000 },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchStockData(): Promise<ApiResponse> {
  try {
    // Simulate network delay
    await delay(1000);
    
    // Simulate occasional API failures (10% chance)
    if (Math.random() < 0.1) {
      throw new Error('API service temporarily unavailable');
    }

    return {
      success: true,
      data: MOCK_STOCK_DATA,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    const apiError: ApiError = {
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      code: 'FETCH_ERROR',
      status: 500,
    };

    return {
      success: false,
      data: [],
      error: apiError.message,
      timestamp: new Date().toISOString(),
    };
  }
}

// Real Delta Exchange India API integration (commented out for now)
/*
export async function fetchStockDataFromDeltaExchange(): Promise<ApiResponse> {
  try {
    const response = await fetch('https://api.delta.exchange/v2/tickers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform Delta Exchange data to our format
    const transformedData: StockData[] = data.result.map((item: any) => ({
      symbol: item.symbol,
      price: parseFloat(item.close),
      changePercent: parseFloat(item.change_24h),
      volume: parseFloat(item.volume),
      lastUpdated: item.timestamp,
    }));

    return {
      success: true,
      data: transformedData,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    const apiError: ApiError = {
      message: error instanceof Error ? error.message : 'Failed to fetch data from Delta Exchange',
      code: 'API_ERROR',
      status: 500,
    };

    return {
      success: false,
      data: [],
      error: apiError.message,
      timestamp: new Date().toISOString(),
    };
  }
}
*/

export function filterStocks(stocks: StockData[], query: string): StockData[] {
  if (!query.trim()) {
    return stocks;
  }

  const lowercaseQuery = query.toLowerCase();
  return stocks.filter(stock => 
    stock.symbol.toLowerCase().includes(lowercaseQuery)
  );
}
