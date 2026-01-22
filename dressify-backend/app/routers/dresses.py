from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import Optional
import os
import shutil
from datetime import datetime

from app.deps import get_db
from app import models, schemas

router = APIRouter(prefix="/dresses", tags=["Dresses"])

# Create uploads directory if it doesn't exist
UPLOAD_DIR = "app/uploads/dresses"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# ✅ GET ALL DRESSES (WITH OPTIONAL FILTERS)
@router.get("/", response_model=list[schemas.DressOut])
def list_dresses(
    db: Session = Depends(get_db),
    size: Optional[str] = Query(None),
    condition: Optional[str] = Query(None),
    min_price: Optional[float] = Query(None),
    max_price: Optional[float] = Query(None),
    search: Optional[str] = Query(None),
):
    query = db.query(models.Dress)

    if size:
        query = query.filter(models.Dress.size == size)

    if condition:
        query = query.filter(models.Dress.condition_status == condition)

    if min_price is not None:
        query = query.filter(models.Dress.price >= min_price)

    if max_price is not None:
        query = query.filter(models.Dress.price <= max_price)

    if search:
        query = query.filter(models.Dress.brand.ilike(f"%{search}%"))

    return query.all()

# ✅ GET SINGLE DRESS
@router.get("/{dress_id}", response_model=schemas.DressOut)
def get_dress(dress_id: int, db: Session = Depends(get_db)):
    dress = db.query(models.Dress).filter(models.Dress.id == dress_id).first()
    if not dress:
        raise HTTPException(status_code=404, detail="Dress not found")
    return dress

# ✅ CREATE DRESS WITH IMAGE UPLOAD
@router.post("/", response_model=schemas.DressOut)
async def create_dress(
    brand: str = Form(...),
    size: str = Form(...),
    condition_status: str = Form(...),
    price: float = Form(...),
    description: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    image_url = None
    
    # Handle image upload
    if image:
        # Generate unique filename
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        file_extension = os.path.splitext(image.filename)[1]
        filename = f"{timestamp}_{image.filename}"
        file_path = os.path.join(UPLOAD_DIR, filename)
        
        # Save file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        
        # Create URL for frontend
        image_url = f"/uploads/dresses/{filename}"
    
    # Create dress in database
    new_dress = models.Dress(
        user_id=1,  # TEMP until auth
        brand=brand,
        size=size,
        condition_status=condition_status,
        price=price,
        description=description,
        image_url=image_url
    )

    db.add(new_dress)
    db.commit()
    db.refresh(new_dress)
    return new_dress