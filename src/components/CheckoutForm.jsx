import React, { useState, useEffect } from "react";
import FormStyle from "../styles/FormStyle";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Checkout from "./Checkout";

export default function CheckoutForm() {
  const initialOptions = {
    "client-id":  import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: "GBP",
    intent: "capture",
  };
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    postcode: "",
    city: "",
    shippingMethod: false,
  });

  const [showShippingMethod, setShowShippingMethod] = useState(false);

  useEffect(() => {
    const { firstName, addressLine1, postcode, city } = formData;
    if (firstName && addressLine1 && postcode && city) {
      setShowShippingMethod(true);
    } else {
      setShowShippingMethod(false);
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.shippingMethod) {
      alert("Please select a shipping method.");
      return;
    }
    console.log("Form submitted successfully:", formData);
    alert("Checkout complete!");
  };

  return (

    <FormStyle>
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2>Checkout Form</h2>
      <label>
        First Name (Required):
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </label>
      <label>
        Address Line 1 (Required):
        <input
          type="text"
          name="addressLine1"
          value={formData.addressLine1}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Address Line 2:
        <input
          type="text"
          name="addressLine2"
          value={formData.addressLine2}
          onChange={handleChange}
        />
      </label>
      <label>
        Postcode (Required):
        <input
          type="text"
          name="postcode"
          value={formData.postcode}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        City (Required):
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </label>

      {showShippingMethod && (
        <div className="shipping-method">
          <label>
            <input
              type="checkbox"
              name="shippingMethod"
              checked={formData.shippingMethod}
              onChange={handleChange}
            />
            Royal Mail (£3.50)
          </label>
        </div>
      )}

      <button type="submit" disabled={!showShippingMethod}>
        Submit Order
      </button>
    </form>

    <PayPalScriptProvider options={initialOptions}>
    <Checkout/>
    </PayPalScriptProvider>
    </FormStyle>
  );
}
