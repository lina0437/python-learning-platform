from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class LessonBase(BaseModel):
    title: str
    content: Optional[str] = None
    order: int = 0
    is_free: bool = False


class LessonCreate(LessonBase):
    course_id: int


class LessonResponse(LessonBase):
    id: int
    course_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class CourseBase(BaseModel):
    title: str
    description: Optional[str] = None
    thumbnail_url: Optional[str] = None
    level: str = "beginner"


class CourseCreate(CourseBase):
    pass


class CourseUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    thumbnail_url: Optional[str] = None
    level: Optional[str] = None
    is_published: Optional[bool] = None


class CourseResponse(CourseBase):
    id: int
    is_published: bool
    created_at: datetime
    updated_at: datetime
    lessons: List[LessonResponse] = []

    class Config:
        from_attributes = True


class UserProgressBase(BaseModel):
    lesson_id: int
    is_completed: bool = False


class UserProgressResponse(UserProgressBase):
    id: int
    user_id: int
    completed_at: Optional[datetime] = None
    created_at: datetime

    class Config:
        from_attributes = True
