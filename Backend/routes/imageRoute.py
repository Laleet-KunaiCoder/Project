from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from sqlmodel import Session
from typing import Annotated

from database.db import *
from model.user import *

import requests
from azure.storage.blob import BlobClient, BlobServiceClient, ContainerClient
from fastapi import Depends, FastAPI, File, Form, HTTPException, UploadFile
from fastapi.responses import JSONResponse, StreamingResponse
from sqlmodel import Session, SQLModel, create_engine

from database.db import get_session
from model.user import BirdImage, User
from util.authUtil import get_current_user
from dotenv import load_dotenv
import os
import google.generativeai as genai
load_dotenv()
connection_string = os.getenv("connection_string")
container_name = os.getenv("container_name")

API_URL = os.getenv("ml_api_url")
headers = {"Authorization": os.getenv("header_auth_key")}

genai.configure(api_key=os.getenv("g_api_key"))
model = genai.GenerativeModel('gemini-pro')

def query1(image_url):
    # Download the image data from the provided URL
    image_data = requests.get(image_url).content
    # Make the API request with the image data
    response = requests.post(API_URL, headers=headers, data=image_data)
    return response.json()

blob_service_client = BlobServiceClient.from_connection_string(connection_string)

router = APIRouter()

@router.get("/view-image/{image_name}")
def view_image( image_name: str ,user: dict = Depends(get_current_user)):
    # Construct the URL to the blob

    blob_url = f"https://birdfeeder.blob.core.windows.net/imagefiles//{image_name}"

    # Fetch the image from the blob storage
    response = requests.get(blob_url)

    # Check if the request was successful
    if response.status_code == 200:
        # Get the content type of the image
        content_type = response.headers.get("Content-Type", "image/png")  # Default to image/png if content type is not provided

        # Return the image as a streaming response
        return StreamingResponse(iter([response.content]), media_type=content_type)

    # Return a 404 Not Found if the image couldn't be fetched
    return JSONResponse(status_code=404, content={"message": "Image not found"})




@router.post("/devices/upload-image/")
async def upload_device_image(
    device_id: int,
    file: UploadFile = File(...),
    session: Session = Depends(get_session)
):
    try:
        # Check if the device exists
        device = session.query(Device).filter(Device.id == device_id).first()
        if not device:
            return JSONResponse(status_code=404, content={"message": "Device not found"})

        # Create a blob client using the container name and a unique blob name
        blob_client = BlobClient.from_connection_string(
            conn_str=connection_string,
            container_name=container_name,
            blob_name=f"/{file.filename}"
        )

        # Upload the file data to the blob
        contents = await file.read()
        blob_client.upload_blob(contents)

        # Get the URL of the uploaded blob
        blob_url = blob_client.url

        output = query1(blob_url)
        bird_name = output[0]['label']
        # print(bird_name)
        response = model.generate_content(f"Give information for {bird_name}")
        info = response.text
        
        # Update BirdImage table with the URL
        bird_image = BirdImage(
            url=blob_url,
            description=bird_name,
            created_at=datetime.now(timezone.utc),
            device_id=device_id,
            user_id=device.user_id
        )
        session.add(bird_image)
        session.commit()

        # Return a response with the URL
        return JSONResponse(
            status_code=200,
            content={"device_id": device_id, "filename": file.filename, "url": blob_url}
        )
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
    



@router.get("/user/images/")
async def get_user_images( current_user_id: dict = Depends(get_current_user), session: Session = Depends(get_session)):
    try:  

        # Query the database for images uploaded by the user
        images = session.query(BirdImage).filter(BirdImage.user_id == current_user_id).all()
        for image in images:
            image.created_at = image.created_at.isoformat()
        return JSONResponse(status_code=200, content={"images": [image.dict() for image in images]})

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
    
@router.get("/images/")
async def get_all_images(session: Session = Depends(get_session)):
    try:
        # Query the database for all images
        images = session.query(BirdImage).all()
        for image in images:
            image.created_at = image.created_at.isoformat()
        # Return the images as JSON response
        return JSONResponse(status_code=200, content={"images": [image.dict() for image in images]})

    except Exception as e:
        # Return an error response if an exception occurs
        return JSONResponse(status_code=500, content={"error": str(e)})