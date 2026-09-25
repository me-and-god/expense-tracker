"use server";


// get user by id
export async function getUserById(id: number) {
    const response = await fetch(`http://127.0.0.1:8000/user/${id}`)

    if (!response.ok) {
        const err = response.status
        return err
    }
    const user = await response.json()

    return user
}






//  get the user  dashboard income, expense , and balance detail
type Props = {
    id: number;
}

export async function getUserStats( {id}: Props) {

    const response = await fetch(`http://127.0.0.1:8000/user/${id}/dashboard`)
    const stats = await response.json()

    if (!response.ok) {

        if (response.status == 404) {
            return {
                "error": stats.detail || "user not found"
            } 
        }
    }


    return stats
}





// get transactions

type PageProps = {
    user_id: number;
    search?: string;
    from?: string;
    to?: string;
    page?: number;

}


export async function getTransactions(  data  : PageProps ) {

    const response = await fetch('http://127.0.0.1:8000/user/transactions', {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        cache: "no-store",
        body: JSON.stringify({
            user_id: data.user_id,
            search: data.search,
            fromDate: data.from,
            toDate: data.to,
            page: data.page,
        })
    })

    const transactions = await response.json()

    if (!response.ok) {
        if (response.status === 404) {
            return {
                "error" : transactions.detail || "user not found"
            }
        }  else {
            return {
                "error": "something went wrong"
            }
        }
    }

    return transactions
}







// add new transaction

type TransactionData = {
    user_id: number;
    Data: {
        type: "INCOME" | "EXPENSE" | "";
        category: string;
        amount: number;
        description?: string;
        date: string;
    }
    }

export async function AddTransaction( { user_id, Data } : TransactionData) {
    
    const response = await fetch(`http://127.0.0.1:8000/user/transaction`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                user_id: user_id,
                type: Data.type,
                category: Data.category,
                amount: Data.amount,
                description: Data.description || undefined,
                created_at: Data.date
            }
        )
    })

    const NewTran = await response.json()

    if (!response.ok) {
        return {
            "error": "something went wrong, pls try again"
        }
    }

    return NewTran
}