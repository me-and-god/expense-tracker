from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from models.transactions import Transaction


async def Repo_getStats(
    user_id: int,
    session: AsyncSession
):

    total_expense = (
        select(func.sum(Transaction.amount))
        .where(
            Transaction.user_id == user_id,
            Transaction.type == "EXPENSE"
        )
        .scalar_subquery()
    )

    total_income = (
        select(func.sum(Transaction.amount))
        .where(
            Transaction.user_id == user_id,
            Transaction.type == "INCOME"
        )
        .scalar_subquery()
    )

    stmt = select(
        total_expense.label("total_expense"),
        total_income.label("total_income"),
        (total_income - total_expense).label("balance")
    )

    result = await session.execute(stmt)

    row =  result.one()

    return {
    "total_expense": row.total_expense,
    "total_income": row.total_income,
    "balance": row.balance
}




# get transactions

async def Repo_getTransactions(
        user_id: int,
        session: AsyncSession
):

    stmt = (
        select(Transaction)
        .where(
            Transaction.user_id == user_id
        )
    )

    result = await session.execute(stmt)
    transactions = result.scalars()
    return transactions