from datetime import datetime, timezone
from decimal import Decimal
from typing import List

from sqlmodel import Field, Relationship, SQLModel


class User(SQLModel, table=True):
    id: int = Field(primary_key=True)
    user_name: str
    email: str = Field(index=True, unique=True)  # Required and unique email field
    hashed_password: str  # Required password field
    info: str
    devices: List['Device'] = Relationship(back_populates="user")
    images: List['BirdImage'] = Relationship(back_populates="user")  # Relationship to images uploaded by the user


class UserCreate(SQLModel):
    email: str
    user_name: str
    password: str
    info: str


class UserLogin(SQLModel):
    email: str
    password: str


class Device(SQLModel, table=True):
    id: int = Field(primary_key=True)
    device_id: str = Field(unique=True)  # Required and unique device_id field
    latitude: Decimal
    longitude: Decimal
    user_id: int = Field(foreign_key="user.id", index=True)  # Required user_id with index
    images: List['BirdImage'] = Relationship(back_populates="device")
    user: "User" = Relationship(back_populates="devices")


class DeviceCreate(SQLModel):
    device_id: str
    latitude: float
    longitude: float
    
class DeviceLocationUpdate(SQLModel):
    latitude: float
    longitude: float

class BirdImage(SQLModel, table=True):
    id: int = Field(primary_key=True)
    url: str
    description: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    device_id: int = Field(foreign_key="device.id", index=True)  # Required device_id with index
    user_id: int = Field(foreign_key="user.id", index=True)  # Required user_id with index
    device: "Device" = Relationship(back_populates="images")
    user: "User" = Relationship(back_populates="images")
