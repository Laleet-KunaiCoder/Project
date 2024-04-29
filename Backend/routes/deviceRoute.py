from fastapi import APIRouter
from sqlmodel import Session

from database.db import *
from util.authUtil import *
from model.user import *
router=APIRouter()

@router.post("/createdevice")
async def create_device(device_data: DeviceCreate, curret_user_id: dict = Depends(get_current_user), db: Session = Depends(get_session)):
    try:
        new_device = Device(**device_data.model_dump(), user_id=curret_user_id)
        db.add(new_device)
        db.commit()
        db.refresh(new_device)
        return {"message": "Device created successfully", "device": new_device}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    

@router.get("/devices")
async def get_user_devices(curret_user_id: dict = Depends(get_current_user), db: Session = Depends(get_session)):
    try:
        devices = db.query(Device).filter(Device.user_id == curret_user_id).all()
        return {"devices": devices}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.delete("/devices/{device_id}")
async def delete_device(device_id: int, curret_user_id: dict = Depends(get_current_user), db: Session = Depends(get_session)):
    try:
        device = db.query(Device).filter(Device.id == device_id, Device.user_id == curret_user_id).first()
        if not device:
            raise HTTPException(status_code=404, detail="Device not found")
        
        db.delete(device)
        db.commit()
        return {"message": "Device deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.put("/devices/{device_id}/location")
async def update_device_location(device_id: int, location_update: DeviceLocationUpdate, curret_user_id: dict = Depends(get_current_user), db: Session = Depends(get_session)):
    try:
        device = db.query(Device).filter(Device.id == device_id, Device.user_id == curret_user_id).first()
        if not device:
            raise HTTPException(status_code=404, detail="Device not found")
        
        device.latitude = location_update.latitude
        device.longitude = location_update.longitude

        db.commit()

        return {"message": "Device location updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))