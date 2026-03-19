"""
示例课程数据脚本
用于创建 Python 入门课程数据

用法:
    cd backend
    python scripts/seed_courses.py
"""

import sys
import os

# 添加项目根目录到路径
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from app.core.database import engine, SessionLocal, Base
from app.models.course import Course, Lesson

# 创建课程数据
COURSES_DATA = [
    {
        "title": "Python 入门基础",
        "description": "从零开始学习 Python 编程，适合完全没有编程基础的同学。学完后你将掌握 Python 基础语法，能够编写简单的 Python 程序。",
        "level": "beginner",
        "thumbnail_url": "",
        "lessons": [
            {
                "title": "什么是 Python",
                "content": """
# 什么是 Python

Python 是一种高级编程语言，由 Guido van Rossum 于 1989 年发明。

## Python 的特点

- **简单易学**: Python 语法简洁清晰，像英语一样易读
- **开源免费**: 完全免费，拥有庞大的社区支持
- **跨平台**: 可在 Windows、Mac、Linux 等系统上运行
- **应用广泛**: Web 开发、数据分析、人工智能、自动化脚本等

## Python 能做什么？

1. **Web 开发**: 使用 Django、Flask 等框架
2. **数据分析**: 使用 pandas、numpy 等库
3. **人工智能**: 使用 TensorFlow、PyTorch 等框架
4. **自动化脚本**: 自动处理文件、邮件、数据等
5. **爬虫**: 抓取网页数据

## 开始学习吧！

点击"下一步"开始你的 Python 学习之旅！
                """,
                "order": 1,
                "is_free": True,
            },
            {
                "title": "第一个 Python 程序",
                "content": """
# 第一个 Python 程序

让我们编写你的第一个 Python 程序！

## Hello, World!

在编程界，学习新语言的第一个程序通常是输出 "Hello, World!"

### 代码示例

```python
print("Hello, World!")
```

### 运行结果

```
Hello, World!
```

## print() 函数

`print()` 是 Python 的内置函数，用于在控制台输出内容。

### 语法

```python
print(内容)
```

### 更多示例

```python
print("你好，Python!")
print(123)
print("Python", 3.14, True)
```

## 现在试试

在右侧的代码编辑器中输入：

```python
print("Hello, Python!")
```

然后点击"运行代码"按钮！
                """,
                "order": 2,
                "is_free": True,
            },
            {
                "title": "变量和数据类型",
                "content": """
# 变量和数据类型

变量是存储数据的容器。

## 创建变量

```python
name = "Alice"
age = 25
height = 1.68
is_student = True
```

## Python 的数据类型

### 1. 字符串 (str)

```python
name = "Python"
message = 'Hello, World!'
```

### 2. 整数 (int)

```python
age = 25
count = 100
```

### 3. 浮点数 (float)

```python
price = 19.99
pi = 3.14159
```

### 4. 布尔值 (bool)

```python
is_active = True
is_finished = False
```

## 查看数据类型

```python
name = "Python"
print(type(name))  # <class 'str'>

age = 25
print(type(age))  # <class 'int'>
```

## 练习

创建一个变量存储你的名字，然后打印出来：

```python
name = "你的名字"
print(name)
```
                """,
                "order": 3,
                "is_free": False,
            },
            {
                "title": "列表和元组",
                "content": """
# 列表和元组

## 列表 (List)

列表是有序的、可变的数据集合。

### 创建列表

```python
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]
```

### 访问元素

```python
fruits = ["apple", "banana", "orange"]
print(fruits[0])  # apple
print(fruits[1])  # banana
print(fruits[-1]) # orange (最后一个)
```

### 修改列表

```python
fruits = ["apple", "banana", "orange"]
fruits[1] = "grape"
print(fruits)  # ['apple', 'grape', 'orange']
```

### 列表操作

```python
fruits = ["apple", "banana"]
fruits.append("orange")  # 添加元素
fruits.insert(1, "grape") # 插入元素
fruits.remove("apple")   # 删除元素
len(fruits)              # 获取长度
```

## 元组 (Tuple)

元组是有序的、不可变的数据集合。

```python
colors = ("red", "green", "blue")
print(colors[0])  # red
# colors[0] = "yellow"  # 错误！元组不可修改
```

## 练习

创建一个包含 3 个数字的列表，然后打印出来：

```python
numbers = [1, 2, 3]
print(numbers)
```
                """,
                "order": 4,
                "is_free": False,
            },
            {
                "title": "字典和集合",
                "content": """
# 字典和集合

## 字典 (Dictionary)

字典是键值对的集合。

### 创建字典

```python
person = {
    "name": "Alice",
    "age": 25,
    "city": "Beijing"
}
```

### 访问值

```python
person = {"name": "Alice", "age": 25}
print(person["name"])  # Alice
print(person.get("age"))  # 25
```

### 修改字典

```python
person = {"name": "Alice"}
person["age"] = 25  # 添加或修改
person.pop("name")  # 删除
```

### 遍历字典

```python
person = {"name": "Alice", "age": 25}

for key in person:
    print(key, person[key])

for key, value in person.items():
    print(key, value)
```

## 集合 (Set)

集合是无序的、不重复的元素集合。

```python
fruits = {"apple", "banana", "orange"}
fruits.add("grape")  # 添加元素
fruits.remove("apple")  # 删除元素
```

## 练习

创建一个字典表示一本书的信息：

```python
book = {
    "title": "Python 入门",
    "author": "作者名",
    "price": 59.9
}
print(book)
```
                """,
                "order": 5,
                "is_free": False,
            },
            {
                "title": "条件语句",
                "content": """
# 条件语句

条件语句用于根据不同的条件执行不同的代码。

## if 语句

```python
age = 18

if age >= 18:
    print("你已成年")
```

## if-else 语句

```python
age = 16

if age >= 18:
    print("你已成年")
else:
    print("你未成年")
```

## if-elif-else 语句

```python
score = 85

if score >= 90:
    print("优秀")
elif score >= 80:
    print("良好")
elif score >= 60:
    print("及格")
else:
    print("不及格")
```

## 比较运算符

```python
a == b  # 等于
a != b  # 不等于
a > b   # 大于
a < b   # 小于
a >= b  # 大于等于
a <= b  # 小于等于
```

## 逻辑运算符

```python
# and (与)
age = 25
if age >= 18 and age <= 60:
    print("成年人")

# or (或)
day = "Saturday"
if day == "Saturday" or day == "Sunday":
    print("周末")

# not (非)
is_raining = False
if not is_raining:
    print("出门玩")
```

## 练习

编写一个判断数字正负的程序：

```python
number = 10

if number > 0:
    print("正数")
elif number < 0:
    print("负数")
else:
    print("零")
```
                """,
                "order": 6,
                "is_free": False,
            },
        ]
    }
]


