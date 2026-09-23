from decimal import Decimal

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from schemas.transactions import NewTransaction, TransactionQuery, TransactionResponse
from services.transactions import Service_getStats, Service_getTransactions, Service_newTransaction
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
@router.post("/transactions", response_model=list[TransactionResponse])
async def getTransactions(
    Data: TransactionQuery,
    session: AsyncSession = Depends(get_db)
):

    transactions = await Service_getTransactions(Data, session)

    result = [
        TransactionResponse(
            id=row.id,
            user_id=row.user_id,
            type=row.type,
            category=row.category,
            amount=cast(Decimal, row.amount),
            created_at=cast(datetime, row.created_at),
            updated_at=cast(datetime, row.updated_at),
        )
        for row in transactions
    ]
    return result





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
