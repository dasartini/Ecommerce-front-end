import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { useState } from "react";
import { useBasketContext } from "../contexts/BasketContext";
import { useCustomerDataContext } from "../contexts/CustomerContext";
import { checkout } from "../../api";


export default function Checkout() {
  const { setQuantity,currentBasket ,setCurrentBasket, totalPrice} = useBasketContext();
    const{ customerData, setCustomerData} =useCustomerDataContext()
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [currency, setCurrency] = useState(options.currency);

    const onCurrencyChange = ({ target: { value } }) => {
        setCurrency(value);
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: value,
            },
        });
    }

    const onCreateOrder = (data,actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: totalPrice,
                    },
                },
            ],
        });
    }

    const onApproveOrder = async (data, actions) => {
        try {
          const details = await actions.order.capture(); 
          setCustomerData(details);
    
          const response = await checkout(
            details,
            currentBasket,
            totalPrice
          );
    
          if (response) {
            alert("Order placed successfully!");
            setCurrentBasket([]);
            setQuantity(0);
          }
        } catch (err) {
          console.error("Error processing the payment or checkout:", err);
          alert("Something went wrong during checkout!");
        }
      };

    return (
        <div className="checkout">
            {isPending ? <p>LOADING...</p> : (
                <>
                    <select value={currency} onChange={onCurrencyChange}>
                            <option value="USD">💵 USD</option>
                            <option value="EUR">💶 Euro</option>
                            <option value="EUR">💶 Pounds</option>

                    </select>
                    <PayPalButtons 
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) => onCreateOrder(data, actions)}
                        onApprove={(data, actions) => onApproveOrder(data, actions)}
                    />
                </>
            )}
        </div>
    );
}
