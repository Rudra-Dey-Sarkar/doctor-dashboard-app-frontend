"use client"
import React, { useState, useEffect, useContext } from 'react'
import { getCookie } from 'cookies-next';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import AddPatients from '../AddPatients/AddPatients';
import PatientDetails from '../PatientDetails/PatientDetails';
import EditPatientDetails from '../EditPatientDetails/EditPatientDetails';
import toast from 'react-hot-toast';


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


async function FetchPatients(doc_name: string, setPetients: React.Dispatch<any>) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_KEY}/patient`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ doc_name: doc_name }),
        });


        if (res.ok) {
            const rawResponse = await res.text();
            const datas = JSON.parse(rawResponse);
            setPetients(datas);
        } else {
            console.log("No patient found");
        }

    } catch (errors) {
        console.log("No Patient Found Due To :-", errors)
    }
}
async function RemovePatients(email: string, RP: boolean, setRP: React.Dispatch<React.SetStateAction<boolean>>) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_KEY}/remove-patient`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email }),
        });


        if (res.ok) {
            if (RP === false) {
                setRP(true);
            } else {
                setRP(false);
            }
            toast.success("Patient removed successfully");
        } else {
            toast.error("Cannot remove patient");
        }

    } catch (errors) {
        console.log("Cannot Remove Patient Due To :-", errors)
    }
}


function Patient() {
    const { present, setPresent }: any = useContext(GlobalContext);
    const [patients, setPetients] = useState<PatientsDataType | any>([]);
    const [AP, setAP] = useState<boolean>(false);//Add Patient
    const [PD, setPD] = useState<boolean>(false);//Patient Details
    const [EPD, setEPD] = useState<boolean>(false);//Edit Patient Details
    const [RP, setRP] = useState<boolean>(false);//Remove Patient
    const [userName, setUserName] = useState<string>("");
    const [patientData, setPatientData] = useState<PatientsDataType | any>(null);
    const [searchData, setSearchData] = useState<string>("");
    const [active, setActive] = useState<boolean>(false);

    useEffect(() => {
        const cookies = getCookie("user");
        if (cookies !== undefined || present === true) {
            if (typeof cookies === "string") {
                const NewCookies = JSON.parse(cookies);
                setUserName(NewCookies?.name);
                FetchPatients(NewCookies?.name, setPetients);
            } else {
                console.log("Failed to parse the cookies");
            }
        }
    }, [present, AP, EPD, RP]);

    const filteredData = patients?.filter((patient: PatientsDataType) => patient?.name.toLowerCase().includes(searchData.toLowerCase()));

    return (
        <div className='w-full'>
            {AP === true &&
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    onClick={() => setAP(false)}>
                    <div
                        className=" rounded-md shadow-lg"
                        onClick={(e) => e.stopPropagation()}>
                        <AddPatients setAP={setAP} docName={userName} />
                    </div>
                </div>
            }
            {EPD === true &&
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    onClick={() => setEPD(false)}>
                    <div
                        className=" rounded-md shadow-lg"
                        onClick={(e) => e.stopPropagation()}>
                        <EditPatientDetails setEPD={setEPD} patientData={patientData} />
                    </div>
                </div>
            }
            {PD === true &&
                <div
                    className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-50 z-50"
                    onClick={() => setPD(false)}>
                    <div
                        className=" rounded-md shadow-lg "
                        onClick={(e) => e.stopPropagation()}>
                        <PatientDetails setPD={setPD} patientData={patientData} />
                    </div>
                </div>
            }

            <div className='flex justify-between p-2 border-b-[1px] border-gray-600 mb-7'>
                <p className='sm:text-[25px] text-[20px]  font-semibold underline'>Patients List :-</p>
                <div className='sm:flex grid gap-x-2 gap-y-2 sm:gap-y-0'>
                    <button
                        className='border-2 border-gray-600 px-2 py-1 rounded-[5px] font-bold'
                        onClick={() => setAP(true)}>Add+</button>
                    <div>
                        <input
                            type="text"
                            value={searchData}
                            onClick={() => setActive(true)}
                            onChange={(e) => setSearchData(e.target.value)}
                            placeholder='Search Patients Name'
                            className='border-2 border-gray-600 rounded-[5px] p-1'
                        />
                        {active === true &&
                            <div
                                className="absolute inset-0 flex justify-end top-[145px] sm:top-[106px] right-[7px]"
                                onClick={() => setActive(false)}
                            >
                                <div className='absolute border-2 w-[203px] max-w-[203px] max-h-[250px] overflow-y-auto bg-white border-gray-600 p-2'
                                    onClick={(e) => e.stopPropagation()}>
                                    {filteredData?.map((data: PatientsDataType, index: number) =>
                                        <div key={index}
                                        onClick={() => {
                                            setPatientData(data);
                                            setPD(true);
                                        }}
                                        className='border-b-[1px] border-gray-600 hover:bg-gray-300 p-2 hover:cursor-pointer'>
                                            <p>{data?.name}</p>
                                        </div>)}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            {patients.length === 0 ?
                <div>No Patients Available</div> :
                <div className='grid'>
                    {patients?.map((patient: PatientsDataType, index: number) =>
                        <div key={index}
                            className='flex justify-between px-2 py-2 hover:bg-gray-200 border-b-2 border-gray-300'>
                            <div
                                className=' w-full'
                                onClick={() => {
                                    setPatientData(patient);
                                    setPD(true);
                                }}>
                                <p className='font-semibold'>{patient?.name}</p>
                            </div>
                            <div className='flex gap-x-2'>
                                <button onClick={() => {
                                    setPatientData(patient)
                                    setEPD(true);
                                }}
                                    className='p-1 bg-green-300 rounded-full'>
                                    <svg
                                        width="25px"
                                        height="25px"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                        <g
                                            id="SVGRepo_tracerCarrier"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <g id="SVGRepo_iconCarrier">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z"
                                                fill="#000000"
                                            />
                                        </g>
                                    </svg>
                                </button>
                                <button onClick={() => {
                                    RemovePatients(patient?.email, RP, setRP);
                                }}
                                    className='p-1 bg-red-600 rounded-full'>
                                    <svg
                                        width="25px"
                                        height="25px"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M10 11V17"
                                            stroke="#000000"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M14 11V17"
                                            stroke="#000000"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M4 7H20"
                                            stroke="#000000"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
                                            stroke="#000000"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                                            stroke="#000000"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>}

        </div>
    )
}

export default Patient