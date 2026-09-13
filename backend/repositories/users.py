
from fastapi import Depends, HTTPException
from sqlalchemy import insert, select
from sqlalchemy.ext.asyncio import AsyncSession

from database.db import get_db
from models.users import User
from schemas.users import UserCreate, ValidateLogin


async def Repo_CreateUser( user: UserCreate, session: AsyncSession = Depends(get_db)):

    newUser = User( name= user.name, email=user.email)

    session.add(newUser)

    await session.commit()
    await session.refresh(newUser)

    return newUser



async def Repo_checkUser( data: ValidateLogin, session: AsyncSession = Depends(get_db)):

    stmt = select(User).where(User.name.ilike(data.name), User.email == data.email)

    result = await session.execute(stmt)
    user = result.scalar_one_or_none()


    return user