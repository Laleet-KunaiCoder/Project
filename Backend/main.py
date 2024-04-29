import select

import requests
from azure.storage.blob import BlobClient, BlobServiceClient, ContainerClient
from fastapi import Depends, FastAPI, File, Form, HTTPException, UploadFile
from fastapi.responses import JSONResponse
from sqlmodel import Session, SQLModel, create_engine

from database.db import create_db_and_tables, get_session
from model.user import BirdImage
from routes import authRoute,imageRoute,userRoute,deviceRoute
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with your React app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.include_router(authRoute.router)
app.include_router(imageRoute.router)
app.include_router(userRoute.router)
app.include_router(deviceRoute.router)

