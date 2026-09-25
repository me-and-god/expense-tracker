from math import ceil

from sqlalchemy import String, and_, cast, insert, or_, select, func
from sqlalchemy.ext.asyncio import AsyncSession

from schemas.transactions import NewTransaction, TransactionQuery, TransactionResponse
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
    filters = [Transaction.user_id == Data.user_id]



    if Data.search is not None:
        filters.append(
            or_(
                cast(Transaction.category, String).ilike(f"%{Data.search}%"),
                Transaction.description.ilike(f"%{Data.search}%")
            )
        )

    if Data.fromDate is not None and Data.toDate is not None:
        filters.append(
            and_(
                Transaction.created_at >= Data.fromDate,
                Transaction.created_at <= Data.toDate
            )
        )

    count_query = select(func.count(Transaction.id)).where(*filters)
    total_count = (await session.execute(count_query)).scalar_one()

    # pagination math
    page = max(1,Data.page)
    page_size = 10
    offset = ( page - 1 ) * page_size
    total_pages = ceil(total_count / page_size) if total_count > 0 else 1



    # fetch the paginated data
    stmt = (
        select(Transaction)
        .where(*filters)
        .order_by(Transaction.created_at.desc())
        .offset(offset)
        .limit(page_size)
    )



    result = await session.execute(stmt)
    transactions = result.scalars().all()


    # return valid data
    TranList=[
            TransactionResponse(
                id=row.id,
                user_id=row.user_id,
                type= row.type,
                category= row.category,
                amount= row.amount,
                description= row.description,
                created_at= row.created_at
            ) for row in transactions
        ]
    
    return {
        "items": TranList,
        "total": total_count,
        "total_pages": total_pages
    }







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