import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type PatientsDataType = {
    doc_name: string;
    name: string;
    email: string;
    cont_number: number;
    dob: string;
    gender: string;
    age: number;
    des: string;
};

async function ControlAddPatient(
    data: PatientsDataType,
    setEPD: React.Dispatch<React.SetStateAction<boolean>>
) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_KEY}/edit-patient-details`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            toast.success("Patient details edited successfully");
            setEPD(false);
        } else {
            toast.error("Failed to edit patient details");
        }
    } catch (error) {
        toast.error("Failed to edit patient details");
        console.error("Data could not be posted due to:", error);
    }
}

function EditPatientDetails({ setEPD, patientData }: { setEPD: React.Dispatch<React.SetStateAction<boolean>>, patientData: PatientsDataType }) {

    const form = useForm<PatientsDataType>({
        defaultValues: {
            doc_name: patientData?.doc_name,
            name: patientData?.name,
            email: patientData?.email,
            cont_number: patientData?.cont_number,
            dob: patientData?.dob,
            gender: patientData?.gender,
            age: patientData?.age,
            des: patientData?.des,
        },
    });

    const { register, handleSubmit, formState: { errors } } = form;

    return (
        <div className='bg-white grid w-fit h-[75vh] overflow-y-auto justify-center items-center p-5 gap-y-7'>
            <p className='text-[20px] font-semibold'>Please Fill this form to edit patients details</p>
            <form
                onSubmit={handleSubmit((data) => ControlAddPatient(data, setEPD))}
                className="grid m-auto w-fit border-2 border-gray-600 p-2 px-5 mb-5 rounded-[5px] gap-y-1"
            >
                <label htmlFor="doc_name">Doctors Name:-</label>
                <input
                    type="text"
                    {...register("doc_name", { required: true })}
                    className="border-2 border-gray-600 rounded-[5px] p-1"
                    placeholder="Dr. Smith"
                />
                {errors?.doc_name && <p className="text-[12px] text-red-600">Doctors name is required</p>}

                <label htmlFor="name">Patient Name:-</label>
                <input
                    type="text"
                    {...register("name", { required: true })}
                    className="border-2 border-gray-600 rounded-[5px] p-1"
                    placeholder="John Doe"
                />
                {errors?.name && <p className="text-[12px] text-red-600">Patient name is required</p>}

                <label htmlFor="email">Email:-</label>
                <input
                    type="email"
                    {...register("email", { required: true })}
                    className="border-2 border-gray-600 rounded-[5px] p-1"
                    placeholder="example@gmail.com"
                />
                {errors?.email && <p className="text-[12px] text-red-600">Email is required</p>}

                <label htmlFor="cont_number">Contact Number:-</label>
                <input
                    type="number"
                    {...register("cont_number", { required: true })}
                    className="border-2 border-gray-600 rounded-[5px] p-1"
                    placeholder="1234567890"
                />
                {errors?.cont_number && <p className="text-[12px] text-red-600">Contact number is required</p>}

                <label htmlFor="dob">Date of Birth:-</label>
                <input
                    type="date"
                    {...register("dob", { required: true })}
                    className="border-2 border-gray-600 rounded-[5px] p-1"
                />
                {errors?.dob && <p className="text-[12px] text-red-600">Date of birth is required</p>}

                <label htmlFor="gender">Gender:-</label>
                <select
                    {...register("gender", { required: true })}
                    className="border-2 border-gray-600 rounded-[5px] p-1"
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                {errors?.gender && <p className="text-[12px] text-red-600">Gender is required</p>}

                <label htmlFor="age">Age:-</label>
                <input
                    type="number"
                    {...register("age", { required: true, min: 0 })}
                    className="border-2 border-gray-600 rounded-[5px] p-1"
                    placeholder="25"
                />
                {errors?.age && <p className="text-[12px] text-red-600">Valid age is required</p>}

                <label htmlFor="des">Problem :-</label>
                <input
                type='text'
                    {...register("des", { required: true })}
                    className="border-2 border-gray-600 rounded-[5px] p-1"
                    placeholder="Description of patient condition"
                />
                {errors?.des && <p className="text-[12px] text-red-600">Problem is required</p>}

                <button type="submit" className="m-auto mt-2 px-5 w-fit border-2 border-gray-600 rounded-[5px] p-2">
                    Edit Patient Details
                </button>
            </form>
        </div>
    );
}

export default EditPatientDetails;
