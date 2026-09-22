import { getTransactions } from "@/features/DBquery/queries";

type Props = {
    user_id: number;
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



const TransHistory = async( {user_id}: Props) => {

    const transactions: Transaction = await getTransactions({user_id} );


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

                                    <p>{new Date(tran.created_at).toLocaleDateString()}</p>

                                    <p>{tran.category}</p>

                                    <p className={`${tran.type === "INCOME" ? "text-green-500" : "text-red-500"}`}>{tran.type}</p>

                                    <p>{tran.amount}</p>

                            </div>
                ))
            }
        </div>
    </div>
  )
}

export default TransHistory;