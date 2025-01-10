"use client";
import { useState, useEffect, SetStateAction } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions } from "@stripe/stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import CompletePage from "../CompletePage/CompletePage";

function PayControl(pay: boolean, setPay: React.Dispatch<SetStateAction<boolean>>) {
    if (pay === false) {
        setPay(true);
    } else {
        setPay(false);
    }
}

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`);

export default function Page() {
    const [clientSecret, setClientSecret] = useState("");
    const [confirmed, setConfirmed] = useState<any>(false);
    const [pay, setPay] = useState<boolean>(false);

    useEffect(() => {
        setConfirmed(new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        ));
    }, []);

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
            <p className="text-center text-2xl font-bold mt-2">Pay The Platform Fees To Become Premium Member</p>
            <div className="grid justify-center pt-5">
                <div className=" min-w-[300px]">
                   {!confirmed && <button
                        className={`mb-5 text-white font-semibold w-full h-[45px] rounded-[5px] ${pay === false ? "bg-green-500" : "bg-red-500"}`}
                        onClick={() => PayControl(pay, setPay)}>{pay === false ? "Pay" : "Cancel"}</button>} 

                {pay === true || confirmed ?
                    <div>
                        {clientSecret ? 
                        <div >
                                        <p className="text-center text-2xl font-bold my-2 border-2 border-gray-600 p-2">{confirmed ? "You paid 100$" : "Pay 100$"}</p>
                          <div className="border-2 border-gray-600 p-2">
                            <Elements options={options} stripe={stripePromise}>
                                {confirmed ? <CompletePage /> : <CheckoutForm />}
                            </Elements>
                          </div>
                        </div>
                            : <div>
                                <p>Failed to load payment</p>
                            </div>}
                    </div>
                    : null}
                </div>
            </div>

            <div>
                Previous Payments
            </div>
        </div>
    );
}