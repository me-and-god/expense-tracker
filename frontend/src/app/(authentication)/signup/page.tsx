import icon from "../../../../public/icon.png"
import Image from "next/image"
import LoginForm from "@/features/components/auth/LoginForm";
import { MoveLeft } from "lucide-react"
import Link from "next/link";

const SignupPage = () => {

  return (
    <div className="flex flex-col gap-10 justify-center items-center h-screen bg-gray-400">


        <div className="flex gap-3 md:gap-5 items-center">
            <Image src={icon} alt="main logo" width={40} height={40} className="md:hidden"></Image>
            <Image src={icon} alt="main logo" width={80} className="hidden md:flex"></Image>
            <div className="flex flex-col md:flex-row md:gap-2 ">
                <p className="text-2xl md:text-4xl font-black">Expense</p>
                <p className="text-2xl md:text-4xl font-black text-emerald-700">Tracker</p>
            </div>
        </div>


        <div className="   w-100 md:w-200  md:p-10 gap-6 md:gap-10 flex flex-col bg-white/0 backdrop-blur-md border border-white/40 rounded-xl p-6 shadow-lg">
            <Link href={"/"} className="flex items-center gap-2 md:gap-4 md:text-2xl justify-start">
                <MoveLeft /> 
                <p className="text-[15px] md:text-[20px] font-semibold">Go back</p>
            </Link>
            <p className="text-center text-2xl font-bold md:text-4xl">Fill Your Details</p>

            <LoginForm props={{ prop: "Register" }}/>
        </div>

        
    </div>
  )
}

export default SignupPage