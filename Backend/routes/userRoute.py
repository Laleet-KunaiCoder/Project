from fastapi import APIRouter,Depends
from sqlmodel import Session
from model.user import *
from database.db import *

router =APIRouter()
@router.get('/user/')
def get_user(session:Session=Depends(get_session)):
    users = session.query(User).all()
    return users
