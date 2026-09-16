from datetime import datetime

from pydantic import BaseModel


class TransactionResponse(BaseModel):

    id: int
    user_id: int
    type: str
    category: str
    amount: int
    description: str | None = None
    created_at: datetime
    updated_at: datetime