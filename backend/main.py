from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import auth, courses, lessons, sandbox, users
from app.core.config import settings

app = FastAPI(
    title="Python Learning Platform API",
    description="API for Python interactive learning platform",
    version="0.1.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(courses.router, prefix="/api/courses", tags=["courses"])
app.include_router(lessons.router, prefix="/api/lessons", tags=["lessons"])
app.include_router(sandbox.router, prefix="/api/sandbox", tags=["sandbox"])


@app.get("/")
def root():
    return {"message": "Python Learning Platform API", "version": "0.1.0"}


@app.get("/health")
def health():
    return {"status": "healthy"}
