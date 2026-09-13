from fastapi import FastAPI
from database.db import engine, test_connection
from fastapi.middleware.cors import CORSMiddleware
from models.users import User
from models.balance import Statement
from models.transactions import Transaction
from database.base import Base
from routers.users import router

app = FastAPI()
app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins="http://localhost:3000/",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# @app.get("/")
# def home():
#     return {"message": "server online"}



@app.get('/')
async def test():
    await test_connection()
    return {"message":"database connected"}