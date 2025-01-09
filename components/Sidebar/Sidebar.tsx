"use client"
import React, { useState } from 'react'
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

function ControlOpen(open:boolean, setOpen:React.Dispatch<React.SetStateAction<boolean>>){
if(open===true){
  setOpen(false);
}else{
  setOpen(true);
}
}

function Sidebar() {
      const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(true);


  return (
    <div className='absolute sm:relative bg-white z-10 border-r-[1px] w-fit h-[100vh] border-gray-600 pr-2 py-2'>

      <div className='flex justify-end mb-5'>
        <div
         className='grid pl-2 gap-y-1 w-fit hover:cursor-pointer'
         onClick={()=>ControlOpen(open, setOpen)}>
          <div className='bg-black w-[25px] h-[3px]'></div>
          <div className='bg-black w-[25px] h-[3px]'></div>
          <div className='bg-black w-[25px] h-[3px]'></div>
        </div>
      </div>

      <div className={`gap-y-5 ${open===true ? "grid" : "hidden"}`}>
        <p 
        className={`px-5 py-2 hover:bg-gray-300 hover:cursor-pointer rounded-r-full font-bold ${pathname==="/dashboard" ? "bg-gray-300 rounded-r-full" : "bg-white"}`}
        onClick={()=>router.push("/dashboard")}>Dashboard</p>
        <p 
        className={`px-5 py-2 hover:bg-gray-300 hover:cursor-pointer rounded-r-full font-bold ${pathname==="/patient" ? "bg-gray-300 rounded-r-full" : "bg-white"}`}
        onClick={()=>router.push("/patient")}>Patient</p>
        <p 
        className={`px-5 py-2 hover:bg-gray-300 hover:cursor-pointer rounded-r-full font-bold ${pathname==="/payment" ? "bg-gray-300 rounded-r-full" : "bg-white"}`}
        onClick={()=>router.push("/payment")}>Payment</p>
      </div>
    </div>
  )
}

export default Sidebar