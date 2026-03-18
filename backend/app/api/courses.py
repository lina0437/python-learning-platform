from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.models.course import Course, Lesson
from app.schemas.course import CourseResponse, CourseCreate, CourseUpdate, LessonResponse

router = APIRouter()


@router.get("", response_model=List[CourseResponse])
def list_courses(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    courses = db.query(Course).filter(Course.is_published == True).offset(skip).limit(limit).all()
    return courses


@router.get("/{course_id}", response_model=CourseResponse)
def get_course(course_id: int, db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course


@router.post("", response_model=CourseResponse)
def create_course(course_data: CourseCreate, db: Session = Depends(get_db)):
    db_course = Course(**course_data.model_dump())
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course


@router.get("/{course_id}/lessons", response_model=List[LessonResponse])
def list_lessons(course_id: int, db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    lessons = db.query(Lesson).filter(Lesson.course_id == course_id).order_by(Lesson.order).all()
    return lessons
