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
    "buyer-country": "GB", // Only for sandbox testing
    commit: true,
    components: "buttons,funding-eligibility",
    "disable-funding": "paylater", // If you don't want to offer Pay Later options
    "enable-funding": "venmo,card", // Enable additional payment methods
        // "enable-funding": "venmo,card,bancontact,eps,giropay,ideal,mybank,p24,sofort", // Enable additional payment methods

    locale: "en_GB", // Set appropriate locale for UK
    "integration-date": "2025-03-26",
  };
  return (

    <PayPalScriptProvider options={initialOptions}>
    <Checkout/>
    </PayPalScriptProvider>
  );
}
