# Stock Screener Dashboard - Project Context

## Project Overview
A comprehensive dashboard for displaying cryptocurrency data from Delta Exchange India API with search, filter, and charting capabilities.

## Key Features
- **Data Display**: Table showing Symbol, Price, Change % for crypto assets
- **Search Functionality**: Real-time search bar to filter stocks
- **Responsive Design**: Mobile-friendly table layout
- **Error Handling**: Graceful error messages when API fails
- **Charts**: Visual representation of data (future enhancement)

## Technical Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Data Fetching**: Fetch API with error handling
- **State Management**: React hooks (useState, useEffect)
- **External API**: Delta Exchange India API

## API Integration
- **Endpoint**: Delta Exchange India API
- **Data Format**: JSON response with crypto asset information
- **Error Handling**: Network failures, API errors, data parsing errors

## Project Structure
```
src/
├── app/
│   ├── page.tsx              # Main dashboard page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── StockTable.tsx        # Main data table component
│   ├── SearchBar.tsx         # Search input component
│   ├── ErrorMessage.tsx      # Error display component
│   └── LoadingSpinner.tsx    # Loading state component
├── lib/
│   └── api.ts                # API utility functions
└── types/
    └── stock.ts              # TypeScript type definitions
```

## Development Notes
- Use TypeScript for type safety
- Implement proper error boundaries
- Ensure mobile responsiveness
- Follow Next.js best practices
- Handle loading states appropriately
