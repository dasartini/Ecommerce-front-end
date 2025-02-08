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
  return (

    <PayPalScriptProvider options={initialOptions}>
    <Checkout/>
    </PayPalScriptProvider>
  );
}
