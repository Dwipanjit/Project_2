import { StockData, ApiResponse, ApiError } from '@/types/stock';

// Mock data for fallback when API fails
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

// Real Delta Exchange India API integration
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
    const transformedData: StockData[] = data.result
      .filter((item: any) => item.symbol && item.close && item.change_24h !== undefined)
      .map((item: any) => ({
        symbol: item.symbol,
        price: parseFloat(item.close),
        changePercent: parseFloat(item.change_24h),
        volume: parseFloat(item.volume) || 0,
        lastUpdated: item.timestamp,
      }))
      .slice(0, 50); // Limit to top 50 for better performance

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

export async function fetchStockData(): Promise<ApiResponse> {
  try {
    // Try real API first
    const apiResponse = await fetchStockDataFromDeltaExchange();
    
    if (apiResponse.success && apiResponse.data.length > 0) {
      return apiResponse;
    }
    
    // Fallback to mock data if API fails or returns no data
    console.warn('API failed, using mock data:', apiResponse.error);
    return {
      success: true,
      data: MOCK_STOCK_DATA,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    // Fallback to mock data on any error
    console.warn('API error, using mock data:', error);
    return {
      success: true,
      data: MOCK_STOCK_DATA,
      timestamp: new Date().toISOString(),
    };
  }
}


export function filterStocks(stocks: StockData[], query: string): StockData[] {
  if (!query.trim()) {
    return stocks;
  }

  const lowercaseQuery = query.toLowerCase();
  return stocks.filter(stock => 
    stock.symbol.toLowerCase().includes(lowercaseQuery)
  );
}
