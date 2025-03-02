import React, { useEffect, useState } from "react";
import { useBasketContext } from "../contexts/BasketContext";
import BasketStyle from "../styles/BasketStyle";
import { useNavigate } from "react-router";
import CheckoutForm from "./CheckoutForm";
import { useCustomerDataContext } from "../contexts/CustomerContext";

export default function Basket() {
  const [visible, setVisible] = useState(false);
  const { setQuantity, currentBasket, setCurrentBasket, totalPrice } = useBasketContext();

  const clearBasket = () => {
    setCurrentBasket([]);
    setQuantity(0);
  };

  const calculateLinePrice = (item) => {
    const sizeMultiplier = {
      "250g": 1,
      "500g": 2,
      "1kg": 4,
    };

    return item.price * sizeMultiplier[item.size];
  };

  const removeItemFromBasket = (id, size, grind) => {
    const updatedBasket = currentBasket.filter(
      (item) => !(item.id === id && item.size === size && item.grind === grind)
    );
    setCurrentBasket(updatedBasket);
    const updatedQuantity = updatedBasket.reduce((sum, item) => sum + item.quantity, 0);
    setQuantity(updatedQuantity);
  };

  const navigate = useNavigate();
  const handleClick = () => {
    setVisible(true);
  };

  return (
    <BasketStyle>
      <div className="basket-container">
        <h2>Your Basket</h2>
        {currentBasket.length === 0 ? (
          <p>Your basket is empty.</p>
        ) : (
          <>
            <ul className="basket-list">
              {currentBasket.map((item) => (
                <li key={`${item.id}-${item.size}-${item.grind}`} className="basket-item">
                  <img src={item.image_url} alt={item.name} className="productThumbnail" />
                  <div className="product-details">
                    <h3>{item.name}</h3>
                    <p>Qty: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                    <p>Grind: {item.grind}</p>
                    <p>£{(calculateLinePrice(item) * item.quantity).toFixed(2)}</p>
                  </div>
                  <button
                    className="remove-item-btn"
                    onClick={() => removeItemFromBasket(item.id, item.size, item.grind)}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
            <hr className="divider" />
            <div className="basket-total">
              <h3>Total: £{totalPrice}</h3>
              <button onClick={() => console.log(currentBasket)}>logBasket</button>
              <button onClick={() => setCustomerData([])}>clear customer</button>
              <button onClick={() => console.log(customerData)}>log customer</button>
              <button onClick={() => console.log(totalPrice)}>log price</button>
              <button className="clear-basket-btn" onClick={clearBasket}>
                Clear Basket
              </button>
              <button className="clear-basket-btn" onClick={handleClick}>
                Pay
              </button>
              {visible && <CheckoutForm />}
            </div>
          </>
        )}
      </div>
    </BasketStyle>
  );
}
