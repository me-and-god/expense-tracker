from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from repositories.users import Repo_CreateUser, Repo_checkUser, Repo_getUser
from schemas.users import UserCreate, ValidateLogin
from database.db import get_db


async def Service_CreateUser(
    user: UserCreate,
    session: AsyncSession
):

    created_user = await Repo_CreateUser(user, session)

    return created_user


async def Service_checkUser( 
        data: ValidateLogin,
        session: AsyncSession
):

    user = await  Repo_checkUser( data, session)

    if not user:
        raise HTTPException( status_code=404, detail="User not found")

    return user



async def Service_getUser(
        id: int,
        session: AsyncSession
):

    user = await Repo_getUser(id, session)

    if not user:
        raise HTTPException(status_code=404, detail="user not found")

    return user






