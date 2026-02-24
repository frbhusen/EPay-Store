import React, { createContext, useState, useContext, useEffect } from 'react';

const CurrencyContext = createContext();

const EXCHANGE_RATE = 118.5; // 1 USD = 118.5 SYP

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('currency') || 'SYP';
  });

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'SYP' ? 'USD' : 'SYP');
  };

  const convertPrice = (price, fromCurrency = 'SYP') => {
    if (!price) return 0;
    
    // Convert to SYP first if needed
    const priceInSYP = fromCurrency === 'USD' ? price * EXCHANGE_RATE : price;
    
    // Convert to target currency
    if (currency === 'USD') {
      return (priceInSYP / EXCHANGE_RATE).toFixed(2);
    }
    return priceInSYP.toFixed(2);
  };

  const formatPrice = (price, fromCurrency = 'SYP') => {
    const converted = convertPrice(price, fromCurrency);
    return `${converted} ${currency}`;
  };

  const value = {
    currency,
    setCurrency,
    toggleCurrency,
    convertPrice,
    formatPrice,
    exchangeRate: EXCHANGE_RATE
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};
