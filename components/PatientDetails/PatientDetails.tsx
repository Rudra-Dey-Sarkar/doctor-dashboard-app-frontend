"use client"
import React from 'react'

type PatientsDataType = {
    doc_name: string,
    name: string,
    email: string,
    cont_number: number,
    dob: string,
    gender: string,
    age: number,
    des: string

}

function PatientDetails({ setPD, patientData }: { setPD: React.Dispatch<React.SetStateAction<boolean>>, patientData: PatientsDataType }) {

    return (
        <div className='grid bg-white w-[100vw] h-[65vh] gap-y-2 p-5'>
            <div className='flex justify-end'>
                <button 
                onClick={()=>(setPD(false))}>
                    <svg
                        fill="#ff0000"
                        height="25px"
                        width="25px"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 490 490"
                        xmlSpace="preserve"
                        stroke="#ff0000"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                        <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <g id="SVGRepo_iconCarrier">
                            <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337 " />
                        </g>
                    </svg>
                </button>
            </div>
            <div className='text-[25px] border-2 border-gray-600 rounded-[5px] p-2'>
                <p><strong>Doctors Name :-</strong> {patientData?.doc_name}</p>
                <p><strong>Patient Name :-</strong> {patientData?.name}</p>
                <p><strong>Email :-</strong> {patientData?.email}</p>
                <p><strong>Contact Number :-</strong> {patientData?.cont_number}</p>
                <p><strong>Gender :-</strong> {patientData?.gender}</p>
                <p><strong>Age :-</strong> {patientData?.age}</p>
                <p><strong>DOB :-</strong> {patientData?.dob}</p>
                <p><strong>Problem :-</strong> {patientData?.des}</p>
            </div>
        </div>
    )
}

export default PatientDetails