"use client"
import React,{useState,useEffect} from 'react'

type PatientsDataType = {
    doc_name:string,
    name: string,
    email: string,
    cont_number: number,
    dob: string,
    gender: string,
    age: number,
    des:string  
}

function FetchPatients(){

}
function Patient() {

    const [patients, setPetients]=useState<PatientsDataType | any>([]);
    useEffect(()=>{

    },[])
  return (
    <div className='w-full'>
        <button className='border-2 border-gray-600 px-2 py-1 rounded-[5px]'>Add Patient</button>
    </div>
  )
}

export default Patient