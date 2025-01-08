"use client"
import React, { useState } from 'react'
import Login from '../Login/Login'
import Register from '../Register/Regsiter'

function LogReg() {
    const [exist, setExist] = useState<Boolean>(true);

    function LogRegControl() {
        if (exist === true) {
            setExist(false);
        } else {
            setExist(true);
        }
    }

    return (

        <div>
            {exist === true ? <Login /> : <Register />}
            <div className='flex gap-x-1'>
                <p>{exist === true ? "Don't have an account ? " : "Already have an account ? "}</p>
                <button onClick={() => LogRegControl()}>{exist === true ? "Register" : "Login"}</button>
            </div>
        </div>
    )
}

export default LogReg