import React, { createContext, useState, useContext, useEffect } from "react";

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [currentBasket, setCurrentBasket] = useState(() => {
    const savedBasket = localStorage.getItem("basket");
    return savedBasket ? JSON.parse(savedBasket) : [];
  });

  const [quantity, setQuantity] = useState(() => {
    const savedQuantity = localStorage.getItem("basketQuantity");
    return savedQuantity ? parseInt(savedQuantity) : 0;
  });

  const totalPrice = currentBasket.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  ).toFixed(2);

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(currentBasket));
    localStorage.setItem("basketQuantity", quantity.toString());
  }, [currentBasket, quantity]);

  return (
    <BasketContext.Provider
      value={{ currentBasket, setCurrentBasket, quantity, setQuantity, totalPrice }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasketContext = () => useContext(BasketContext);
