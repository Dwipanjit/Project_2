'use client';

import { useState, useEffect } from 'react';
import { StockData } from '@/types/stock';
import { fetchStockData, filterStocks } from '@/lib/api';
import SearchBar from '@/components/SearchBar';
import StockTable from '@/components/StockTable';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';

export default function Dashboard() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const loadStockData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetchStockData();
      
      if (response.success) {
        setStocks(response.data);
        setFilteredStocks(response.data);
      } else {
        setError(response.error || 'Failed to fetch stock data');
      }
    } catch (err) {
      setError('An unexpected error occurred while fetching data');
      console.error('Error fetching stock data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = filterStocks(stocks, query);
    setFilteredStocks(filtered);
  };

  const handleRetry = () => {
    loadStockData();
  };

  useEffect(() => {
    loadStockData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Stock Screener Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Real-time cryptocurrency data from Delta Exchange India
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRetry}
                disabled={isLoading}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} placeholder="Search by symbol (e.g., BTC, ETH)..." />

          {/* Stats Cards */}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-semibold">#</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Assets
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {stocks.length}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 bg-success-100 rounded-full flex items-center justify-center">
                        <span className="text-success-600 font-semibold">↗</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Gainers
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {stocks.filter(stock => stock.changePercent > 0).length}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 bg-danger-100 rounded-full flex items-center justify-center">
                        <span className="text-danger-600 font-semibold">↘</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Losers
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {stocks.filter(stock => stock.changePercent < 0).length}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content Area */}
          {isLoading ? (
            <LoadingSpinner size="lg" text="Loading stock data..." />
          ) : error ? (
            <ErrorMessage message={error} onRetry={handleRetry} />
          ) : (
            <div>
              {/* Results Summary */}
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  {searchQuery ? (
                    <>
                      Showing {filteredStocks.length} of {stocks.length} assets matching &quot;{searchQuery}&quot;
                    </>
                  ) : (
                    <>
                      Showing all {stocks.length} assets
                    </>
                  )}
                </p>
              </div>

              {/* Stock Table */}
              <StockTable stocks={filteredStocks} />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Data provided by Delta Exchange India API • Last updated: {new Date().toLocaleString()}
          </p>
        </div>
      </footer>
    </div>
  );
}
