
from dotenv import load_dotenv
import os

from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker


# get the database url from the .env file
load_dotenv() 

DB = os.getenv("DATABASE_URL")

if not DB:
    raise RuntimeError("Database not connected")



#  create engine using the database connection
engine = create_async_engine(DB)

SessionLocal = async_sessionmaker(
    bind=engine
)
