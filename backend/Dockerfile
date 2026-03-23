FROM python:3.11-slim

WORKDIR /app

# 配置国内 apt 源并安装依赖（一步完成，减少层数）
RUN sed -i 's|deb.debian.org|mirrors.aliyun.com|g' /etc/apt/sources.list.d/debian.sources \
    && apt-get update \
    && apt-get install -y --no-install-recommends gcc \
    && rm -rf /var/lib/apt/lists/*

# 先复制 requirements.txt 利用 Docker 缓存
COPY requirements.txt .

# 使用国内 PyPI 源安装 Python 依赖（清华源 + 阿里云镜像）
RUN pip install --no-cache-dir -r requirements.txt \
    -i https://pypi.tuna.tsinghua.edu.cn/simple \
    --trusted-host pypi.tuna.tsinghua.edu.cn

# 复制应用代码
COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
