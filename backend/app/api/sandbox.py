from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import httpx

from app.core.config import settings

router = APIRouter()


class CodeExecuteRequest(BaseModel):
    code: str
    language_id: int = 71  # Python 3.8.1


class CodeExecuteResponse(BaseModel):
    output: str
    error: str = ""
    execution_time: float = 0


@router.post("/execute", response_model=CodeExecuteResponse)
async def execute_code(request: CodeExecuteRequest):
    """
    Execute Python code using Judge0 API
    """
    try:
        async with httpx.AsyncClient() as client:
            # Submit code for execution
            submit_response = await client.post(
                f"{settings.JUDGE0_API_URL}/submissions",
                params={"base64_encoded": False, "wait": False},
                json={
                    "source_code": request.code,
                    "language_id": request.language_id,
                }
            )
            
            if submit_response.status_code != 201:
                raise HTTPException(status_code=500, detail="Failed to submit code")
            
            submission_token = submit_response.json()["token"]
            
            # Get execution result
            result_response = await client.get(
                f"{settings.JUDGE0_API_URL}/submissions/{submission_token}",
                params={"base64_encoded": False, "wait": True}
            )
            
            if result_response.status_code != 200:
                raise HTTPException(status_code=500, detail="Failed to get execution result")
            
            result = result_response.json()
            
            return CodeExecuteResponse(
                output=result.get("stdout", ""),
                error=result.get("stderr", "") or result.get("compile_output", ""),
                execution_time=result.get("time", 0)
            )
            
    except httpx.RequestError as e:
        raise HTTPException(status_code=503, detail=f"Code execution service unavailable: {str(e)}")


@router.get("/languages")
async def get_languages():
    """
    Get supported programming languages
    """
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{settings.JUDGE0_API_URL}/languages")
            return response.json()
    except httpx.RequestError:
        raise HTTPException(status_code=503, detail="Code execution service unavailable")
