from datetime import datetime, timezone
from decimal import Decimal

from pydantic import BaseModel, Field

from models.transactions import TransactionCategory, TransactionType


class TransactionResponse(BaseModel):

    id: int
    user_id: int
    type: str
    category: str
    amount: Decimal
    description: str | None = None
    created_at: datetime


class ReturnResponse(BaseModel):

    items: list[TransactionResponse]
    total: int
    totalpages: int




class NewTransaction(BaseModel):
    user_id: int
    type: TransactionType
    category: TransactionCategory
    amount: Decimal
    description: str | None = None
    created_at: datetime



class TransactionQuery(BaseModel):
    user_id: int
    search: str | None = None
    fromDate: datetime | None = None
    toDate : datetime | None = None
    page: int = Field(default=1)
