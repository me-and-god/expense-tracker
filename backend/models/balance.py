from datetime import datetime
from decimal import Decimal


from database.base import Base

from sqlalchemy import DateTime, Float, ForeignKey, Numeric
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .users import User
    from .transactions import Transaction
class Statement(Base):

    __tablename__ = "statements"

    id              : Mapped[int] = mapped_column( primary_key=True, autoincrement=True)
    user_id         : Mapped[int] = mapped_column( ForeignKey("users.id"), nullable=False)

    transaction_id  : Mapped[int] = mapped_column(
                        ForeignKey("transactions.id"),
                        unique=True,
                        nullable=False
                    )

    previous_balance: Mapped[Decimal | None] = mapped_column(
                        Numeric(12, 2),
                        nullable=True
                    )

    remaining_balance: Mapped[Decimal] = mapped_column(
                        Numeric(12, 2),
                        nullable=False
                    )
    updated_at      : Mapped[DateTime] = mapped_column(DateTime, default=datetime.utcnow())



    user            : Mapped["User"] = relationship(
                        "User",
                        back_populates="history"
                    )

    transaction     : Mapped["Transaction"] = relationship(
                        "Transaction",
                        back_populates="statement"
                    )

