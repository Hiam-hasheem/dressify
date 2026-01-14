from pydantic import BaseModel
from typing import Optional

class DressCreate(BaseModel):
    brand: str
    size: str
    condition_status: str
    price: float
    description: Optional[str] = None


class DressOut(BaseModel):
    id: int
    user_id: Optional[int]
    brand: str
    size: str
    condition_status: str
    price: float
    description: Optional[str]
    image_url: Optional[str]

    class Config:
        from_attributes = True
