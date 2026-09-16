import Image from "next/image";
import Link from "next/link";
import icon from "../../../../public/icon.png"
import { Bell, CircleUser } from "lucide-react";


type Props = {
    user: {
        id: number;
        name: string;
        email: string;
        created_at: string;
    };
}
const Header = ({ user }: Props) => {

  return (
            <div className="w-full flex p-2 md:p-4 justify-between">
                <div className="flex gap-3 md:gap-5 items-center">
                    <Image src={icon} alt="main logo" width={40} height={40} className="md:hidden" />
                    <Image src={icon} alt="main logo" width={80} className="hidden md:flex" />
                    <div className="flex flex-col md:flex-row md:gap-2 ">
                        <p className="text-2xl md:text-4xl font-black">Expense</p>
                        <p className="text-2xl md:text-4xl font-black text-emerald-700">Tracker</p>
                    </div>
                </div>

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