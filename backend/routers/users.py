from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from services.users import Service_CreateUser
from database.db import get_db
from schemas.users import UserResponse, UserCreate

router = APIRouter( prefix="/user", tags=["Users"])



# create user
@router.post("/", response_model=UserResponse)
async def create_user(
    user: UserCreate, 
    session: AsyncSession = Depends(get_db)
    ):

    new_user = await Service_CreateUser(user, session)  # pyright: ignore[reportArgumentType]

    return new_user
