from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from repositories.users import Repo_CreateUser
from schemas.users import UserCreate
from database.db import get_db


async def Service_CreateUser(
    user: UserCreate,
    session: AsyncSession = Depends(get_db),
):

    created_user = await Repo_CreateUser(user, session)

    return created_user