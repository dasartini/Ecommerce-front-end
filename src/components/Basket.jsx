import React from "react";
import { useBasketContext } from "../contexts/BasketContext";
import BasketStyle from "../styles/BasketStyle";

export default function Basket() {
  const { setQuantity,currentBasket ,setCurrentBasket} = useBasketContext();
  const clearBasket = () => {
    setCurrentBasket([]);
    setQuantity(0);
  };
  const calculateTotal = () =>
    currentBasket.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  const removeItemFromBasket = (id) => {
    const updatedBasket = currentBasket.filter(item => item.id !== id);
    setCurrentBasket(updatedBasket);
    const updatedQuantity = updatedBasket.reduce((sum, item) => sum + item.quantity, 0);
    setQuantity(updatedQuantity);
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
                <li key={item.id} className="basket-item">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="productThumbnail"
                  />
                  <div className="product-details">
                    <h3>{item.name}</h3>
                    <p>Qty: {item.quantity}</p>
                    <p>£{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button
                    className="remove-item-btn"
                    onClick={() => removeItemFromBasket(item.id)}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
            <hr className="divider" />
            <div className="basket-total">
              <h3>Total: £{calculateTotal()}</h3>
              <button className="clear-basket-btn" onClick={clearBasket}>
                Clear Basket
              </button>
            </div>
          </>
        )}
      </div>
    </BasketStyle>
  );
}
