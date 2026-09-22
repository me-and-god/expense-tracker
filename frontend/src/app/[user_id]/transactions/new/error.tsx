"use client";

import { CircleAlert } from "lucide-react"
import { useRouter } from "next/navigation";



const Error = () => {
  const router = useRouter();


  return (
        <div id="overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
          <div className=" flex flex-col gap-3 md:gap-10 justify-center items-center p-5 md:p-10 rounded-2xl bg-white shadow-2xl">
            <h2 className="text-xl font-semibold text-gray-900"><CircleAlert size={256} color="#d71414" strokeWidth={3} /></h2>
            <p className="mt-2 text-[18px] md:text-[22px] font-semibold text-gray-600">Something went wrong, Try again</p>
          <div className="flex justify-center items-center">
                <button className="bg-black text-white p-2 md:p-3 text-[16px] md:text-[18px] " onClick={() => router.back()}>
                    Back
                </button>
            </div>
          </div>
        </div>
  )
}

export default Error