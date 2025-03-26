import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { useState } from "react";
import { useBasketContext } from "../contexts/BasketContext";
import { useCustomerDataContext } from "../contexts/CustomerContext";
import { checkout, saveCustomerDetails } from "../../api";


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
  
          const response = await checkout(details, currentBasket, totalPrice);
  
          if (response && response.orderId) {
              const { 
                  purchase_units: [{ shipping }], 
                  payer: { email_address } 
              } = details;
  
              const customerDetails = {
                  order_id: response.orderId, 
                  address_line_1: shipping?.address?.address_line_1 || "N/A",
                  address_line_2: shipping?.address?.address_line_2 || null,
                  admin_area_2: shipping?.address?.admin_area_2 || null,
                  admin_area_1: shipping?.address?.admin_area_1 || null,
                  postal_code: shipping?.address?.postal_code || "N/A",
                  email: email_address || "N/A",
              };
  
              await saveCustomerDetails(customerDetails, response.orderId);
              
  
              setCurrentBasket([]);
              setQuantity(0);
              setCustomerData({})
          } else {
              alert("Failed to process order. Please try again.");
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
                    {/* <select value={currency} onChange={onCurrencyChange}>
                            <option value="USD">💵 USD</option>
                            <option value="EUR">💶 Euro</option>
                            <option value="EUR">💶 Pounds</option>

                    </select> */}
                    <div style={{
                          colorScheme: "none", 
                          tagline: false
                    }}>
                    <PayPalButtons 
                        style={{ 
                            layout: "vertical",
                            shape:"pill",

                        }}
                        createOrder={(data, actions) => onCreateOrder(data, actions)}
                        onApprove={(data, actions) => onApproveOrder(data, actions)}
                    />
                    </div>
                </>
            )}
        </div>
    );
}
