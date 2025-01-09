"use client"
import React,{useEffect, useState} from 'react'
import Topbar from '../Topbar/Topbar'
import Sidebar from '../Sidebar/Sidebar'
import { Toaster } from 'react-hot-toast'

function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Topbar />
            <div className="flex w-full">
                <Sidebar />
                <div className="w-full">
                    <Toaster />
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ClientLayout