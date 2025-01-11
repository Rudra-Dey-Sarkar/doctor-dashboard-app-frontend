"use server"
import { NextRequest, NextResponse } from "next/server";
import Retell from "retell-sdk";

// Initialize Retell Client
const retellClient = new Retell({
    apiKey: process.env.RETELL_KEY || "", // Your API key
});

// API Route
export async function POST(req: NextRequest){
    const data = await req.json();
    const { con_num }:any = data;

    console.log("The Number Is :-",con_num);
    try {
        // Make the web call
        const response = await retellClient.call.createWebCall({
            agent_id: process.env.AGENT_ID || "",
            metadata: {
                reason: 'test Call',
            },
        });
        // Respond with success
        console.log('Call initiated successfully:', response);

        return NextResponse.json({ message: 'Call initiated successfully', access_token:response?.access_token});
    } catch (error) {
        console.error('Error making call:', error);
        return NextResponse.json({message: 'Error making call'});
    }
}
