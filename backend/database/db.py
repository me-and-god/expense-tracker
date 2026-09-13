
from typing import AsyncGenerator

from dotenv import load_dotenv
import os

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker


# get the database url from the .env file
load_dotenv() 

DB = os.getenv("DATABASE_URL")

if not DB:
    raise RuntimeError("Database not connected")



#  create engine using the database connection
engine = create_async_engine(DB,echo=False,)

SessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,  # Prevents attributes from expiring after commit (crucial in async)
    autocommit=False,
    autoflush=False,
)


async def get_db()-> AsyncGenerator[AsyncSession, None]:

    async with SessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
