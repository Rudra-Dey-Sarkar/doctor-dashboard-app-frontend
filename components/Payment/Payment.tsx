"use client";
import { useState, useEffect, SetStateAction, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions } from "@stripe/stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import CompletePage from "../CompletePage/CompletePage";
import { getCookie } from "cookies-next";
import { GlobalContext } from "../../GlobalContext/GlobalContext";

function PayControl(pay: boolean, setPay: React.Dispatch<SetStateAction<boolean>>) {
    if (pay === false) {
        setPay(true);
    } else {
        setPay(false);
    }
}


const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`);

type PaymentDataType = [{
    email: string,
    amount: string,
    id: string,
    date: string,
    status: string,
}]

async function FetchPatients(email: string, setPayments: React.Dispatch<any>) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_KEY}/payment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email }),
        });


        if (res.ok) {
            const rawResponse = await res.text();
            const datas = JSON.parse(rawResponse);
            setPayments(datas);
            console.log(datas);
        } else {
            console.log("No patient found");
        }

    } catch (errors) {
        console.log("No Patient Found Due To :-", errors)
    }
}

export default function Page() {
    const { present, setPresent }: any = useContext(GlobalContext)
    const [payments, setPayments] = useState<PaymentDataType | any>([]);
    const [clientSecret, setClientSecret] = useState("");
    const [confirmed, setConfirmed] = useState<any>(false);
    const [pay, setPay] = useState<boolean>(false);
    const [AP, setAP] = useState<any>(false);
    const [email, setEmail] = useState<string>("");

    useEffect(() => {
        const cookies = getCookie("user");
        if (cookies !== undefined) {
            if (typeof cookies === "string") {
                const NewCookies = JSON.parse(cookies);
                setEmail(NewCookies?.email);
                FetchPatients(NewCookies?.email, setPayments);
            } else {
                console.log("Failed to parse the cookies");
            }
        }
    }, [present, AP]);

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
                                            {confirmed ? <CompletePage email={email} AP={AP} setAP={setAP} /> : <CheckoutForm />}
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

            <div className="grid border-t-2 border-gray-600 mt-7 overflow-y-auto px-7">
                <p className="text-center text-[25px] font-semibold underline">Previous Payments</p>
                {payments.length > 0 ?
                    <table className="border-collapse border border-gray-600">
                        <thead>
                            <tr className="border border-gray-600">
                                <th className="border border-gray-600 px-2 py-1">Email</th>
                                <th className="border border-gray-600 px-2 py-1">Amount</th>
                                <th className="border border-gray-600 px-2 py-1">Date</th>
                                <th className="border border-gray-600 px-2 py-1">ID</th>
                                <th className="border border-gray-600 px-2 py-1">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments?.reverse().map((e: PaymentDataType[0], index: number) => (
                                <tr key={index} className="border border-gray-600">
                                    <td className="border border-gray-600 px-2 py-1">{e?.email}</td>
                                    <td className="border border-gray-600 px-2 py-1">{e?.amount}</td>
                                    <td className="border border-gray-600 px-2 py-1">{e?.date}</td>
                                    <td className="border border-gray-600 px-2 py-1">{e?.id}</td>
                                    <td className={` text-white font-semibold ${e.status==="succeeded" ? "bg-green-500" : "bg-red-500"} border border-gray-600 px-2 py-1`}>{e?.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    :
                    <div>
                        <p className="text-center">No Payments data available</p>
                    </div>}
            </div>
        </div>
    );
}