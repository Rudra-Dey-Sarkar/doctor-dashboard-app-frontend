"use client"
import React, { useState, useContext } from 'react'
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { GlobalContext } from '../../GlobalContext/GlobalContext';

function Topbar() {
    
    const { present, setPresent }: any = useContext(GlobalContext);
    const [top, setTop] = useState<boolean>(false);


    function ControlTop() {
        if (top === false) {
            setTop(true);
        } else {
            setTop(false);
        }
    }

    const router = useRouter();
    const RouteControl = () => {
        deleteCookie("user");
        setPresent(false);
        router.push("/");
    }
    return (
        <div className='border-b-[1px] border-gray-600 flex justify-between items-center p-2'>
            <p className='text-[30px] font-bold'>Logo</p>
            <button className='w-[45px] h-[45px] rounded-full border-2 border-gray-600' onClick={() => ControlTop()}>User</button>
            {top === true &&
                <div className='absolute grid top-[61px] right-[1px] bg-white px-2 py-7'>
                    <button
                        onClick={() => RouteControl()}
                        className='border-2 border-gray-600 w-fit m-auto py-1 px-4 rounded-[5px]'>Logout</button>

                </div>}

        </div>
    )
}

export default Topbar