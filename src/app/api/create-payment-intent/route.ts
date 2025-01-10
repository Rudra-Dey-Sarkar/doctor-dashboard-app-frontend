"use server";
import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items: string) => {

  if(items==="platform-fee"){
    return 1000*10;
  }else{
    return 1000*10;
  }
};

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { items }:any = data;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items?.[0]?.id),
      currency: "usd",
      payment_method_types: ["card"],
    });


    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
