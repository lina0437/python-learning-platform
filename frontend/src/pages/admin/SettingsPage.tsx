import { useState } from 'react'

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'payment' | 'email' | 'permission'>('general')

  const [settings, setSettings] = useState({
    // 基础设置
    siteName: 'Python 学习平台',
    siteDescription: '专业的 Python 在线学习平台',
    logo: '',
    favicon: '',
    beian: '京 ICP 备 XXXXXXXX 号',
    
    // 支付设置
    alipayEnabled: true,
    wechatEnabled: true,
    alipayAppId: '',
    wechatAppId: '',
    
    // 邮件设置
    smtpHost: 'smtp.example.com',
    smtpPort: 587,
    smtpUser: '',
    smtpPassword: '',
    fromEmail: 'noreply@pythonlearn.com',
    
    // 权限设置
    allowRegistration: true,
    requireEmailVerify: true,
    maxLoginAttempts: 5,
  })

  const handleSave = () => {
    // TODO: 调用 API 保存设置
    alert('设置已保存！')
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">系统设置</h1>
        <p className="text-neutral-600 mt-1">配置平台各项参数</p>
      </div>

      {/* 标签页导航 */}
      <div className="card p-2">
        <div className="flex space-x-2">
          {[
            { id: 'general', label: '基础设置', icon: '⚙️' },
            { id: 'payment', label: '支付设置', icon: '💳' },
            { id: 'email', label: '邮件设置', icon: '📧' },
            { id: 'permission', label: '权限设置', icon: '🔐' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 基础设置 */}
      {activeTab === 'general' && (
        <div className="card p-6 space-y-6">
          <h3 className="text-lg font-bold text-neutral-900">基础设置</h3>
          
          {/* 网站名称 */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              网站名称
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="input-base"
            />
          </div>

          {/* 网站描述 */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              网站描述
            </label>
            <textarea
              value={settings.siteDescription}
              onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
              className="input-base"
              rows={3}
            />
          </div>

          {/* Logo 上传 */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Logo
            </label>
            <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors cursor-pointer">
              <div className="text-3xl mb-2">🖼️</div>
              <p className="text-sm text-neutral-600">点击上传 Logo</p>
              <p className="text-xs text-neutral-500 mt-1">建议尺寸：200x60px，PNG 格式</p>
            </div>
          </div>

          {/* Favicon 上传 */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Favicon
            </label>
            <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors cursor-pointer">
              <div className="text-3xl mb-2">🔖</div>
              <p className="text-sm text-neutral-600">点击上传 Favicon</p>
              <p className="text-xs text-neutral-500 mt-1">建议尺寸：32x32px，ICO 或 PNG 格式</p>
            </div>
          </div>

          {/* 备案号 */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              ICP 备案号
            </label>
            <input
              type="text"
              value={settings.beian}
              onChange={(e) => setSettings({ ...settings, beian: e.target.value })}
              className="input-base"
              placeholder="京 ICP 备 XXXXXXXX 号"
            />
          </div>
        </div>
      )}

      {/* 支付设置 */}
      {activeTab === 'payment' && (
        <div className="card p-6 space-y-6">
          <h3 className="text-lg font-bold text-neutral-900">支付设置</h3>
          
          {/* 支付方式开关 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
              <div>
                <p className="font-medium text-neutral-900">支付宝支付</p>
                <p className="text-sm text-neutral-500 mt-1">启用后学员可使用支付宝付款</p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, alipayEnabled: !settings.alipayEnabled })}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.alipayEnabled ? 'bg-success-500' : 'bg-neutral-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  settings.alipayEnabled ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
              <div>
                <p className="font-medium text-neutral-900">微信支付</p>
                <p className="text-sm text-neutral-500 mt-1">启用后学员可使用微信付款</p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, wechatEnabled: !settings.wechatEnabled })}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.wechatEnabled ? 'bg-success-500' : 'bg-neutral-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  settings.wechatEnabled ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>

          {/* 支付宝配置 */}
          <div className="border-t pt-6">
            <h4 className="font-semibold text-neutral-900 mb-4">支付宝配置</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  APP ID
                </label>
                <input
                  type="text"
                  value={settings.alipayAppId}
                  onChange={(e) => setSettings({ ...settings, alipayAppId: e.target.value })}
                  className="input-base"
                  placeholder="2021..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  应用私钥
                </label>
                <textarea
                  className="input-base"
                  rows={3}
                  placeholder="MIIEvQIBADA..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  支付宝公钥
                </label>
                <textarea
                  className="input-base"
                  rows={3}
                  placeholder="MIIBIjANBg..."
                />
              </div>
            </div>
          </div>

          {/* 微信支付配置 */}
          <div className="border-t pt-6">
            <h4 className="font-semibold text-neutral-900 mb-4">微信支付配置</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  APP ID
                </label>
                <input
                  type="text"
                  value={settings.wechatAppId}
                  onChange={(e) => setSettings({ ...settings, wechatAppId: e.target.value })}
                  className="input-base"
                  placeholder="wx..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  商户号
                </label>
                <input
                  type="text"
                  className="input-base"
                  placeholder="123..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  API 密钥
                </label>
                <input
                  type="password"
                  className="input-base"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 邮件设置 */}
      {activeTab === 'email' && (
        <div className="card p-6 space-y-6">
          <h3 className="text-lg font-bold text-neutral-900">邮件设置</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                SMTP 服务器
              </label>
              <input
                type="text"
                value={settings.smtpHost}
                onChange={(e) => setSettings({ ...settings, smtpHost: e.target.value })}
                className="input-base"
                placeholder="smtp.example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                SMTP 端口
              </label>
              <input
                type="number"
                value={settings.smtpPort}
                onChange={(e) => setSettings({ ...settings, smtpPort: Number(e.target.value) })}
                className="input-base w-32"
              />
              <p className="text-xs text-neutral-500 mt-1">常用端口：25, 465(SSL), 587(TLS)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                邮箱账号
              </label>
              <input
                type="email"
                value={settings.smtpUser}
                onChange={(e) => setSettings({ ...settings, smtpUser: e.target.value })}
                className="input-base"
                placeholder="noreply@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                邮箱密码/授权码
              </label>
              <input
                type="password"
                value={settings.smtpPassword}
                onChange={(e) => setSettings({ ...settings, smtpPassword: e.target.value })}
                className="input-base"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                发件人邮箱
              </label>
              <input
                type="email"
                value={settings.fromEmail}
                onChange={(e) => setSettings({ ...settings, fromEmail: e.target.value })}
                className="input-base"
              />
            </div>

            <button className="btn-secondary">
              📧 发送测试邮件
            </button>
          </div>
        </div>
      )}

      {/* 权限设置 */}
      {activeTab === 'permission' && (
        <div className="card p-6 space-y-6">
          <h3 className="text-lg font-bold text-neutral-900">权限设置</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
              <div>
                <p className="font-medium text-neutral-900">允许新用户注册</p>
                <p className="text-sm text-neutral-500 mt-1">关闭后新用户无法注册账号</p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, allowRegistration: !settings.allowRegistration })}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.allowRegistration ? 'bg-success-500' : 'bg-neutral-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  settings.allowRegistration ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
              <div>
                <p className="font-medium text-neutral-900">注册需要邮箱验证</p>
                <p className="text-sm text-neutral-500 mt-1">开启后新用户需验证邮箱才能登录</p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, requireEmailVerify: !settings.requireEmailVerify })}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.requireEmailVerify ? 'bg-success-500' : 'bg-neutral-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  settings.requireEmailVerify ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
              <div>
                <p className="font-medium text-neutral-900">登录失败次数限制</p>
                <p className="text-sm text-neutral-500 mt-1">超过限制后账号将被临时锁定</p>
              </div>
              <input
                type="number"
                value={settings.maxLoginAttempts}
                onChange={(e) => setSettings({ ...settings, maxLoginAttempts: Number(e.target.value) })}
                className="input-base w-32"
                min="3"
                max="10"
              />
            </div>
          </div>
        </div>
      )}

      {/* 保存按钮 */}
      <div className="flex items-center justify-end space-x-3">
        <button className="btn-secondary">重置</button>
        <button onClick={handleSave} className="btn-primary">
          💾 保存设置
        </button>
      </div>
    </div>
  )
}
