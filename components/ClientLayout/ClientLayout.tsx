"use client"
import React, { useEffect, useState, useContext } from 'react'
import Topbar from '../Topbar/Topbar'
import Sidebar from '../Sidebar/Sidebar'
import { Toaster } from 'react-hot-toast'
import { getCookie } from 'cookies-next';
import { GlobalContext } from '../../GlobalContext/GlobalContext'


function ClientLayout({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<boolean>(false);
    const {present, setPresent}:any = useContext(GlobalContext);

    useEffect(() => {
        const cookie = getCookie("user");
        if (cookie !== undefined || present===true) {
            setUser(true);
        } else {
            setUser(false);
        }
        

    }, [present]);
    return (
        <div>
           {user===true && <Topbar />} 
            <div className="flex w-full">
            {user===true && <Sidebar />} 
                <div className="w-full sm:pl-0 pl-[36px]">
                    <Toaster />
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ClientLayout