"use client";

import { usePathname } from "next/navigation";
import { CheckLogin } from "./checklogin";
import { SignupNewUser } from "./Signup";
import { useState } from "react";
import BtnState from "@/features/utils/BtnState";





const LoginForm = ( {props} : {props: {prop: string}}) => {
    const path = usePathname();
    const [Err, setErr] = useState("")


    const handleLogin = async (formData: FormData) => {
        const name = formData.get("name")?.toString()
        const email = formData.get("email")?.toString()

        if (name && email ) {
            const err = await CheckLogin( {name, email})
            setErr(err)
        }
    }

    
    const handleSignup = (formData: FormData) => {
        const name = formData.get("name")?.toString()
        const email = formData.get("email")?.toString()

        if (name && email ) {
            SignupNewUser( {name, email})
        }
    }



  return (
                <form action={path === "/login" ? handleLogin : handleSignup} className="flex flex-col gap-5 md:gap-10 items-center">

                <div>
                    <label htmlFor="name" className="text-[18px] font-medium md:text-2xl">Name: </label>
                    <input type="text" name="name" placeholder="John Doe" className="p-1 md:p-3 text-[18px] md:text-[22px] font-medium outline-1 rounded-2xl w-80 text-center"/>
                </div>

                <div>
                    <label htmlFor="email" className="text-[18px] font-medium md:text-2xl">Email: </label>
                    <input type="text" name="email" placeholder="johndoe123@gmail.com" className="p-1 md:p-3 text-[18px] md:text-[22px] font-medium outline-1 rounded-2xl text-center w-80"/>
                </div>

                {/* <button 
                    type="submit" 
                    className="bg-black text-white p-1 px-3 md:p-2 md:px-5 text-[20px] md:text-2xl hover:bg-white hover:text-black transtion duration-300 border-2 rounded-[5px] border-black">
                        {props.prop}
                </button> */}
                <BtnState Props={{ prop: props.prop }}/>

                <p className={`${Err === "" ? "hidden" : "text-[15px] text-red-500 font-medium"}`}>{Err}</p>
            </form>
  )
}

export default LoginForm