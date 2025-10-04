export interface StockData {
  symbol: string;
  price: number;
  changePercent: number;
  volume?: number;
  marketCap?: number;
  lastUpdated?: string;
}

export interface ApiResponse {
  success: boolean;
  data: StockData[];
  error?: string;
  timestamp?: string;
}

export interface SearchFilters {
  query: string;
  minPrice?: number;
  maxPrice?: number;
  minChangePercent?: number;
  maxChangePercent?: number;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}
