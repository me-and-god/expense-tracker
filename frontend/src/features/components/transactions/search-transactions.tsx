import { Search } from "lucide-react";


const SearchSection = () => {
  return (

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-10 gap-5 md:gap-0 ">
            <div className="flex gap-2 md:gap-4 outline-1 md:outline-2  p-1 md:p-2 items-center">
                <Search strokeWidth={3} opacity={0.5}/>
                <input type="text" placeholder="Search transactions" className="text-[18px] md:text-[22px] font-semibold outline-none"/>
            </div>
            <div className="flex flex-row md:gap-10 gap-2 items-center justify-around">

                <div className="flex flex-col md:flex-row  gap-2 items-center">
                    <label htmlFor="from-date" className="font-bold">From:</label>
                    <input type="date" name="from-date" className="text-red-400 bg-gray-200 p-1"/>
                </div>

                <div className="flex flex-col md:flex-row gap-2 items-center">
                    <label htmlFor="to-date" className="font-bold">To:</label>
                    <input type="date" name="to-date" className="text-red-400 bg-gray-200 p-1"/>
                </div>
            </div>
        </div>
  )
}

export default SearchSection;