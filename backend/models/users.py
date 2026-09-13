from datetime import datetime

from models.balance import Statement
from models.transactions import Transaction
from database.base import Base

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import DateTime, String


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