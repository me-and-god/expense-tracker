
from fastapi import HTTPException
from sqlalchemy import insert, select
from sqlalchemy.ext.asyncio import AsyncSession

from models.users import User
from schemas.users import UserCreate, ValidateLogin


async def Repo_CreateUser( user: UserCreate, session: AsyncSession):

    newUser = User( name= user.name, email=user.email)

    session.add(newUser)

    await session.commit()
    await session.refresh(newUser)

    return newUser



async def Repo_checkUser( data: ValidateLogin, session: AsyncSession):

    stmt = select(User).where(User.name.ilike(data.name), User.email == data.email)

    result = await session.execute(stmt)
    user = result.scalar_one_or_none()


    return user




async def Repo_getUser(id: int, session: AsyncSession):

    stmt = select(User).where(User.id == id)

    result = await session.execute(stmt)

    return result.scalar_one_or_none()






