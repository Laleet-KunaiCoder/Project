from typing import Annotated
from fastapi.responses import JSONResponse, Response

from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session
from util.authUtil import *
from database.db import *
from model.user import *

router = APIRouter()
                               
@router.post("/login")
def login(response: Response, form_data: Annotated[OAuth2PasswordRequestForm, Depends()],db:Session=Depends(get_session)):
   db_user = db.query(User).filter(User.email == form_data.username).first()
   if not db_user:
       raise HTTPException(status_code=401, detail="User not found")
   if not bcrypt_context.verify(form_data.password, db_user.hashed_password):
        return HTTPException(status_code=401, detail="Incorrect password")
   access_token = create_access_token(data={"id": db_user.id})
   return JSONResponse(content={"access_token": access_token, "token_type": "bearer"})




@router.post("/signup")
def sign_up(response: Response ,user:UserCreate, db: Session = Depends(get_session)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = bcrypt_context.hash(user.password)
    new_user = User(email=user.email, user_name=user.user_name, hashed_password=hashed_password,
                    info=user.info)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    # Add to the database
    access_token = create_access_token(data={"id": new_user.id})
    return JSONResponse(content={"access_token": access_token, "token_type": "bearer"})



@router.get("/items/")
async def read_items(user: dict = Depends(get_current_user)):
    # Now you have access to the user information
    return {"User": user}


@router.get("/username/")
async def get_username(user: dict = Depends(get_current_user), db: Session = Depends(get_session)):
    try:
        db_user = db.query(User).filter(User.id == user).first()
        if db_user:
            return {"username": db_user.user_name}
        else:
            raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
