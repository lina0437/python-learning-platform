FROM python:3.11-slim

# 替换为国内 apt 源 (加速下载)
RUN sed -i 's/deb.debian.org/mirrors.aliyun.com/g' /etc/apt/sources.list.d/debian.sources

WORKDIR /app

# 安装系统依赖
RUN apt-get update && apt-get install -y gcc \
    && rm -rf /var/lib/apt/lists/*

# 先复制 requirements.txt 利用 Docker 缓存
COPY requirements.txt .

# 使用国内 PyPI 源安装 Python 依赖
RUN pip install --no-cache-dir -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple

# 复制应用代码
COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
