"""
视频上传 API - 阿里云 OSS 集成
"""
import oss2
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timedelta
import os
import uuid

from app.core.config import settings

router = APIRouter(prefix="/upload", tags=["上传管理"])

# OSS 配置（从环境变量读取）
OSS_ENDPOINT = os.getenv("OSS_ENDPOINT", "oss-cn-hangzhou.aliyuncs.com")
OSS_BUCKET = os.getenv("OSS_BUCKET", "python-learning-platform")
OSS_ACCESS_KEY_ID = os.getenv("OSS_ACCESS_KEY_ID", "")
OSS_ACCESS_KEY_SECRET = os.getenv("OSS_ACCESS_KEY_SECRET", "")
OSS_CDN_DOMAIN = os.getenv("OSS_CDN_DOMAIN", "")


class UploadPolicy(BaseModel):
    """上传策略"""
    file_type: str  # video, image, document
    file_size: int  # 文件大小（字节）
    file_name: str  # 文件名


class UploadResponse(BaseModel):
    """上传响应"""
    upload_url: str  # 上传 URL
    file_url: str  # 文件访问 URL
    file_id: str  # 文件 ID
    expire_time: str  # 过期时间


class VideoUploadRequest(BaseModel):
    """视频上传请求"""
    file_name: str
    file_size: int
    content_type: str


class VideoUploadResponse(BaseModel):
    """视频上传响应"""
    upload_url: str
    video_url: str
    video_id: str
    expire_time: str


def get_oss_bucket():
    """获取 OSS Bucket 实例"""
    if not OSS_ACCESS_KEY_ID or not OSS_ACCESS_KEY_SECRET:
        raise HTTPException(status_code=500, detail="OSS 配置未设置")
    
    auth = oss2.Auth(OSS_ACCESS_KEY_ID, OSS_ACCESS_KEY_SECRET)
    bucket = oss2.Bucket(auth, OSS_ENDPOINT, OSS_BUCKET)
    return bucket


@router.post("/video", response_model=VideoUploadResponse)
async def get_video_upload_url(request: VideoUploadRequest):
    """
    获取视频上传 URL（直传 OSS）
    
    使用阿里云 OSS 直传方案：
    1. 后端生成签名 URL
    2. 前端直传 OSS
    3. 上传完成后回调通知后端
    """
    try:
        bucket = get_oss_bucket()
        
        # 生成文件 ID
        file_id = str(uuid.uuid4())
        
        # 生成 OSS 对象键
        file_extension = os.path.splitext(request.file_name)[1]
        object_key = f"videos/{datetime.now().strftime('%Y/%m/%d')}/{file_id}{file_extension}"
        
        # 设置上传策略
        expire_time = datetime.now() + timedelta(hours=1)
        
        # 生成签名 URL
        upload_url = bucket.sign_url(
            'PUT',
            object_key,
            3600,  # 1 小时过期
            headers={
                'Content-Type': request.content_type,
                'Content-Length': str(request.file_size),
            }
        )
        
        # 生成访问 URL
        if OSS_CDN_DOMAIN:
            video_url = f"https://{OSS_CDN_DOMAIN}/{object_key}"
        else:
            video_url = f"https://{OSS_BUCKET}.{OSS_ENDPOINT}/{object_key}"
        
        return VideoUploadResponse(
            upload_url=upload_url,
            video_url=video_url,
            video_id=file_id,
            expire_time=expire_time.isoformat(),
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"上传失败：{str(e)}")


@router.post("/image")
async def get_image_upload_url(request: UploadPolicy):
    """获取图片上传 URL"""
    try:
        bucket = get_oss_bucket()
        
        file_id = str(uuid.uuid4())
        file_extension = os.path.splitext(request.file_name)[1]
        object_key = f"images/{datetime.now().strftime('%Y/%m/%d')}/{file_id}{file_extension}"
        
        expire_time = datetime.now() + timedelta(hours=1)
        
        upload_url = bucket.sign_url(
            'PUT',
            object_key,
            3600,
            headers={
                'Content-Type': 'image/jpeg',
                'Content-Length': str(request.file_size),
            }
        )
        
        if OSS_CDN_DOMAIN:
            file_url = f"https://{OSS_CDN_DOMAIN}/{object_key}"
        else:
            file_url = f"https://{OSS_BUCKET}.{OSS_ENDPOINT}/{object_key}"
        
        return UploadResponse(
            upload_url=upload_url,
            file_url=file_url,
            file_id=file_id,
            expire_time=expire_time.isoformat(),
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"上传失败：{str(e)}")


@router.delete("/{file_id}")
async def delete_file(file_id: str):
    """删除文件"""
    try:
        bucket = get_oss_bucket()
        
        # 注意：实际应用中需要根据 file_id 查询到 object_key
        # 这里简化处理
        object_key = f"videos/{file_id}"
        
        bucket.delete_object(object_key)
        
        return {"message": "删除成功"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"删除失败：{str(e)}")


@router.get("/list")
async def list_files(prefix: Optional[str] = None):
    """列出文件"""
    try:
        bucket = get_oss_bucket()
        
        files = []
        for obj in oss2.ObjectIterator(bucket, prefix=prefix or ''):
            files.append({
                'key': obj.key,
                'size': obj.size,
                'last_modified': obj.last_modified,
                'etag': obj.etag,
            })
        
        return {"files": files}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"列出失败：{str(e)}")
