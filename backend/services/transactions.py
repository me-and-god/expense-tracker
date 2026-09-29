from datetime import datetime
from decimal import Decimal
from typing import cast

from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from schemas.transactions import NewTransaction, ReturnResponse, TransactionQuery, TransactionResponse, TransactionUpdate
from repositories.users import Repo_getUser
from repositories.transactions import Repo_UpdateTransaction, Repo_deleteTransaction, Repo_getAtransaction, Repo_getStats, Repo_getTransactions, Repo_getTransactions, Repo_newTransaction


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



# get a transaction
async def Service_getAtransaction(
        user_id: int,
        transaction_id: int,
        session: AsyncSession
):

    user  = await Repo_getUser( user_id, session)

    if not user:
        raise HTTPException( status_code=404, detail="user not found")


    Transaction = await Repo_getAtransaction(user_id, transaction_id, session)

    if Transaction is None:
        raise HTTPException(status_code=404, detail="transaction not found")


    return Transaction




# update a transaction
async def Service_updateTransaction(
        user_id: int,
        transaction_id: int,
        session: AsyncSession,
        data: TransactionUpdate
):

    existUser = await Repo_getUser(user_id, session)

    if not existUser:
        raise HTTPException(status_code=404 , detail="user not found")

    updateTransaction = await Repo_UpdateTransaction(user_id, transaction_id, session, UpdateData=data)

    return updateTransaction





# delete transaction
async def Service_deleteTransaction(
        user_id: int,
        transaction_id: int,
        session: AsyncSession
):

    await Repo_deleteTransaction(user_id, transaction_id, session)

    return