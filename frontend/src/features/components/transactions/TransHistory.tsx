import { getTransactions } from "@/features/DBquery/queries";
import incomeIcon from "../../../../public/profits.png"
import expenseIcon from "../../../../public/dollar.png"
import Image from "next/image";


type Props = {
    user_id: number;
    searchParams: {
        search?: string;
        from?: Date;
        to?: Date
    };
}


type Transaction =[
    {
        id: number;
        user_id: number;
        category: string;
        type: string;
        amount: number;
        created_at: Date;
        updated_at: Date;
    }
] 



const TransHistory = async( { user_id , searchParams }: Props) => {



    const transactions: Transaction = await getTransactions({user_id , searchParams} );


  return (
    <div className="md:p-10 mt-10 bg-gray-200">
        <div className="flex justify-around bg-black text-white p-1 font-black">
            <div>
                <p>Date</p>
            </div>
            <div>
                <p>Category</p>
            </div>
            <div>
                <p>Type</p>
            </div>
            <div>
                <p>Amount</p>
            </div>
        </div>


        <div className="flex flex-col gap-3 mt-5 ">
            {
                transactions.map(tran => (
                            <div key={tran.id} className="flex justify-around  font-semibold ">

                                    <div className="flex  justify-center w-full">

                                        <p>{new Date(tran.created_at).toLocaleDateString().replaceAll("/",".")}</p>
                                    </div>

                                    <div className="flex  justify-center w-full">

                                        <p>{tran.category}</p>
                                    </div>


                                    <div className="flex justify-center w-full">

                                    {
                                        tran.type === "INCOME" ? (

                                            <div className="flex gap-2 md:gap-4 items-center">
                                                <Image src={incomeIcon} alt="" width={20}></Image>
                                                <p className="text-green-500">{tran.type}</p>
                                            </div>
                                        ) : (
                                            <div className="flex gap-2 md:gap-4 items-center">
                                                <Image src={expenseIcon} alt="" width={20}></Image>
                                                <p className="text-red-500">{tran.type}</p>
                                            </div>
                                        )
                                    }
                                    </div>

                                    <div className="flex  justify-center w-full">

                                        <p>{tran.amount}</p>
                                    </div>

                            </div>
                ))
            }
        </div>
    </div>
  )
}

export default TransHistory;