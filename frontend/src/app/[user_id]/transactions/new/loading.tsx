import { LoaderCircle } from "lucide-react";



const Loading = () => {
  return (
<>
        <div id="overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-semibold text-gray-900"><LoaderCircle size={256} strokeWidth={3} className="animate-spin"/></h2>
            <p className="mt-2 text-[18px] md:text-[22px] font-semibold text-gray-600">Please wait...</p>
          </div>
        </div>
</>
  )
}

export default Loading;