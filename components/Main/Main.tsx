"use client"
import React, { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

type UserDataType = [{
    name: string,
    specialization: string,
    gender: string,
    email: string,
    password: string,
    status: string
}]

function Main() {
    const router = useRouter();
    const [user, setUser] = useState<UserDataType | undefined>(undefined);

    useEffect(() => {
        const cookie = getCookie("user");
        if (cookie !== undefined) {
            router.push("/dashboard");
        } else {
            if (typeof cookie === 'string') {
                try {
                    setUser(JSON.parse(cookie) as UserDataType);
                } catch (error) {
                    console.error("Failed to parse cookie:", error);
                }
            }
        }

    }, []);
    return (
        <div className=' w-full h-[100vh] grid justify-center items-center'>
            {user === undefined &&
                <div className='grid justify-center items-center gap-y-5'>   
                    <p className='text-center font-bold text-[3rem]'>Welcome To Doctor Dashboard🩺</p>      
                    <p className='text-center font-bold '>Please Login/Register To Access The Dashboard</p>
                    <button 
                    onClick={() => router.push("/log-reg")}
                    className='border-2 border-gray-600 w-fit m-auto py-1 px-4 rounded-[5px]'
                    >Login/Register</button>
                </div>}
        </div>
    )
}

export default Main