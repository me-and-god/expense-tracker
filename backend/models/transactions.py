from decimal import Decimal

from sqlalchemy import ForeignKey, Numeric, func
from datetime import datetime
from enum import Enum as PyEnum
from sqlalchemy import DateTime, Enum as SqlEnum , String, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship


from database.base import Base
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .users import User
    from .balance import Statement



class TransactionType( str, PyEnum ) :
    EXPENSE = "EXPENSE"
    INCOME = "INCOME"

class TransactionCategory(str, PyEnum):
    FOOD            = "FOOD"
    TRANSPORT       = "TRANSPORT"
    SHOPPING        = "SHOPPING"
    BILLS           = "BILLS"
    ENTERTAINMENT   = "ENTERTAINMENT"
    HEALTH          = "HEALTH"
    EDUCATION       = "EDUCATION"
    SUBSCRIPTION    = "SUBSCRIPTION"

    OTHER           = "OTHER"

    SALARY          = "SALARY"
    FREELANCE       = "FREELANCE"
    BUSINESS        = "BUSINESS"
    INVESTMENT      = "INVESTMENT"
    GIFT            = "GIFT"




class Transaction(Base):
    __tablename__ = "transactions"

    id          : Mapped[int]               = mapped_column(    primary_key=True, autoincrement=True        )
    user_id     : Mapped[int]               = mapped_column(    ForeignKey("users.id"), nullable=False      )
    type        : Mapped[TransactionType]   = mapped_column(    SqlEnum(TransactionType), nullable=False    )
    category    : Mapped[TransactionCategory] = mapped_column(SqlEnum(TransactionCategory), nullable=False )

    amount      : Mapped[Decimal] = mapped_column(
                    Numeric(12, 2),
                    nullable=False
                )

    description : Mapped[str | None]        = mapped_column(    String(60), nullable=True                   )
    created_at: Mapped[datetime]            = mapped_column(
                                                DateTime(timezone=True),
                                                server_default=func.now(),
                                                nullable=False
                                            )

    updated_at: Mapped[datetime]            = mapped_column(
                                                DateTime(timezone=True),
                                                server_default=func.now(),
                                                onupdate=func.now(),
                                                nullable=False
                                            )


    user        : Mapped["User"] = relationship(
                    "User",
                    back_populates="transactions"
                )

    statement   : Mapped["Statement"] = relationship(
                    "Statement",
                    back_populates="transaction",
                    uselist=False
                )