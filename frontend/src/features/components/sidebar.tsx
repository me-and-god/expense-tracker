"use client";


import Link from "next/link";
import { ChevronLeft, Settings } from "lucide-react";



type SidebarProps = {
    user_id: number;
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const Sidebar = ({user_id, isSidebarOpen, setIsSidebarOpen }: SidebarProps) => {
    


  return (
    <>



            <div className={ ` text-white w-70 min-h-screen p-3  bg-emerald-950 flex flex-col gap-15 md:hidden relative   ${ !isSidebarOpen ? "animate-close-sidebar" : "animate-open-sidebar "} `}>
        
                <div>
                    <div className="flex gap-3  items-center justify-between">
                        {/* <Image src={icon} alt="main logo" width={40} height={40} className="md:hidden"></Image> */}
                        <div className="flex flex-col ">
                            <p className="text-2xl  font-black">Expense</p>
                            <p className="text-2xl  font-black text-emerald-400">Tracker</p>
                        </div>
        
                        <button onClick={()=> setIsSidebarOpen(false)}>
                            <ChevronLeft size={40} strokeWidth={3} className="rounded-full bg-slate-800/30 p-2"/>
                        </button>
                    </div>
                </div>
        
                <div className="flex justify-between flex-col h-full">
                    <div className="flex flex-col gap-4 p-5">
                        <Link href={`/${user_id}/dashboard`} className="text-[18px] md:text-[22px] font-bold">Home</Link>
                        <Link href={`/${user_id}/transactions`} className="text-[18px] md:text-[22px] font-bold">Transactions</Link>
                        <Link href={`/${user_id}/reports`} className="text-[18px] md:text-[22px] font-bold">Insights</Link>
                        <Link href={`/${user_id}/profile`} className="text-[18px] md:text-[22px] font-bold">Profile</Link>
                    </div>
                    <div className="flex justify-around">
                        <p>settings</p>
                        <Settings />
                    </div>
                </div>
            </div>



{/* 
        <div className="fixed w-15 min-h-screen bg-gray-700 flex justify-center items-center">
            <button onClick={()=> setOpen(true)}>
                <ChevronRight size={60} strokeWidth={3} className="rounded-full text-white p-2"/>
            </button>
        </div> */}

    </>


  )
}

export default Sidebar;