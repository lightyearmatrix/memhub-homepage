# Supermem Waitlist - 生产环境部署指南

## 🚀 使用 Docker + Traefik 部署到 supermem.io

本指南将帮助你使用 Docker Compose 和 Traefik 部署应用到生产环境，并自动获取 Let's Encrypt SSL 证书。

## 📋 前置要求

### 1. 服务器要求
- VPS 或云服务器（推荐: DigitalOcean, AWS EC2, Linode）
- 操作系统: Ubuntu 20.04+ / Debian 11+ / CentOS 8+
- 最低配置: 1 CPU, 1GB RAM, 20GB 存储
- 公网 IP 地址

### 2. 域名配置
- 域名: `supermem.io`
- DNS 托管在 Cloudflare（推荐）
- A 记录指向服务器 IP

### 3. 软件要求
```bash
# 检查 Docker 版本
docker --version  # 需要 20.10+

# 检查 Docker Compose 版本
docker compose version  # 需要 2.0+
```

## 🔧 安装 Docker 和 Docker Compose

### Ubuntu/Debian
```bash
# 更新包索引
sudo apt update

# 安装依赖
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# 添加 Docker 官方 GPG 密钥
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 添加 Docker 仓库
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 安装 Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# 将当前用户添加到 docker 组
sudo usermod -aG docker $USER
newgrp docker

# 验证安装
docker --version
docker compose version
```

### CentOS/RHEL
```bash
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

## 🌐 配置 Cloudflare DNS

### 1. 添加 DNS 记录

登录 [Cloudflare Dashboard](https://dash.cloudflare.com)，添加以下记录:

| 类型 | 名称 | 内容 | 代理状态 | TTL |
|------|------|------|----------|-----|
| A | @ | YOUR_SERVER_IP | DNS only (灰色云) | Auto |
| A | www | YOUR_SERVER_IP | DNS only (灰色云) | Auto |
| A | traefik | YOUR_SERVER_IP | DNS only (灰色云) | Auto |

**重要**: SSL/TLS 模式设置为 **DNS only**（灰色云），让 Traefik 直接处理 SSL。

### 2. 获取 Cloudflare API Token

1. 访问 [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. 点击 "Create Token"
3. 使用 "Edit zone DNS" 模板
4. 权限设置:
   - Zone - DNS - Edit
   - Zone - Zone - Read
5. Zone Resources:
   - Include - Specific zone - supermem.io
6. 创建并复制 Token

## 📦 部署步骤

### 1. 上传代码到服务器

```bash
# 在本地打包代码
cd /Users/shanghaoxin/Documents/work/memery-homepage
tar -czf supermem-waitlist.tar.gz \
  --exclude='node_modules' \
  --exclude='.git' \
  --exclude='*.md' \
  .

# 上传到服务器
scp supermem-waitlist.tar.gz user@YOUR_SERVER_IP:~/

# 在服务器上解压
ssh user@YOUR_SERVER_IP
mkdir -p ~/supermem-waitlist
cd ~/supermem-waitlist
tar -xzf ../supermem-waitlist.tar.gz
```

### 2. 配置环境变量

```bash
cd ~/supermem-waitlist

# 创建 .env 文件
cp .env.production .env

# 编辑配置
nano .env
```

填入以下信息:
```env
# Supabase Configuration
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Cloudflare API
CF_API_EMAIL=diamond.shx@gmail.com
CF_DNS_API_TOKEN=your_cloudflare_api_token_here

# Node Environment
NODE_ENV=production
```

### 3. 设置 Traefik 配置

```bash
# 创建 acme.json 文件（存储 SSL 证书）
touch traefik/acme.json
chmod 600 traefik/acme.json

# 创建 Docker 网络
docker network create proxy
```

### 4. 启动服务

```bash
# 构建并启动服务
docker compose up -d

# 查看日志
docker compose logs -f

# 检查服务状态
docker compose ps
```

### 5. 验证部署

```bash
# 检查健康状态
curl http://localhost:8080/api/health

# 测试 HTTPS
curl https://supermem.io/api/health

# 查看 Traefik dashboard
# 访问 https://traefik.supermem.io
# 用户名: admin
# 密码: 使用下面命令生成的密码
echo $(htpasswd -nb admin your_password) | sed -e s/\\$/\\$\\$/g
```

## 🔒 安全配置

### 1. 配置防火墙

```bash
# UFW (Ubuntu/Debian)
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable

# firewalld (CentOS/RHEL)
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

### 2. 更新 CORS 配置

编辑 `server.js`:

```javascript
app.use(cors({
    origin: ['https://supermem.io', 'https://www.supermem.io'],
    methods: ['GET', 'POST'],
    credentials: true
}));
```

