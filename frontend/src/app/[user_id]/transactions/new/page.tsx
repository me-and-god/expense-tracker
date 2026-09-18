"use client";

import { BanknoteArrowUp, BanknoteArrowDown, IndianRupee, Plus } from "lucide-react";
import { useState } from "react";


const NewTransaction = () => {
  const [Transaction, setTransaction] = useState<{ 
    type?: string, 
    category?: string, 
    amount?: number,
    description?: string,
    date?: string
  }>({})

  function selectType(ty: string) {
    setTransaction((prev) => ({
      ...prev,
      type: ty,
      category: ""
    }))
  }

  function selectCategory(cat: string) {
    if (cat) {
      setTransaction((prev) => (
        {
          ...prev,
          category: cat
        }
      ))
    }
  }

  function selectAmount(am: number) {
    if (am) {
      setTransaction(prev => ({
        ...prev,
        amount:am
      }
      ))
    }
  }

  function selectDesc( desc: string ) {
    setTransaction(prev => (
      {
        ...prev,
        description: desc
      }
    ))
  }

  function selectDate( dat: Date) {
    setTransaction(prev => (
      {
        ...prev,
        date: dat.toDateString()
      }
    ))
  }

  console.log(Transaction)

  return (
    <div className="">
        <div className="p-5 md:p-7 px-7 md:px-15 flex flex-col gap-2 md:gap-4">

          <p className="text-[20px] md:text-2xl font-bold md:px-15">Type</p>

          <div className="flex justify-around gap-5 md:gap-30 md:px-50">

            <button onClick={() => selectType("INCOME")} className="bg-green-100 w-full border-2 border-green-500 rounded-[5px] flex justify-center items-center gap-5 md:gap-10 py-3 md:py-5 cursor-pointer hover:scale-103 transition-all duration-300 ">
              <BanknoteArrowUp size={32} color="#1fa321" strokeWidth={3}/>
              <p className="font-bold text-[18px] md:text-[24px] text-green-500">Income</p>
            </button>

            <button onClick={() => selectType("EXPENSE")} className="bg-red-100 w-full border-2 border-red-500 rounded-[5px] flex justify-center items-center gap-5 md:gap-10 py-3 md:py-5 cursor-pointer hover:scale-103 transition-all duration-300">
              <BanknoteArrowDown size={32} color="#a31f1f" strokeWidth={3}/>
              <p className="font-bold text-[18px] md:text-[24px] text-red-500">Expense</p>
            </button>

          </div>


        </div>

        <div className="p-5 px-7 md:px-15 flex flex-col gap-2 md:gap-4">
          <p className="text-[20px] md:text-2xl font-bold md:px-15">Category</p>
          <div className="flex md:mx-15 gap-3 items-center p-2 md:p-3 text-[18px] md:text-[20px] outline font-semibold has-focus:outline-2 rounded-[5px]">

            <select onChange={(e) => selectCategory(e.currentTarget.value)} name="category" className="w-full outline-none">
              {
                Transaction.type === "INCOME" ? (
                  <>
                  <option defaultChecked value=""></option>
                  <option value="SALARY">salary</option>
                  <option value="INVESTMENT">Investment</option>
                  <option value="BUSINESS">Business</option>
                  <option value="FREELANCE">Freelance</option>
                  <option value="GIFT">Gift</option>
                  <option value="OTHER">Other</option>
                  </>
                ) : Transaction.type === "EXPENSE" ? (
                  <>
                    <option defaultChecked value={""}></option>
                    <option value="FOOD">Food</option>
                    <option value="TRANSPORT">Transport</option>
                    <option value="SHOPPING">Shopping</option>
                    <option value="BILLS">Bills</option>
                    <option value="ENTERTAINMENT">Entertainment</option>
                    <option value="HEALTH">Health</option>
                    <option value="EDUCATION">Education</option>
                    <option value="SUBSCRIPTION">Subscription</option>
                    <option value="OTHER">Other</option>
                  </>
                ) : null
              }
              

            </select>

          </div>
        </div>


        <div className="p-5 px-7 md:px-15 flex flex-col gap-2 md:gap-4">
          <p className="text-[20px] md:text-2xl font-bold md:px-15">Amount</p>

          <div className="flex md:mx-15 gap-3 items-center p-2 md:p-3 text-[18px] md:text-[20px] outline font-semibold has-focus:outline-2 rounded-[5px]">
            <IndianRupee size={18} strokeWidth={4} className="hidden md:flex"/>
            <IndianRupee size={16} strokeWidth={3} className="md:hidden"/>
            <input type="number" name="amount" placeholder="0.00" className="w-full outline-none" onChange={(e) => selectAmount(Number(e.currentTarget.value))}/>
          </div>
        </div>

        
        <div className="p-5 px-7 md:px-15 flex flex-col gap-2 md:gap-4">
          <p className="text-[20px] md:text-2xl font-bold md:px-15">Descpriction (optional)</p>
          <div className="flex md:mx-15 gap-3 items-center p-2 md:p-3 text-[18px] md:text-[20px] outline font-semibold has-focus:outline-2 rounded-[5px]">
            <textarea onChange={(e) => selectDesc(e.currentTarget.value)} name="description" className="w-full outline-none" placeholder="e.g Montly Salary"></textarea>
          </div>
        </div>

        <div className="p-5 px-7 md:px-15 flex flex-col gap-2 md:gap-4">
          <p className="text-[20px] md:text-2xl font-bold md:px-15">Date</p>
          <div className="flex md:mx-15 gap-3 items-center p-2 md:p-3 text-[18px] md:text-[20px] outline font-semibold has-focus:outline-2 rounded-[5px]">
            <input 
              className="w-full outline-none"
              type="datetime-local" 
              name="date"
              onChange={(e) => selectDate(new Date(e.currentTarget.value))}
            />
          </div>          
        </div>

        <div className="flex justify-center items-center p-5 md:p-10">
            <button className="flex gap-2 bg-black text-white items-center p-2 md:p-3 px-3 md:px-4 rounded-[10px] hover:scale-103 transition-all duration-300">
                <Plus size={18} strokeWidth={3} className="md:hidden"/>
                <Plus size={20} strokeWidth={4} className="hidden md:flex"/>
                <p className="text-[15px] font-black">Add Transaction</p>
            </button>
        </div>
    </div>
  )
}

export default NewTransaction;