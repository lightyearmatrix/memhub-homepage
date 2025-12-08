# 网络访问配置说明

## 服务器配置

服务器现在配置为：
- **端口**: 8080
- **监听地址**: 0.0.0.0 (所有网络接口)

这意味着服务器可以从同一网络的其他设备访问。

## 访问方式

### 1. 本地访问
```
http://localhost:8080
http://127.0.0.1:8080
```

### 2. 局域网访问

从同一 WiFi/网络的其他设备访问：

#### 查找本机 IP 地址

**macOS/Linux:**
```bash
# 方法 1
ifconfig | grep "inet "

# 方法 2
ipconfig getifaddr en0  # WiFi
ipconfig getifaddr en1  # 以太网
```

**Windows:**
```cmd
ipconfig
```

找到类似 `192.168.x.x` 或 `10.x.x.x` 的地址。

#### 访问示例
假设你的本机 IP 是 `192.168.1.100`，则其他设备可以通过以下地址访问：

```
http://192.168.1.100:8080
http://192.168.1.100:8080/index.html
http://192.168.1.100:8080/waitlist.html
```

## 防火墙配置

### macOS
如果无法从其他设备访问，可能需要允许端口 8080：

```bash
# 查看防火墙状态
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate

# 如果需要，添加 Node.js 到允许列表
# 系统偏好设置 → 安全性与隐私 → 防火墙 → 防火墙选项
```

### Linux (UFW)
```bash
# 允许端口 8080
sudo ufw allow 8080

# 查看状态
sudo ufw status
```

### Windows
```powershell
# 添加防火墙规则（以管理员身份运行）
New-NetFirewallRule -DisplayName "Supermem Server" -Direction Inbound -LocalPort 8080 -Protocol TCP -Action Allow
```

## 测试连接

### 1. 测试服务器是否运行
```bash
curl http://localhost:8080/api/health
```

期望输出：
```json
{
  "success": true,
  "message": "Server is running",
  "supabase": {
    "connected": true,
    "url": "https://xxxxx.supabase.co"
  }
}
```

### 2. 从其他设备测试
在其他设备的浏览器中访问：
```
http://YOUR_LOCAL_IP:8080/api/health
```

或使用 curl：
```bash
curl http://YOUR_LOCAL_IP:8080/api/health
```

## 移动设备测试

### 扫描二维码访问

可以使用在线工具生成二维码，让移动设备快速访问：

1. 访问 https://www.qr-code-generator.com/
2. 输入 `http://YOUR_LOCAL_IP:8080/waitlist.html`
3. 用手机扫描二维码

### 移动浏览器直接输入

在手机浏览器中输入：
```
http://YOUR_LOCAL_IP:8080/waitlist.html?from=mobile-test
```

## 生产环境部署

### 使用环境变量配置端口

在生产环境中，可以通过环境变量配置端口：

**修改 server.js:**
```javascript
const PORT = process.env.PORT || 8080;
```

**启动时指定端口:**
```bash
PORT=3000 node server.js
```

### 使用反向代理

在生产环境中，建议使用 Nginx 或 Caddy 作为反向代理：

**Nginx 配置示例:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Docker 部署

**Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "server.js"]
```

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  supermem-waitlist:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SUPABASE_URL=${SUPABASE_URL}
      - SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
    restart: unless-stopped
```

## 安全建议

### 1. 生产环境不要暴露 0.0.0.0

在生产环境中，只监听特定 IP 或使用反向代理：

```javascript
// 只监听 localhost (更安全)
const HOST = '127.0.0.1';

// 或监听特定内网 IP
const HOST = '192.168.1.100';
```

### 2. 使用 HTTPS

在生产环境中务必使用 HTTPS：
- 使用 Let's Encrypt 获取免费 SSL 证书
- 配置 Nginx/Caddy 处理 HTTPS

### 3. Rate Limiting

添加速率限制防止滥用：

```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 分钟
    max: 100 // 限制 100 次请求
});

app.use('/api/', limiter);
```

### 4. CORS 配置

在生产环境中限制 CORS 来源：

```javascript
const cors = require('cors');

app.use(cors({
    origin: ['https://yourdomain.com', 'https://www.yourdomain.com'],
    methods: ['GET', 'POST'],
    credentials: true
}));
```

## 故障排查

### 问题：无法从其他设备访问

**检查清单：**
1. ✓ 服务器是否运行？`curl http://localhost:8080/api/health`
2. ✓ 防火墙是否允许端口 8080？
3. ✓ 设备是否在同一网络？
4. ✓ IP 地址是否正确？`ifconfig` / `ipconfig`
5. ✓ 是否使用了 VPN？（可能影响本地网络访问）

### 问题：CORS 错误

如果在浏览器控制台看到 CORS 错误，检查：
1. `waitlist.html` 中的 API URL 是否正确
2. 服务器是否启用了 CORS 中间件

### 问题：Cannot find module

确保安装了所有依赖：
```bash
npm install
```

## 监控和日志

### 实时监控请求

服务器会在控制台输出所有请求：

```bash
✅ New waitlist submission: user@example.com
❌ Error saving submission: Network error
```

### 查看所有提交

访问：
```
http://localhost:8080/api/submissions
```

或使用 curl：
```bash
curl http://localhost:8080/api/submissions | jq
```

## 常用命令

```bash
# 启动服务器
node server.js

# 后台运行（使用 PM2）
npm install -g pm2
pm2 start server.js --name supermem-waitlist

# 查看日志
pm2 logs supermem-waitlist

# 停止服务
pm2 stop supermem-waitlist

# 重启服务
pm2 restart supermem-waitlist
```

