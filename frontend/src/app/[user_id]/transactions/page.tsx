import SearchSection from "@/features/components/transactions/search-transactions";
import TransHistory from "@/features/components/transactions/TransHistory";
import { Plus } from "lucide-react";
import Link from "next/link";


type PageParams = {
    params : Promise<{
        user_id:number
    }>;
    searchParams: Promise<{
        search?: string;
        from?: Date;
        to?: Date;
    }>
}

const TransactionPage = async({ params, searchParams}: PageParams) => {
    const { user_id } = await params;
    const { search, from, to } = await searchParams;

  return (
    <div className="px-5 md:px-20">

        <div className="flex justify-between  items-center">
            <p className="text-2xl md:text-4xl font-bold tracking-wide p-3 md:p-10 ">Transactions</p>
            <Link href={`/${user_id}/transactions/new`} className="flex gap-2 bg-black text-white items-center p-2 md:p-3 px-3 md:px-4 rounded-[10px] hover:scale-103 transition-all duration-300">
                <Plus strokeWidth={3} className="hidden md:flex"/>
                <p className="text-[15px] font-black">Add Transaction</p>
            </Link>
        </div>

        <SearchSection />
        <TransHistory user_id={user_id} searchParams={{search, from, to}} />
    </div>
  )
}

export default TransactionPage;