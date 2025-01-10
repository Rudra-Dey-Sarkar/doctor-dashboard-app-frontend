"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions } from "@stripe/stripe-js";


import CheckoutForm from "../CheckoutForm/CheckoutForm";
import CompletePage from "../CompletePage/CompletePage";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`);

export default function Page() {
  const [clientSecret, setClientSecret] = useState("");
  const [confirmed, setConfirmed] = useState<any>(false);

  useEffect(() => {
    setConfirmed(new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    ));
  },[]);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "platform-fee" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance: StripeElementsOptions["appearance"] = {
    theme: 'stripe',
  };
  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          {confirmed ? <CompletePage /> : <CheckoutForm />}
        </Elements>
      )}
    </div>
  );
}