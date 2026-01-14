from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.database import engine, Base
from app.routers import dresses

app = FastAPI(title="Dressify API")
app.mount("/uploads", StaticFiles(directory="app/uploads"), name="uploads")
# ✅ CORS (VERY IMPORTANT)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Create DB tables
Base.metadata.create_all(bind=engine)

# ✅ Routes
app.include_router(dresses.router)

@app.get("/")
def root():
    return {"message": "Dressify backend running"}