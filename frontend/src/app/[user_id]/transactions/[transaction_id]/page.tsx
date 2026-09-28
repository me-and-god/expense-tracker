

import TranDetail from "@/features/components/transactions/tranDetail/TranDetail";
import { getTransactionData } from "@/features/DBquery/queries";
import RouteToPage from "@/features/utils/RouteToPage";
import { SquarePen, Trash, X } from "lucide-react";
;

type PageParams = {
  params: Promise<{
    user_id: number;
    transaction_id: number;
  }>
};

type Data = {
  id: number;
  type: string;
  amount: number;
  user_id: number;
  category: string;
  description: string;
  created_at: string;
  updated_at: string;
};

const TransactionDetail = async( { params ,} : PageParams) => {
  const { user_id, transaction_id } = await params;
  const Transaction = await getTransactionData( {user_id, transaction_id});
  
  return (
    <div>
      <RouteToPage />
      <TranDetail Transaction={Transaction}/>
    </div>
  )
}

export default TransactionDetail;