import React, { useState, useEffect } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Checkout from "./Checkout";

export default function CheckoutForm() {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [])

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
