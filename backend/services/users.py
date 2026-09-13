from fastapi import Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from repositories.users import Repo_CreateUser, Repo_checkUser
from schemas.users import UserCreate, ValidateLogin
from database.db import get_db


async def Service_CreateUser(
    user: UserCreate,
    session: AsyncSession = Depends(get_db),
):

    created_user = await Repo_CreateUser(user, session)

    return created_user


async def Service_checkUser( 
        data: ValidateLogin,
        session: AsyncSession = Depends(get_db)
):

    user = await  Repo_checkUser( data, session)

    if not user:
        raise HTTPException( status_code=404, detail="User not found")

    return user