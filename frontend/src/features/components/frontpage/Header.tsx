import icon from "../../../../public/icon.png"
import Image from "next/image"

const Header = () => {
  return (
    <div className="w-full flex p-2 md:p-4 justify-between">
        <div className="flex gap-3 md:gap-5 items-center">
            <Image src={icon} alt="main logo" width={40} height={40} className="md:hidden"></Image>
            <Image src={icon} alt="main logo" width={80} className="hidden md:flex"></Image>
            <div className="flex flex-col md:flex-row md:gap-2 ">
                <p className="text-2xl md:text-4xl font-black">Expense</p>
                <p className="text-2xl md:text-4xl font-black text-emerald-700">Tracker</p>
            </div>
        </div>


        <div className="flex gap-3 md:gap-5 items-center">
            <button className="btn-black transition duration-300">Login</button>
            <button className="btn-black transition duration-300">Sign up</button>
        </div>

    </div>
  )
}

export default Header