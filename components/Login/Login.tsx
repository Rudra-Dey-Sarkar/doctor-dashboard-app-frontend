import React from 'react'
import { useForm } from 'react-hook-form'
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';


type UserDataType = {
    name: string,
    specialization: string,
    gender: string,
    email: string,
    password: string,
    status: string
}
type RouteControlType = () => void;

async function ControlRegister(data: UserDataType, RouteControl: RouteControlType) {

    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_KEY}/login`, {
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

function Login() {
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
              onSubmit={handleSubmit((data) => ControlRegister(data, RouteControl ))}
              className="grid w-fit border-2 border-gray-600 p-2 mb-5 rounded-[5px] gap-y-1"
          >
  
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
                  Login
              </button>
          </form>
  
      )
}

export default Login