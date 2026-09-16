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

export async function getTransactions( { id }: Props ) {
    const response = await fetch(``)
}