"use server"
import { NextRequest, NextResponse } from "next/server";
import Retell from "retell-sdk";

// Initialize Retell Client
const retellClient = new Retell({
    apiKey: process.env.RETELL_KEY || "",
});

// Function to Make a Phone Call
export async function POST(req: NextRequest){
    const data = await req.json();
    const { con_num }:any = data;
    
    try {
        // Send a call request
        const response = await retellClient.call.createPhoneCall({
            from_number: process.env.FROM_NUMBER || "", // Caller (registered number)
            to_number: con_num,     // Recipient (test/registered number)
            metadata: {
                reason: 'test Call',
            },
        });

        console.log('Call initiated successfully:', response);

        return NextResponse.json({message: 'Call initiated successfully'});
    } catch (error) {
        console.error('Error making call:', error);
        return NextResponse.json({message: 'Error making call'});
    }
}

