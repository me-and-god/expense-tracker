from datetime import datetime
from decimal import Decimal
from typing import cast

from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from schemas.transactions import NewTransaction, ReturnResponse, TransactionQuery, TransactionResponse
from repositories.users import Repo_getUser
from repositories.transactions import Repo_getStats, Repo_getTransactions, Repo_getTransactions, Repo_newTransaction


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
        Data: TransactionQuery,
        session: AsyncSession
):

    user_exist = await Repo_getUser( Data.user_id, session)
    if not user_exist:
        raise HTTPException(status_code=404, detail="user not found")

    transactions = await Repo_getTransactions( Data, session) # type: ignore


    return transactions






# add new transaction
async def Service_newTransaction(
        Data: NewTransaction,
        session: AsyncSession
):

    newTran = await Repo_newTransaction(
        session,
        Data
    )

    return newTran
