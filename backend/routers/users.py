from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from services.users import Service_CreateUser, Service_checkUser
from database.db import get_db
from schemas.users import UserResponse, UserCreate, ValidateLogin

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