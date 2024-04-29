"""Add email field to User model

Revision ID: efbc61a394bb
Revises: 
Create Date: 2024-03-29 04:03:42.606508

"""
from typing import Sequence, Union

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = 'efbc61a394bb'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Add the email column to the User table
    op.add_column('user', sa.Column('email', sa.String(), nullable=True))


def downgrade() -> None:
    # Remove the email column from the User table
    op.drop_column('user', 'email')
