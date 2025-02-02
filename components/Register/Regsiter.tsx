import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { GlobalContext } from '../../GlobalContext/GlobalContext';


type UserDataType = {
    name: string,
    specialization: string,
    gender: string,
    email: string,
    password: string,
    status: string
}
type RouteControlType = () => void;

async function ControlRegister(data: UserDataType, RouteControl: RouteControlType, setPresent: any) {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_KEY}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });



        const rawResponse = await res.text();
        const datas = JSON.parse(rawResponse);

        if (res.ok) {
            setPresent(true);
            setCookie("user", JSON.stringify(datas[0]));
            toast.success("Registration successful");
            RouteControl();
        } else {
            toast.error("Registration failed");
        }

    } catch (error) {
        toast.error("Registration failed");
        console.log("Data could not post due to:-", error)
    }
}

function Regsiter() {
    const { present, setPresent }: any = useContext(GlobalContext);
    const router = useRouter();
    const RouteControl = () => {
        router.push("/dashboard");
    }
    const form = useForm<UserDataType>({
        defaultValues: {
            name: "",
            specialization: "",
            gender: "",
            email: "",
            password: "",
            status: "approved"
        }
    });

    const { register, handleSubmit, formState: { errors } } = form;

    return (

        <form
            onSubmit={handleSubmit((data) => ControlRegister(data, RouteControl, setPresent))}
            className="grid w-fit border-2 border-gray-600 p-2 mb-5 rounded-[5px] gap-y-1"
        >
            <label htmlFor="name">Enter Your Name :-</label>
            <input
                type="text"
                {...register("name", { required: true })}
                className="border-2 border-gray-600 rounded-[5px] p-1"
                placeholder="Alex Doe"
            />
            {errors?.name && <p className='text-[12px] text-red-600'>Name is required</p>}

            <label htmlFor="specialization">Enter Your Specialization :-</label>
            <input
                type="text"
                {...register("specialization", { required: true })}
                className="border-2 border-gray-600 rounded-[5px] p-1"
                placeholder="e.g., Neurology"
            />
            {errors?.specialization && <p className='text-[12px] text-red-600'>Specialization is required</p>}

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

            <label htmlFor="email">Enter Your Email :-</label>
            <input
                type="email"
                {...register("email", { required: true })}
                className="border-2 border-gray-600 rounded-[5px] p-1"
                placeholder="example@gmail.com"
            />
            {errors?.email && <p className='text-[12px] text-red-600'>Email is required</p>}

            <label htmlFor="password">Enter Your Password :-</label>
            <input
                type="password"
                {...register("password", { required: true })}
                className="border-2 border-gray-600 rounded-[5px] p-1"
                placeholder="********"
            />
            {errors?.password && <p className='text-[12px] text-red-600'>Password is required</p>}

            <button type="submit" className="m-auto mt-2 px-5 w-fit border-2 border-gray-600 rounded-[5px] p-2">
                Register
            </button>
        </form>

    )
}

export default Regsiter