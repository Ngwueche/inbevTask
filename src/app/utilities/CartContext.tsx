"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import Product from '../types/Product';

interface CartContextProps {
 
  cart: Product[];
  
  updateCart: (product: Product) => void;
}

const CartContext = createContext<CartContextProps | null>(null);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [cart, setCart] = useState<Product[]>([]);

  const updateCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  }
  



  return (
    <CartContext.Provider value={{  cart, updateCart}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
