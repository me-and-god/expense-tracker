import { LoaderCircle } from "lucide-react";



const LoadData = () => {
  return (
<>
        <div className="flex items-center justify-center">
          <div className=" flex flex-col gap-3  items-center justify-center w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-semibold text-gray-900"><LoaderCircle size={56} strokeWidth={3} className="animate-spin"/></h2>
            <p className="mt-2 text-[18px] md:text-[22px] font-semibold text-gray-600">Please wait...</p>
          </div>
        </div>
</>
  )
}

export default LoadData;
