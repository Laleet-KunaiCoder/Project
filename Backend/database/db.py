from sqlmodel import Session, SQLModel, create_engine
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL, echo=True)

def get_session():
    session = Session(engine)
    try:
        yield session
        print("database connection successfull!!")
    finally:
        session.close()


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)