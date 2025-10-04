# Stock Screener Dashboard

A comprehensive Next.js dashboard for displaying cryptocurrency data from Delta Exchange India API with search, filter, and responsive design capabilities.

## Features

- **Real-time Data**: Fetches cryptocurrency data from Delta Exchange India API
- **Search & Filter**: Real-time search functionality to filter stocks by symbol
- **Responsive Design**: Mobile-friendly table layout that works on all devices
- **Error Handling**: Graceful error messages when API fails
- **Loading States**: Smooth loading indicators during data fetching
- **Statistics**: Overview cards showing total assets, gainers, and losers
- **Modern UI**: Clean, professional interface built with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React hooks (useState, useEffect)
- **API Integration**: Fetch API with error handling

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Project_2
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

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

## API Integration

The application currently uses mock data for development. To integrate with the actual Delta Exchange India API:

1. Uncomment the `fetchStockDataFromDeltaExchange` function in `src/lib/api.ts`
2. Replace the mock data call with the real API call
3. Update the data transformation logic as needed

### Delta Exchange India API

The API endpoint used is: `https://api.delta.exchange/v2/tickers`

## Features in Detail

### Search Functionality

- Real-time search as you type
- Case-insensitive symbol matching
- Clear button to reset search
- Results counter showing filtered vs total assets

### Responsive Design

- Mobile-first approach
- Horizontal scrolling on small screens
- Touch-friendly interface elements
- Optimized for all screen sizes

### Error Handling

- Network error detection
- API error messages
- Retry functionality
- Graceful fallbacks

### Data Display

- Symbol with visual indicators
- Formatted price display
- Color-coded change percentages
- Volume formatting (K, M, B suffixes)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Customization

The application is highly customizable:

- **Styling**: Modify `tailwind.config.js` for theme changes
- **API**: Update `src/lib/api.ts` for different data sources
- **Components**: Each component is modular and reusable
- **Types**: Add new fields in `src/types/stock.ts`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
