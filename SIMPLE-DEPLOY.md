# 🚀 极简部署指南 - Supermem.io

## 核心功能
- ✅ Traefik 反向代理
- ✅ 自动 HTTPS (Let's Encrypt)
- ✅ HTTP → HTTPS 自动重定向
- ❌ 无健康检查
- ❌ 无控制面板

## 📋 前置要求

1. **Cloudflare DNS 配置**
```
类型: A
名称: @
内容: YOUR_SERVER_IP
代理: DNS only (灰色云)

类型: A
名称: www
内容: YOUR_SERVER_IP
代理: DNS only (灰色云)
```

2. **Cloudflare API Token**
- 访问: https://dash.cloudflare.com/profile/api-tokens
- 创建 Token: "Edit zone DNS" 模板
- 权限: Zone.DNS.Edit + Zone.Zone.Read
- 作用域: supermem.io

## 🚀 快速部署

### 1. 准备环境
```bash
# 创建 Docker 网络
docker network create proxy

# 创建配置文件
cat > .env << 'EOF'
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_key_here
CF_API_EMAIL=diamond.shx@gmail.com
CF_DNS_API_TOKEN=your_cloudflare_token
NODE_ENV=production
EOF
```

### 2. 启动服务
```bash
docker compose up -d
```

### 3. 查看日志
```bash
docker compose logs -f
```

就这么简单！🎉

## 📁 文件结构

```
.
├── docker-compose.yml      # 服务配置（极简版）
├── Dockerfile              # 应用镜像
├── traefik/
│   ├── traefik.yml        # Traefik 配置
│   └── acme.json          # SSL 证书存储
├── .env                   # 环境变量
└── server.js              # Node.js 应用
```

## ✅ 验证部署

```bash
# 检查服务状态
docker compose ps

# 测试 HTTPS
curl https://supermem.io/api/health

# 浏览器访问
open https://supermem.io
```

## 🔧 常用命令

```bash
# 查看日志
docker compose logs -f

# 重启服务
docker compose restart

# 停止服务
docker compose down

# 更新应用
docker compose down
docker compose build --no-cache
docker compose up -d
```

## 🆘 故障排查

### SSL 证书未生成
```bash
# 查看 Traefik 日志
docker compose logs traefik

# 检查 DNS
dig supermem.io

# 确认 API Token
docker compose exec traefik env | grep CF_
```

### 无法访问
```bash
# 检查容器
docker compose ps

# 检查端口
sudo netstat -tulpn | grep -E ':(80|443)'

# 检查防火墙
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

## 📝 配置说明

### docker-compose.yml
- Traefik: 反向代理 + SSL
- supermem-waitlist: 你的应用

### traefik/traefik.yml
- 监听 80 和 443 端口
- 使用 Cloudflare DNS Challenge
- 自动申请和续期证书

### .env
- SUPABASE_URL: Supabase 项目地址
- SUPABASE_ANON_KEY: Supabase 公钥
- CF_API_EMAIL: Cloudflare 邮箱
- CF_DNS_API_TOKEN: Cloudflare API Token

## 🔒 安全提示

配置文件已经包含：
- HTTP 自动跳转 HTTPS
- Let's Encrypt 自动证书
- Docker socket 只读挂载

不包含（按需添加）：
- 速率限制
- 安全头部
- 访问日志

## 📊 监控（可选）

如需监控，可以添加：
```bash
# 查看资源使用
docker stats

# 查看应用日志
docker compose logs -f supermem-waitlist

# 查看 Traefik 日志
docker compose logs -f traefik
```

---

**配置极简，功能完整！** 🎯

