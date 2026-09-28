import { getUserStats } from "@/features/DBquery/queries";
import { ArrowUp, HandCoins, IndianRupee, Wallet } from "lucide-react";

type Props = {
    id: number;
}

const Stats = async ( id : Props) => {
    const stats = await getUserStats(id)

  return (

    stats.error ? (
            <div className="flex justify-center items-center ">
                <p className="md:text-2xl font-semibold text-red-500">
                    {stats.error} ❗
                </p>
            </div>
        ) : (

            <div className="flex flex-col md:flex-row md:justify-around md:items-center gap-3 px-4">


                    <div className="flex justify-around  gap-3 md:gap-5 bg-green-100 p-5 md:p-15 rounded-2xl px-15 md:px-25   border-2 border-green-500/30 transition-all duration-300  hover:border-green-400  hover:shadow-[0_0_8px_#4ade80,0_0_20px_#4ade80] hover:scale-105">
                        <div className="flex justify-center items-center">
                            <HandCoins color="#4bd26d" size={40} strokeWidth={3} className=""/>
                        </div>
                        <div className="flex flex-col gap-2 md:gap-5">
                            <p className="font-bold ">Total Income</p>
                            <p className="text-[20px] md:text-3xl font-bold">{stats.total_income ? stats.total_income : 0}/-</p>

                            <div className="flex gap-2 md:gap-4">
                                <ArrowUp size={16} color="#4bd26d" strokeWidth={3} absoluteStrokeWidth />
                                <p className="text-[14px] text-green-600 font-medium">12% from last month</p>
                            </div>
                        </div>
                    </div>


                    <div className="flex justify-around gap-3 md:gap-5 bg-red-100 p-5 md:p-15 rounded-2xl px-15 md:px-25 border-2 border-red-500/30 transition-all duration-300  hover:border-red-400  hover:shadow-[0_0_10px_#ef4444,0_0_25px_#ef4444] hover:scale-105">
                        <div className="flex justify-center items-center">
                            <Wallet color="#e34a4a" size={40} strokeWidth={3} className=""/>
                        </div>
                        <div className="flex flex-col gap-2 md:gap-5">
                            <p className="font-bold">Total Expenses</p>
                            <p className="text-[20px] md:text-3xl font-bold">{stats.total_expense ? stats.total_expense : 0}/-</p>

                            <div className="flex  gap-2 md:gap-4">
                                <ArrowUp size={16} color="#4bd26d" strokeWidth={3} absoluteStrokeWidth />
                                <p className="text-[14px] text-green-600 font-medium">12% from last month</p>
                            </div>
                        </div>
                    </div>




                    <div className="flex justify-around gap-3 md:gap-5 bg-blue-100 p-5 md:p-15 rounded-2xl px-15 md:px-25 border-2 border-blue-500/30 transition-all duration-300  hover:border-blue-400  hover:shadow-[0_0_10px_#3b82f6,0_0_25px_#3b82f6] hover:scale-105">
                        <div className="flex justify-center items-center">
                            <IndianRupee size={40} strokeWidth={3} className=""/>
                        </div>
                        <div className="flex flex-col justify-around gap-2 md:gap-5">
                            <p className="font-bold ">Balance</p>
                            <p className="text-[20px] md:text-3xl font-bold">{stats.balance ? stats.balance : 0}/-</p>

                            <div className="flex gap-2 md:gap-4">
                                <ArrowUp size={16} color="#4bd26d" strokeWidth={3} absoluteStrokeWidth />
                                <p className="text-[14px] text-green-600 font-medium">12% from last month</p>
                            </div>
                        </div>
                    </div>

            </div>
                )
  )
}

export default Stats;