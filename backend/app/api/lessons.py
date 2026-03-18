from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.models.course import Lesson, UserProgress
from app.schemas.course import LessonResponse, UserProgressResponse

router = APIRouter()


@router.get("/{lesson_id}", response_model=LessonResponse)
def get_lesson(lesson_id: int, db: Session = Depends(get_db)):
    lesson = db.query(Lesson).filter(Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return lesson


@router.post("/{lesson_id}/progress", response_model=UserProgressResponse)
def update_progress(
    lesson_id: int,
    user_id: int,  # TODO: Get from auth token
    db: Session = Depends(get_db)
):
    # Check if lesson exists
    lesson = db.query(Lesson).filter(Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    
    # Create or update progress
    progress = db.query(UserProgress).filter(
        UserProgress.user_id == user_id,
        UserProgress.lesson_id == lesson_id
    ).first()
    
    if progress:
        progress.is_completed = True
    else:
        progress = UserProgress(
            user_id=user_id,
            lesson_id=lesson_id,
            is_completed=True
        )
        db.add(progress)
    
    db.commit()
    db.refresh(progress)
    return progress


@router.get("/{lesson_id}/progress", response_model=UserProgressResponse)
def get_progress(
    lesson_id: int,
    user_id: int,  # TODO: Get from auth token
    db: Session = Depends(get_db)
):
    progress = db.query(UserProgress).filter(
        UserProgress.user_id == user_id,
        UserProgress.lesson_id == lesson_id
    ).first()
    
    if not progress:
        raise HTTPException(status_code=404, detail="Progress not found")
    
    return progress
