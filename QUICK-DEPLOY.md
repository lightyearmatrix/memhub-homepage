# 🚀 快速部署指南 - Supermem.io

## 一键部署脚本

```bash
# 1. 克隆或上传代码到服务器
cd ~
# 上传你的代码到这里

# 2. 配置环境变量
cd supermem-waitlist
cp .env.example.production .env
nano .env  # 填入你的配置

# 3. 创建 Docker 网络
docker network create proxy

# 4. 设置证书文件权限
chmod 600 traefik/acme.json

# 5. 启动服务
docker compose up -d

# 6. 查看日志
docker compose logs -f
```

## 必需配置

### 1. Cloudflare DNS 设置

登录 https://dash.cloudflare.com，添加 DNS 记录:

```
Type: A
Name: @
Content: YOUR_SERVER_IP
Proxy: DNS only (灰色云)

Type: A
Name: www
Content: YOUR_SERVER_IP
Proxy: DNS only (灰色云)
```

### 2. Cloudflare API Token

1. 访问: https://dash.cloudflare.com/profile/api-tokens
2. 创建 Token，权限：
   - Zone - DNS - Edit
   - Zone - Zone - Read
3. 作用域: supermem.io
4. 复制 Token

### 3. 环境变量 (.env)

```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOi...
CF_API_EMAIL=diamond.shx@gmail.com
CF_DNS_API_TOKEN=你的_cloudflare_token
NODE_ENV=production
```

## 验证部署

```bash
# 1. 检查容器状态
docker compose ps

# 2. 测试 HTTP (会自动重定向到 HTTPS)
curl -I http://supermem.io

# 3. 测试 HTTPS
curl https://supermem.io/api/health

# 4. 测试表单页面
curl https://supermem.io/waitlist.html
```

## 常用命令

```bash
# 查看日志
docker compose logs -f supermem-waitlist

# 重启服务
docker compose restart

# 停止服务
docker compose down

# 更新代码后重新部署
docker compose down
docker compose build --no-cache
docker compose up -d

# 查看资源使用
docker stats
```

## 访问地址

- 🌐 主站: https://supermem.io
- 📝 Waitlist: https://supermem.io/waitlist.html
- 📊 API Health: https://supermem.io/api/health
- 🔧 Traefik Dashboard: https://traefik.supermem.io (需要配置)

## 问题排查

### SSL 证书未生成

```bash
# 查看 Traefik 日志
docker compose logs traefik | grep -i error

# 检查 DNS 是否生效
dig supermem.io
nslookup supermem.io

# 确认 API Token 正确
docker compose exec traefik env | grep CF_
```

### 无法访问

```bash
# 检查防火墙
sudo ufw status
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# 检查容器
docker compose ps
docker compose logs supermem-waitlist
```

### 数据库连接失败

```bash
# 验证 Supabase 配置
docker compose exec supermem-waitlist env | grep SUPABASE

# 测试连接
curl https://supermem.io/api/health
```

## 性能优化

根据流量调整:

```yaml
# docker-compose.yml
services:
  supermem-waitlist:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M
```

## 安全建议

1. ✅ 使用强密码保护 Traefik dashboard
2. ✅ 定期备份 `traefik/acme.json`
3. ✅ 定期更新 Docker 镜像
4. ✅ 监控日志异常访问
5. ✅ 配置 Cloudflare 防火墙规则

完整文档请查看 `DEPLOYMENT.md`

