"use client";


import { DeleteTransaction, UpdateTransaction } from "@/features/DBquery/queries";
import { Check, SquarePen, Trash, X } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";


type Props = {
    Transaction: {
        id: number;
        type: string;
        amount: number;
        user_id: number;
        category: string;
        description: string;
        created_at: string;
        updated_at: string;
    }
};

const TranDetail = ( {Transaction}: Props) => {
    const [ update, setUpdate ] = useState(false);
    const [ done, setDone ] = useState(false);
    const [ deleted, setDeleted ] = useState(false);


    // function for update transaction and then redirect to transactin page
    async function updateTran(formData: FormData) {
        const amount = formData.get("amount");
        const description = formData.get("description");

        const data = {
            data: {
                user_id: Transaction.user_id,
                transaction_id: Transaction.id,
                amount: amount === null ? undefined : Number(amount),
                description: description === null ? undefined : String(description),
            },
        };

        if (amount !== null || description !== null) {
            const updateResponse = await UpdateTransaction(data);

            if (updateResponse.status === 200) {
                setDone(true);

                setTimeout(() => {
                    redirect(`/${Transaction.user_id}/transactions`)
                }, 2000);
            }
        }
    };




    // function for deleting the transaction
    async function deleteTran() {
        const deleteResponse = await DeleteTransaction({user_id: Transaction.user_id, transaction_id: Transaction.id})

        if (deleteResponse.status === 200 ) {
            setDeleted(true);

            setTimeout(() => {
                redirect(`/${Transaction.user_id}/transactions`)
            }, 2000);
        }
    };



  return (
    <div>
      
      <form  action={updateTran} className="">
        <p className="text-center text-[24px] md:text-[30px] font-extrabold">Transaction Detail</p>

        <div className="p-5 md:p-15 md:px-20 flex flex-col  gap-5 md:gap-7">
            <div className="flex gap-4 md:gap-10 items-center">
                <p className="text-[22px] md:text-[24px] font-bold ">Type: </p>
                <p className="text-2xl font-bold text-gray-400">{Transaction.type}</p>
            </div>

            <div className="flex gap-4 md:gap-10 items-center">
                <p className="text-[22px] md:text-[24px] font-bold ">Category: </p>
                <p className="text-2xl font-bold text-gray-400">{Transaction.category}</p>
            </div>


          <div className="flex gap-4 md:gap-10 items-center">
            <label htmlFor="amount" className="text-[22px] md:text-[24px] font-bold ">Amount:</label>
            {
                update == false ? (
                    <p className="text-2xl font-bold text-gray-400">{Transaction.amount}</p>
                ) : update == true ? (
                    <input name="amount" className="outline-2 text-[24px] font-semibold rounded-2xl px-4 p-2 md:px-10" type="number" defaultValue={Transaction.amount} onChange={(e)=> (e.target.value)} />
                ) : null
            }
          </div>

          <div className="flex gap-4 md:gap-10 items-center">
            <label htmlFor="description" className="text-[22px] md:text-[24px] font-bold ">description:</label>
            {
                update == false ? (
                    <p className="text-2xl font-bold text-gray-400">{Transaction.description}</p>
                ) : update == true ? (
                    <input name="description" className="outline-2 text-[24px] font-semibold rounded-2xl px-4 p-2 md:px-10" type="text" defaultValue={Transaction.description ? Transaction.description : ""} onChange={(e)=> (e.target.value)} />
                ) : null
            }
          </div>

          <div className="flex gap-4 md:gap-10 items-center">
            <p className="text-[22px] md:text-[24px] font-bold ">Created at:</p>
            <p className="text-2xl font-bold text-gray-400">{Transaction?.created_at?.slice(0, 10)}</p>
          </div>
        </div>

        {
            update === true && (
                <div className="flex justify-end p-5 md:px-25">
                    <button type="submit"  className="flex justify-center items-center gap-2 md:gap-3 p-1 md:p-2  px-3 md:px-4 bg-green-600 text-white font-bold rounded-[5px] hover:bg-white md:border-3 border-green-600 hover:text-green-600 transition-all duration-150">
                        <Check strokeWidth={3} size={24} className="md:hidden"/>
                        <Check strokeWidth={3} size={40} className="hidden md:flex"/>
                        <p className="text-[18px] md:text-[22px]">Done</p>
                    </button>
                </div>
            )
        }
      </form>

      <div>

        {
            update === false ? (

                <div className="flex gap-3 md:gap-5 justify-end p-5 md:p-10">
                    <button onClick={() => setUpdate(true)} className="flex justify-center items-center gap-2 md:gap-3 p-1 md:p-2  px-3 md:px-4 bg-green-600 text-white font-bold rounded-[5px] hover:bg-white md:border-3 border-green-600 hover:text-green-600 transition-all duration-150">
                        <SquarePen strokeWidth={3} size={24} className="md:hidden"/>
                        <SquarePen strokeWidth={3} size={40} className="hidden md:flex"/>
                        <p className="text-[18px] md:text-[22px]">update</p>
                    </button>

                    <button onClick={deleteTran} className="flex justify-center items-center gap-2 md:gap-3 p-1 md:p-2  px-3 md:px-4 bg-red-600 text-white font-bold rounded-[5px] hover:bg-white md:border-3 border-red-600 hover:text-red-600 transition-all duration-150">
                        <Trash strokeWidth={3} size={24} className="md:hidden"/>
                        <Trash strokeWidth={3} size={40} className="hidden md:flex"/>
                        <p className="text-[18px] md:text-[22px]">delete</p>
                    </button>
                </div>
            ) :  (

                <div className="flex gap-3 md:gap-5 justify-center p-5 md:p-10">

                    <button onClick={()=> setUpdate(false)} className="flex justify-center items-center gap-2 md:gap-3 p-1 md:p-2  px-3 md:px-4 bg-black text-white font-bold rounded-[5px] hover:bg-white md:border-3 border-black hover:text-black transition-all duration-150">
                        <X strokeWidth={3} size={24} className="md:hidden"/>
                        <X  strokeWidth={3} size={40} className="hidden md:flex"/>
                        <p className="text-[18px] md:text-[22px]">cancel</p>
                    </button>
                </div>
            )
        }

      </div>

      {
        done === true && (
            <div id="overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
              <div className=" flex flex-col gap-3 md:gap-10 justify-center items-center p-5 md:p-10 rounded-2xl bg-white shadow-2xl">
                <h2 className="text-xl font-semibold text-gray-900"><Check size={256} color="#23be42" strokeWidth={3} /></h2>
                <p className="mt-2 text-[18px] md:text-[22px] font-semibold text-gray-600">Transactions updated</p>
              </div>
            </div>
        )
      }

      {
        deleted === true && (
            <div id="overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
              <div className=" flex flex-col gap-3 md:gap-10 justify-center items-center p-5 md:p-10 rounded-2xl bg-white shadow-2xl">
                <h2 className="text-xl font-semibold text-gray-900"><Trash color="#df3a3a" size={156} strokeWidth={3}/></h2>
                <p className="mt-2 text-[18px] md:text-[22px] font-semibold text-gray-600">Transactions deleted</p>
              </div>
            </div>
        )
      }

    </div>
  )
}

export default TranDetail