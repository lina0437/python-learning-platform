from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional

from app.core.database import get_db
from app.models.user import User
from app.schemas.user import UserResponse, UserUpdate

router = APIRouter()


@router.get("/me", response_model=UserResponse)
def get_current_user(
    user_id: int,  # TODO: Get from auth token
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.put("/me", response_model=UserResponse)
def update_current_user(
    user_data: UserUpdate,
    user_id: int,  # TODO: Get from auth token
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    update_data = user_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(user, field, value)
    
    db.commit()
    db.refresh(user)
    return user


@router.get("/{user_id}/progress")
def get_user_progress(
    user_id: int,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Calculate progress
    total_lessons = 0  # TODO: Calculate from database
    completed_lessons = len(user.progress)
    progress_percentage = (completed_lessons / total_lessons * 100) if total_lessons > 0 else 0
    
    return {
        "user_id": user_id,
        "completed_lessons": completed_lessons,
        "total_lessons": total_lessons,
        "progress_percentage": progress_percentage
    }
