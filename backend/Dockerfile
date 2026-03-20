FROM python:3.11-slim

WORKDIR /app

# 先安装系统依赖
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# 先复制 requirements.txt 利用 Docker 缓存
COPY requirements.txt .

# 安装 Python 依赖 (这一步最耗时，利用缓存)
RUN pip install --no-cache-dir -r requirements.txt

# 最后复制应用代码
COPY . .

# 暴露端口
EXPOSE 8000

# 启动命令
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
