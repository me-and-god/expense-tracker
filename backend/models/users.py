from datetime import datetime


from database.base import Base

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import DateTime, String
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .balance import Statement
    from .transactions import Transaction

class User(Base):

    __tablename__ = "users"

    id          : Mapped[int]       = mapped_column( primary_key=True, autoincrement=True   )
    name        : Mapped[str]       = mapped_column( String, nullable=False                 )
    email       : Mapped[str]  = mapped_column( String, unique=True, nullable=False    )
    created_at  : Mapped[DateTime]  = mapped_column( DateTime, default=datetime.utcnow()    )


    transactions: Mapped[list["Transaction"]] = relationship(
                    "Transaction",
                    back_populates="user"
                )

    history     : Mapped[list["Statement"]] = relationship(
                    "Statement",
                    back_populates="user"
                )