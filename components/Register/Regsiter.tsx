import React from 'react'
import { useForm } from 'react-hook-form'
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

type UserDataType = {
    name: String,
    specialization: String,
    gender: String,
    email: String,
    password: String,
    status: String
}
type RouteControlType = () => void;

async function ControlRegister(data: UserDataType, RouteControl: RouteControlType) {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_KEY}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        
        if (res.ok) {
            const data = await res.json();
            setCookie("user", JSON.stringify(data));
            RouteControl();
        } else {
            const errorData = await res.json();
            console.log("Error :-", errorData?.message)
        }
    } catch (error) {
        console.log("Data could not post due to:-",error)
    }
}

function Regsiter() {
      const router = useRouter();
      const RouteControl= ()=>{
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
            onSubmit={handleSubmit((data) => ControlRegister(data, RouteControl))}
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

            <label htmlFor="gender">Enter Your Gender :-</label>
            <div>
                <input
                    type="radio"
                    id="male"
                    value="male"
                    {...register("gender", { required: true })}
                    className="border-2 border-gray-600 rounded-[5px] p-1"
                />
                <label htmlFor="male"> Male</label>
            </div>
            <div>
                <input
                    type="radio"
                    id="female"
                    value="female"
                    {...register("gender", { required: true })}
                    className="border-2 border-gray-600 rounded-[5px] p-1"
                />
                <label htmlFor="female"> Female</label>
            </div>
            {errors?.gender && <p className='text-[12px] text-red-600'>Gender is required</p>}

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