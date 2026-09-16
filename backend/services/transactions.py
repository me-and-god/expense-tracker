from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from repositories.users import Repo_getUser
from repositories.transactions import Repo_getStats


async def Service_getStats(
        user_id: int,
        session: AsyncSession
):
    user = await Repo_getUser(user_id, session)

    if not user:
        raise HTTPException(status_code=404, detail="user does not exist")

    
    return await Repo_getStats(user_id=user_id, session=session)