def seed_database():
    """创建示例课程数据"""
    
    print("🌱 开始创建示例课程数据...")
    
    # 创建数据库表
    Base.metadata.create_all(bind=engine)
    
    # 创建会话
    db = SessionLocal()
    
    try:
        # 检查是否已有数据
        existing_courses = db.query(Course).count()
        if existing_courses > 0:
            print(f"⚠️  数据库中已有 {existing_courses} 个课程，跳过创建")
            return
        
        # 创建课程
        for course_data in COURSES_DATA:
            # 创建课程
            course = Course(
                title=course_data["title"],
                description=course_data["description"],
                level=course_data["level"],
                thumbnail_url=course_data.get("thumbnail_url", ""),
                is_published=True,
            )
            db.add(course)
            db.flush()  # 获取课程 ID
            
            # 创建课时
            for lesson_data in course_data["lessons"]:
                lesson = Lesson(
                    course_id=course.id,
                    title=lesson_data["title"],
                    content=lesson_data["content"],
                    order=lesson_data["order"],
                    is_free=lesson_data["is_free"],
                )
                db.add(lesson)
            
            print(f"✅ 创建课程：{course.title} ({len(course_data['lessons'])} 课时)")
        
        # 提交事务
        db.commit()
        
        print("✅ 示例课程数据创建完成！")
        print(f"✅ 共创建 {len(COURSES_DATA)} 个课程")
        
    except Exception as e:
        db.rollback()
        print(f"❌ 创建失败：{e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
