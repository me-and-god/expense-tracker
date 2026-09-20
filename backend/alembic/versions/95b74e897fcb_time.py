"""time

Revision ID: 95b74e897fcb
Revises: 5e38481661a8
Create Date: 2026-09-20 15:33:30.352830

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '95b74e897fcb'
down_revision: Union[str, Sequence[str], None] = '5e38481661a8'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.alter_column(
        "transactions",
        "updated_at",
        server_default=sa.text("NOW()"),
        nullable=False,
    )


def downgrade() -> None:
    op.alter_column(
        "transactions",
        "updated_at",
        server_default=None,
    )