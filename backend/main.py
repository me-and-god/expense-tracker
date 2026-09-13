from fastapi import FastAPI
from database.db import engine, test_connection

from models.users import User
from models.balance import Statement
from models.transactions import Transaction
from database.base import Base
from routers.users import router

app = FastAPI()
app.include_router(router)


# @app.get("/")
# def home():
#     return {"message": "server online"}



@app.get('/')
async def test():
    await test_connection()
    return {"message":"database connected"}