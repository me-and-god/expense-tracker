from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from typing import AsyncGenerator

from dotenv import load_dotenv
import os



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





from sqlalchemy import text

async def test_connection():
    if not DB:
        raise RuntimeError("DATABASE_URL is not set")

    async with engine.connect() as connection:
        result = await connection.execute(text("SELECT 1"))
        print("Neon connection successful:", result.fetchone())