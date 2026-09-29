from decimal import Decimal

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from schemas.transactions import NewTransaction, ReturnResponse, TransactionQuery, TransactionResponse, TransactionUpdate
from services.transactions import Service_deleteTransaction, Service_getAtransaction, Service_getStats, Service_getTransactions, Service_newTransaction, Service_updateTransaction
from services.users import Service_CreateUser, Service_checkUser, Service_getUser
from database.db import get_db
from schemas.users import UserResponse, UserCreate, ValidateLogin
from datetime import datetime
from typing import cast

router = APIRouter( prefix="/user", tags=["Users"])



# create user
@router.post("/", response_model=UserResponse)
async def create_user(
    user: UserCreate, 
    session: AsyncSession = Depends(get_db)
    ):

    new_user = await Service_CreateUser(user, session)  # pyright: ignore[reportArgumentType]

    return new_user



# check user login
@router.post("/login", response_model=UserResponse)
async def CheckLogin( data: ValidateLogin, session: AsyncSession = Depends(get_db)):

    user = await Service_checkUser(data, session)

    return user



# get user by Id
@router.get("/{id}", response_model=UserResponse)
async def getUserById(
    id:int,
    session: AsyncSession = Depends(get_db)
):

    user = await Service_getUser(id, session)

    user = UserResponse(
        id=user.id,
        name=user.name,
        email=user.email,
        created_at=user.created_at # type: ignore
    )
    return user




# get dashboard stats
@router.get("/{id}/dashboard")
async def getStats(id: int, session: AsyncSession = Depends(get_db)):

    result =  await Service_getStats(id, session)

    return result




#  get transactions
@router.post("/transactions")
async def getTransactions(
    Data: TransactionQuery,
    session: AsyncSession = Depends(get_db)
):

    transactions = await Service_getTransactions(Data, session)

    return transactions





# add new transaction
@router.post("/transaction", response_model=TransactionResponse)
async def AddNewTransaction(
    Data: NewTransaction,
    session: AsyncSession = Depends(get_db)
):

    newTran = await Service_newTransaction(
        Data=Data,
        session=session
    )

    return newTran




# get a transaction data
@router.get("/{user_id}/transaction/{transaction_id}")
async def getAtransaction(
    user_id: int,
    transaction_id: int,
    session: AsyncSession = Depends(get_db)
):

    TranData = await Service_getAtransaction( user_id, transaction_id, session)

    return TranData




# update a transaction
@router.patch("/{user_id}/transactions/{transaction_id}")
async def updateTransaction( 
    user_id: int,
    transaction_id: int,
    data: TransactionUpdate,
    session: AsyncSession = Depends(get_db)
):

    updatedTran = await Service_updateTransaction(user_id, transaction_id, session=session, data=data)

    return updatedTran





# delete a transaction
@router.delete("/{user_id}/transactions/{transaction_id}")
async def deleteTransaction(
    user_id: int,
    transaction_id: int,
    session: AsyncSession = Depends(get_db)
):

    await Service_deleteTransaction(user_id, transaction_id, session)
    return {
        "status":"transaction deleted"
    }