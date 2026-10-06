"use client";

import Image from "next/image";
import Link from "next/link";
import icon from "../../../../public/icon.png"
import { Bell,  CircleUser, Menu } from "lucide-react";
import Headbar from "../headbar";


type Props = {
    user: {
        id: number;
        name: string;
        email: string;
        created_at: string;
    };
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header = ({ user, isSidebarOpen, setIsSidebarOpen }: Props) => {


  return (
            <div className="w-full flex p-2 md:p-4 justify-between items-center shadow-[0_0_16px_3px_rgba(0,0,0,0.6)] mb-10">
                <div className="md:hidden ">
                    <button onClick={() => setIsSidebarOpen(prev => !prev)}>
                        <Menu size={40} strokeWidth={3} className="rounded-full bg-slate-800/30 p-2"/>
                    </button>
                </div>
                <div className="flex gap-3 md:gap-5 items-center">
                    <Image src={icon} alt="main logo" width={40} height={40} className="md:hidden" />
                    <Image src={icon} alt="main logo" width={80} className="hidden md:flex" />
                    <div className="flex  md:flex-row md:gap-2 ">
                        <p className="text-2xl md:text-4xl font-black">Expense</p>
                        <p className="text-2xl md:text-4xl font-black text-emerald-700">Tracker</p>
                    </div>
                </div>

                <Headbar user={user}/>

                <div className="flex gap-3 md:gap-5 items-center">
                    <Bell size={30} />

                    <Link href={`/${user.id}/profile`} className="flex flex-col md:flex-row gap-1 items-center md:gap-4">
                        <CircleUser size={30}/>
                        <p className="font-bold text-[14px] md:text-[18px]">{user.name}</p>
                    </Link>
                </div>
            </div>
  )
}

export default Header