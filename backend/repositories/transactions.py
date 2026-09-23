from sqlalchemy import String, and_, cast, insert, or_, select, func
from sqlalchemy.ext.asyncio import AsyncSession

from schemas.transactions import NewTransaction, TransactionQuery
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
        Data: TransactionQuery,
        session: AsyncSession
):

    stmt = (
        select(Transaction)
        .where(
            Transaction.user_id == Data.user_id
        )
    )

    if Data.search is not None:
        stmt = stmt.where(
            or_(
                cast(Transaction.category, String).ilike(f"%{Data.search}%"),
                Transaction.description.ilike(f"%{Data.search}%")
            )
        )

    if Data.fromDate is not None and Data.toDate is not None:
        stmt = stmt.where(
            and_(
                Transaction.created_at >= Data.fromDate,
                Transaction.created_at <= Data.toDate
            )
        )

    stmt = stmt.order_by(Transaction.created_at.desc())

    result = await session.execute(stmt)
    transactions = result.scalars()
    return transactions







# new transaction
async def Repo_newTransaction(
        session: AsyncSession,
        NewTran: NewTransaction
):

    Tran = Transaction(**NewTran.model_dump())

    session.add(Tran)
    await session.commit()
    await session.refresh(Tran)

    return Tran