from datetime import datetime

from pydantic import BaseModel
from sqlalchemy import DateTime


class UserCreate(BaseModel):
    name: str
    email: str


class UserUpdate(BaseModel):
    name: str | None = None
    email: str |None = None


class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    created_at: datetime


class ValidateLogin(BaseModel):
    name: str 
    email: str