### 3. 添加速率限制

在 `traefik/config.yml` 中已配置:
- 平均 100 请求/秒
- 突发 50 请求

## 📊 监控和维护

### 查看日志

```bash
# 应用日志
docker compose logs -f supermem-waitlist

# Traefik 日志
docker compose logs -f traefik

# 查看最近 100 行
docker compose logs --tail=100 supermem-waitlist
```

### 更新应用

```bash
# 拉取最新代码
cd ~/supermem-waitlist
git pull  # 或重新上传

# 重新构建并启动
docker compose down
docker compose build --no-cache
docker compose up -d
```

### 备份数据

```bash
# 备份 Traefik 证书
cp traefik/acme.json traefik/acme.json.backup

# 备份环境配置
cp .env .env.backup
```

### 查看资源使用

```bash
# 查看容器资源使用
docker stats

# 查看磁盘使用
docker system df

# 清理未使用的镜像
docker system prune -a
```

## 🔄 自动重启配置

已在 `docker-compose.yml` 中配置 `restart: unless-stopped`，容器会在:
- 服务器重启后自动启动
- 容器崩溃后自动重启

## 🌍 域名变更

如需更改域名，需要修改:

1. **docker-compose.yml**:
```yaml
- "traefik.http.routers.supermem-secure.rule=Host(`新域名.com`) || Host(`www.新域名.com`)"
```

2. **traefik/traefik.yml**:
```yaml
certificatesResolvers:
  cloudflare:
    acme:
      email: your-email@example.com
```

3. 重新部署:
```bash
docker compose down
docker compose up -d
```

## ❌ 故障排查

### 问题：SSL 证书获取失败

```bash
# 检查 Cloudflare API Token 是否正确
docker compose logs traefik | grep -i "cloudflare"

# 确认 DNS 记录已生效
dig supermem.io
nslookup supermem.io

# 检查 acme.json 权限
ls -la traefik/acme.json  # 应该是 600
```

### 问题：网站无法访问

```bash
# 检查容器状态
docker compose ps

# 检查端口监听
sudo netstat -tulpn | grep -E ':(80|443|8080)'

# 检查防火墙
sudo ufw status
```

### 问题：数据库连接失败

```bash
# 检查环境变量
docker compose exec supermem-waitlist env | grep SUPABASE

# 测试 Supabase 连接
docker compose exec supermem-waitlist node -e "
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
supabase.from('waitlist_submissions').select('count').then(console.log);
"
```

## 📈 性能优化

### 1. 启用 Gzip 压缩

在 `traefik/config.yml` 添加:
```yaml
http:
  middlewares:
    compress:
      compress: {}
```

### 2. 配置缓存

```yaml
http:
  middlewares:
    cache:
      headers:
        customResponseHeaders:
          Cache-Control: "public, max-age=31536000"
```

### 3. 使用 CDN

在 Cloudflare 中:
1. 将代理状态改为 "Proxied" (橙色云)
2. 启用 Auto Minify (CSS, JS, HTML)
3. 启用 Brotli 压缩

## 🔐 SSL 证书管理

### 证书自动续期
Traefik 会自动续期证书（Let's Encrypt 证书 90 天有效期）

### 手动续期（如需要）
```bash
# 删除旧证书
rm traefik/acme.json
touch traefik/acme.json
chmod 600 traefik/acme.json

# 重启 Traefik
docker compose restart traefik
```

### 查看证书信息
```bash
# 查看证书详情
openssl s_client -connect supermem.io:443 -servername supermem.io < /dev/null 2>/dev/null | openssl x509 -noout -dates
```

## 📞 支持

- 查看更多文档: `SETUP.md`, `AD-TRACKING.md`, `NETWORK-ACCESS.md`
- Traefik 文档: https://doc.traefik.io/traefik/
- Docker 文档: https://docs.docker.com/
- Cloudflare 文档: https://developers.cloudflare.com/

## ✅ 部署检查清单

- [ ] Docker 和 Docker Compose 已安装
- [ ] Cloudflare DNS 记录已配置（灰色云）
- [ ] Cloudflare API Token 已创建
- [ ] `.env` 文件已正确配置
- [ ] `acme.json` 权限设置为 600
- [ ] Docker 网络 `proxy` 已创建
- [ ] 防火墙已配置（80, 443, 22）
- [ ] 服务已启动: `docker compose ps`
- [ ] SSL 证书已获取: `curl https://supermem.io`
- [ ] 健康检查通过: `curl https://supermem.io/api/health`
- [ ] Traefik dashboard 可访问
- [ ] 表单提交功能正常
- [ ] 数据正确保存到 Supabase

🎉 恭喜！你的 Supermem Waitlist 已成功部署到 https://supermem.io

