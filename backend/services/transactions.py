from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from schemas.transactions import TransactionResponse
from repositories.users import Repo_getUser
from repositories.transactions import Repo_getStats, Repo_getTransactions


# get stats
async def Service_getStats(
        user_id: int,
        session: AsyncSession
):
    user = await Repo_getUser(user_id, session)

    if not user:
        raise HTTPException(status_code=404, detail="user does not exist")

    
    return  await Repo_getStats(user_id=user_id, session=session) # type: ignore



# get transactions
async def Service_getTransactions(
        user_id: int,
        session: AsyncSession
):

    user_exist = await Repo_getUser( user_id, session)
    if not user_exist:
        raise HTTPException(status_code=404, detail="user not found")

    transactions = await Repo_getTransactions( user_id, session)



    return transactions
