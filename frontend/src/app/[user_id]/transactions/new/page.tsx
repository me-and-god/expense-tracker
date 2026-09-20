"use client";

import { AddTransaction } from "@/features/DBquery/queries";
import {BanknoteArrowUp,BanknoteArrowDown,IndianRupee,Plus, Check,} from "lucide-react";
import { redirect, useParams } from "next/navigation";
import { useState } from "react";





type Transaction = {
  type: "INCOME" | "EXPENSE" | "";
  category: string;
  amount: number;
  description: string;
  date: string;
};

type Errors = {
  type?: string;
  category?: string;
  amount?: string;
  date?: string;
};

const NewTransaction = () => {
  const params = useParams();

  const [transaction, setTransaction] = useState<Transaction>({
    type: "",
    category: "",
    amount: 0,
    description: "",
    date: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  function selectType(type: "INCOME" | "EXPENSE") {
    setTransaction((prev) => ({
      ...prev,
      type,
      category: "",
    }));

    setErrors((prev) => ({
      ...prev,
      type: undefined,
      category: undefined,
    }));
  }

  function handleForm(formData: FormData) {
    const category = formData.get("category")?.toString() || "";
    const amount = Number(formData.get("amount") || 0);
    const description = formData.get("description")?.toString() || "";
    const date = formData.get("date")?.toString() || "";

    const newErrors: Errors = {};

    if (!transaction.type) {
      newErrors.type = "Please select income or expense";
    }

    if (!category) {
      newErrors.category = "Please select a category";
    }

    if (!amount || amount <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }

    if (!date) {
      newErrors.date = "Please select a date";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const newTransaction: Transaction = {
      type: transaction.type,
      category,
      amount,
      description,
      date,
    };

    setTransaction(newTransaction);

    console.log("Transaction:", newTransaction);
    
    addTransac(newTransaction)
    
  }


  const [resultStat, setResultStat] = useState<{
    error?: string;
    type?: string;
  }>();

  async function addTransac(transactionData: Transaction) {
    const result = await AddTransaction({
      user_id: Number(params.user_id),
      Data: {
        ...transactionData,
      },
    })

    setResultStat(result)

    setTimeout(() => {
      redirect(`/${Number(params.user_id)}/transactions`)
    }, 3000);
    
  }

  return (
    <div>
      {/* Type */}

      <div className="p-5 md:p-7 px-7 md:px-15 flex flex-col gap-2 md:gap-4">
        <p className="text-[20px] md:text-2xl font-bold md:px-15">
          Type
        </p>

        {errors.type && (
          <p className="text-red-500 font-medium md:px-15">
            {errors.type}
          </p>
        )}

        <div className="flex justify-around gap-5 md:gap-30 md:px-50">
          <button
            type="button"
            onClick={() => selectType("INCOME")}
            className={`bg-green-100 w-full border-2 border-green-500 rounded-[5px] flex justify-center items-center gap-5 md:gap-10 py-3 md:py-5 cursor-pointer hover:scale-103 transition-all duration-300 ${
              transaction.type === "INCOME"
                ? "ring-4 ring-green-300 scale-103 md:105"
                : ""
            }`}
          >
            <BanknoteArrowUp
              size={32}
              color="#1fa321"
              strokeWidth={3}
            />

            <p className="font-bold text-[18px] md:text-[24px] text-green-500">
              Income
            </p>
          </button>

          <button
            type="button"
            onClick={() => selectType("EXPENSE")}
            className={`bg-red-100 w-full border-2 border-red-500 rounded-[5px] flex justify-center items-center gap-5 md:gap-10 py-3 md:py-5 cursor-pointer hover:scale-103 transition-all duration-300 ${
              transaction.type === "EXPENSE"
                ? "ring-4 ring-red-300 scale-103 md:105"
                : ""
            }`}
          >
            <BanknoteArrowDown
              size={32}
              color="#a31f1f"
              strokeWidth={3}
            />

            <p className="font-bold text-[18px] md:text-[24px] text-red-500">
              Expense
            </p>
          </button>
        </div>
      </div>

      {/* Form */}

      <form action={handleForm}>
        {/* Category */}

        <div className="p-5 px-7 md:px-15 flex flex-col gap-2 md:gap-4">
          <div className="flex justify-between items-center">
            <p className="text-[20px] md:text-2xl font-bold md:px-15">
              Category
            </p>

            {errors.category && (
              <p className="text-red-500 font-medium">
                {errors.category}
              </p>
            )}
          </div>

          <div className="flex md:mx-15 gap-3 items-center p-2 md:p-3 text-[18px] md:text-[20px] outline font-semibold has-focus:outline-2 rounded-[5px]">
            <select
              name="category"
              className="w-full outline-none"
              value={transaction.category}
              onChange={(e) =>
                setTransaction((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
            >
              <option value="">Select category</option>

              {transaction.type === "INCOME" && (
                <>
                  <option value="SALARY">Salary</option>
                  <option value="INVESTMENT">Investment</option>
                  <option value="BUSINESS">Business</option>
                  <option value="FREELANCE">Freelance</option>
                  <option value="GIFT">Gift</option>
                  <option value="OTHER">Other</option>
                </>
              )}

              {transaction.type === "EXPENSE" && (
                <>
                  <option value="FOOD">Food</option>
                  <option value="TRANSPORT">Transport</option>
                  <option value="SHOPPING">Shopping</option>
                  <option value="BILLS">Bills</option>
                  <option value="ENTERTAINMENT">
                    Entertainment
                  </option>
                  <option value="HEALTH">Health</option>
                  <option value="EDUCATION">Education</option>
                  <option value="SUBSCRIPTION">
                    Subscription
                  </option>
                  <option value="OTHER">Other</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Amount */}

        <div className="p-5 px-7 md:px-15 flex flex-col gap-2 md:gap-4">
          <div className="flex justify-between items-center">
            <p className="text-[20px] md:text-2xl font-bold md:px-15">
              Amount
            </p>

            {errors.amount && (
              <p className="text-red-500 font-medium">
                {errors.amount}
              </p>
            )}
          </div>

          <div className="flex md:mx-15 gap-3 items-center p-2 md:p-3 text-[18px] md:text-[20px] outline font-semibold has-focus:outline-2 rounded-[5px]">
            <IndianRupee
              size={18}
              strokeWidth={4}
              className="hidden md:flex"
            />

            <IndianRupee
              size={16}
              strokeWidth={3}
              className="md:hidden"
            />

            <input
              type="number"
              name="amount"
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full outline-none"
            />
          </div>
        </div>

        {/* Description */}

        <div className="p-5 px-7 md:px-15 flex flex-col gap-2 md:gap-4">
          <p className="text-[20px] md:text-2xl font-bold md:px-15">
            Description (optional)
          </p>

          <div className="flex md:mx-15 gap-3 items-center p-2 md:p-3 text-[18px] md:text-[20px] outline font-semibold has-focus:outline-2 rounded-[5px]">
            <textarea
              name="description"
              className="w-full outline-none"
              placeholder="e.g. Monthly Salary"
            />
          </div>
        </div>

        {/* Date */}

        <div className="p-5 px-7 md:px-15 flex flex-col gap-2 md:gap-4">
          <div className="flex justify-between items-center">
            <p className="text-[20px] md:text-2xl font-bold md:px-15">
              Date
            </p>

            {errors.date && (
              <p className="text-red-500 font-medium">
                {errors.date}
              </p>
            )}
          </div>

          <div className="flex md:mx-15 gap-3 items-center p-2 md:p-3 text-[18px] md:text-[20px] outline font-semibold has-focus:outline-2 rounded-[5px]">
            <input
              className="w-full outline-none"
              type="datetime-local"
              name="date"
            />
          </div>
        </div>

        {/* Submit */}

        <div className="flex justify-center items-center p-5 md:p-10">
          <button
            type="submit"
            className="flex gap-2 bg-black text-white items-center p-2 md:p-3 px-3 md:px-4 rounded-[10px] hover:scale-103 transition-all duration-300"
          >
            <Plus
              size={18}
              strokeWidth={3}
              className="md:hidden"
            />

            <Plus
              size={20}
              strokeWidth={4}
              className="hidden md:flex"
            />

            <p className="text-[15px] font-black">
              Add Transaction
            </p>
          </button>
        </div>
      </form>

      {
        resultStat?.error ? (

      <>
        <div id="overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-semibold text-gray-900">Centered Modal</h2>
            <p className="mt-2 text-sm text-gray-600">{resultStat.error}</p>
          </div>
        </div>
      </>

        ) : resultStat?.type ? (
          <>
            <div id="overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
              <div className=" flex flex-col gap-3 md:gap-10 justify-center items-center p-5 md:p-10 rounded-2xl bg-white shadow-2xl">
                <h2 className="text-xl font-semibold text-gray-900"><Check size={256} color="#23be42" strokeWidth={3} /></h2>
                <p className="mt-2 text-[18px] md:text-[22px] font-semibold text-gray-600">Transactions Added successfully</p>
              </div>
            </div>
          </>
        ) : null
      }
    </div>
  );
};

export default NewTransaction;




