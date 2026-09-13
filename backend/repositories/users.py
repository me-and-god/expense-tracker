
from fastapi import Depends
from sqlalchemy import insert
from sqlalchemy.ext.asyncio import AsyncSession

from database.db import get_db
from models.users import User
from schemas.users import UserCreate


async def Repo_CreateUser( user: UserCreate, session: AsyncSession = Depends(get_db)):

    newUser = User( name= user.name, email=user.email)

    session.add(newUser)

    await session.commit()
    await session.refresh(newUser)

    return newUser