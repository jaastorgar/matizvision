import React, { createContext, useContext, useState } from 'react';

export const FontSizeContext = createContext();

export const useFontSize = () => useContext(FontSizeContext);

export const FontSizeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(100); // base 100%

  const increaseFont = () => setFontSize(prev => Math.min(prev + 10, 150));
  const decreaseFont = () => setFontSize(prev => Math.max(prev - 10, 80));
  const resetFont = () => setFontSize(100);

  return (
    <FontSizeContext.Provider value={{ fontSize, increaseFont, decreaseFont, resetFont }}>
      <div style={{ fontSize: `${fontSize}%` }}>
        {children}
      </div>
    </FontSizeContext.Provider>
  );
};