'use client'

import { getDateTimeLocal } from "@/utils/getDateTimeLocal";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface CartItem {
  id: number;
  nama: string;
  harga: number;
  foto: string;
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  dateTime: string;
  searchQuery: string;
  searchCategory: string;
  addToCart: (item: CartItem) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  updateDateTime: (dateTime: string) => void;
  emptyCart: (item: CartItem[]) => void;
  setSearchQuery:(searchQuery:string) => void;
  setSearchCategory:(searchCategory:string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [dateTime, setDateTime] = useState<string>(getDateTimeLocal());
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchCategory, setSearchCategory] = useState<string>("");


  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const increaseQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const updateDateTime = (dateTime: string) => {
    setDateTime(dateTime);
  };

  const emptyCart = () =>{
    setCart([]);
  }



  return (
    <CartContext.Provider value={{ cart, dateTime, searchQuery, searchCategory, addToCart, increaseQuantity, decreaseQuantity, updateDateTime, emptyCart, setSearchQuery, setSearchCategory}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart harus memakai CartProvider");
  }

  return context;
};
