import { useState } from 'react'
import Editor from '@monaco-editor/react'

export default function LessonPage() {
  const [code, setCode] = useState('# 在这里编写你的代码\nprint("Hello, Python!")')
  const [output, setOutput] = useState('')
  const [running, setRunning] = useState(false)

  const runCode = async () => {
    setRunning(true)
    try {
      // TODO: 调用后端 API 执行代码
      const response = await fetch('/api/sandbox/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      const result = await response.json()
      setOutput(result.output || result.error)
    } catch (error) {
      const message = error instanceof Error ? error.message : '未知错误'
      setOutput('执行失败：' + message)
    } finally {
      setRunning(false)
    }
  }

  return (
    <div className="h-[calc(100vh-64px)] flex">
      {/* Left: Lesson Content */}
      <div className="w-1/3 border-r overflow-y-auto p-6 bg-white">
        <h1 className="text-2xl font-bold mb-4">第一个 Python 程序</h1>
        <div className="prose">
          <p>欢迎来到 Python 的世界！</p>
          <p>在这一课中，我们将学习如何编写并运行你的第一个 Python 程序。</p>
          <h3>任务</h3>
          <p>在右侧的编辑器中输入以下代码，然后点击"运行"按钮：</p>
          <pre className="bg-gray-100 p-4 rounded-lg">
            <code>print("Hello, Python!")</code>
          </pre>
        </div>
      </div>

      {/* Right: Code Editor + Output */}
      <div className="w-2/3 flex flex-col">
        {/* Editor */}
        <div className="flex-1 border-b">
          <Editor
            height="100%"
            language="python"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || '')}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
            }}
          />
        </div>

        {/* Output */}
        <div className="h-1/3 bg-gray-900 text-white p-4 overflow-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">输出结果</span>
            <button 
              onClick={runCode}
              disabled={running}
              className="btn-primary text-sm"
            >
              {running ? '运行中...' : '运行代码'}
            </button>
          </div>
          <pre className="font-mono text-sm">{output || '点击"运行代码"查看结果'}</pre>
        </div>
      </div>
    </div>
  )
}
