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
    updated_at: datetime



class NewTransaction(BaseModel):
    user_id: int
    type: TransactionType
    category: TransactionCategory
    amount: Decimal
    description: str | None = None
    created_at: datetime

