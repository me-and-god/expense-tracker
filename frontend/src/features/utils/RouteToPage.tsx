"use client";

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation";



const RouteToPage = () => {
    const router = useRouter()
  return (
    <div className="flex w-full items-center px-5 p-5 ">
        <button onClick={()=> router.back()} className="cursor-pointer flex gap-4 items-center">
            <ArrowLeft strokeWidth={3} size={30} className="md:hidden"/>
            <ArrowLeft size={40} strokeWidth={3} className="hidden md:flex"/>

            <p className="text-[18px] font-semibold">Back</p>
        </button>
    </div>
  )
}

export default RouteToPage