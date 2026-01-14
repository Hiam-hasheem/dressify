from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional

from app.deps import get_db
from app import models, schemas

router = APIRouter(prefix="/dresses", tags=["Dresses"])

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

# ✅ CREATE DRESS
@router.post("/", response_model=schemas.DressOut)
def create_dress(dress: schemas.DressCreate, db: Session = Depends(get_db)):
    new_dress = models.Dress(
        user_id=1,  # TEMP until auth
        brand=dress.brand,
        size=dress.size,
        condition_status=dress.condition_status,
        price=dress.price,
        description=dress.description,
    )

    db.add(new_dress)
    db.commit()
    db.refresh(new_dress)
    return new_dress