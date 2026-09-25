import { getTransactions } from "@/features/DBquery/queries";
import incomeIcon from "../../../../public/profits.png"
import expenseIcon from "../../../../public/dollar.png"
import Image from "next/image";
import Pagination from "@/features/utils/pagination";


type TransactionItem = {
    items: [
        {
            id: number;
            user_id: number;
            category: string;
            type: string;
            amount: number;
            description: string;
            created_at: Date;
        }
    ]
    total: number;
    total_pages: number

};

type props = {
    data : {
        user_id: number,
        search: string,
        from: string,
        to: string,
        page: number,
    }
}

const TransHistory = async ( {data} : props) => {


  console.log(data)

  const transactions: TransactionItem = await getTransactions(data);
  console.log(transactions)
  return (

    <section className="flex flex-col">
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
                transactions.items.map(tran => (
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



    {/* pagination */}
    <Pagination totalPages={transactions.total_pages}/>
    </section>
  )
}

export default TransHistory;