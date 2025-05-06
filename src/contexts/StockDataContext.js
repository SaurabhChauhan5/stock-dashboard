import React, { createContext, useContext, useEffect, useState } from 'react';

const initialStocks = [
  { symbol: 'TCS', name: 'Tata Consultancy', price: 3800 },
  { symbol: 'INFY', name: 'Infosys', price: 1450 },
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2850 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1700 },
  { symbol: 'ITC', name: 'ITC Ltd.', price: 440 },
  { symbol: 'SBIN', name: 'State Bank of India', price: 780 },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance', price: 7200 },
  { symbol: 'MARUTI', name: 'Maruti Suzuki', price: 11200 },
];

const StockDataContext = createContext();

export function useStockData() {
  return useContext(StockDataContext);
}

export function StockDataProvider({ children }) {
  const [stocks, setStocks] = useState(initialStocks);
  const [watchlist, setWatchlist] = useState(['TCS', 'RELIANCE', 'HDFCBANK']);

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks =>
        prevStocks.map(stock => {
          // Random price change between -2% and +2%
          const change = (Math.random() * 0.04 - 0.02) * stock.price;
          const newPrice = Math.max(1, stock.price + change);
          return { ...stock, price: Math.round(newPrice * 100) / 100 };
        })
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const addToWatchlist = (symbol) => {
    setWatchlist((prev) => prev.includes(symbol) ? prev : [...prev, symbol]);
  };

  const removeFromWatchlist = (symbol) => {
    setWatchlist((prev) => prev.filter((s) => s !== symbol));
  };

  return (
    <StockDataContext.Provider value={{ stocks, watchlist, addToWatchlist, removeFromWatchlist }}>
      {children}
    </StockDataContext.Provider>
  );
} 