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
        }else{
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
        <div className=' w-full h-[100vh] flex justify-center items-center'>
            {user === undefined && <button onClick={()=>router.push("/log-reg")}>Login/Register</button>}
        </div>
    )
}

export default Main