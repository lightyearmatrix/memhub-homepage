# 🚀 超简单部署 - 使用 HTTP Challenge

## 优势
- ✅ **无需 Cloudflare API Token**
- ✅ **配置更简单**（只需要 DNS A 记录）
- ✅ **自动 HTTPS**（Let's Encrypt）
- ✅ **自动 HTTP → HTTPS 重定向**

## 📋 前置要求

### 1. DNS 配置
只需要添加 A 记录，**无需任何 API Token**：

```
类型: A
名称: @
内容: YOUR_SERVER_IP
TTL: Auto

类型: A  
名称: www
内容: YOUR_SERVER_IP
TTL: Auto
```

**注意**：DNS 记录可以使用任何 DNS 提供商（Cloudflare、阿里云、腾讯云等）

### 2. 服务器要求
- 确保服务器的 **80 和 443 端口可以从公网访问**
- 防火墙已开放 80/443 端口

## 🚀 一键部署

### 1. 创建环境配置
```bash
cd /path/to/memery-homepage

# 创建 .env 文件
cat > .env << 'EOF'
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
NODE_ENV=production
EOF
```

### 2. 启动服务
```bash
# 直接启动，网络会自动创建
docker compose up -d

# 查看日志
docker compose logs -f
```

就这么简单！🎉

## ✅ 验证部署

### 1. 检查容器状态
```bash
docker compose ps
```

期望输出：
```
NAME                  STATUS
supermem-traefik      Up
supermem-waitlist     Up
```

### 2. 查看证书申请日志
```bash
docker compose logs traefik | grep -i "certificate"
```

### 3. 测试 HTTPS
```bash
# 测试主域名
curl https://supermem.io/api/health

# 测试 www 域名
curl https://www.supermem.io/api/health
```

### 4. 浏览器测试
访问以下地址，应该自动跳转到 HTTPS：
- http://supermem.io → https://supermem.io
- http://www.supermem.io → https://www.supermem.io

## 📁 配置说明

### docker-compose.yml 核心配置

```yaml
# Traefik 使用 command 方式配置，无需额外配置文件
command:
  - "--entrypoints.web.address=:80"
  - "--entrypoints.websecure.address=:443"
  - "--entrypoints.web.http.redirections.entrypoint.to=websecure"
  - "--certificatesresolvers.letsencrypt.acme.httpchallenge=true"
  
# 应用标签配置
labels:
  - "traefik.http.routers.supermem.rule=Host(`supermem.io`) || Host(`www.supermem.io`)"
  - "traefik.http.routers.supermem.entrypoints=websecure"
  - "traefik.http.routers.supermem.tls.certresolver=letsencrypt"
```

## 🔧 常用命令

```bash
# 查看所有日志
docker compose logs -f

# 只看 Traefik 日志
docker compose logs -f traefik

# 只看应用日志
docker compose logs -f supermem-waitlist

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

### 问题 1: 证书申请失败

**症状**：访问 HTTPS 显示证书错误

**排查步骤**：
```bash
# 1. 检查 DNS 是否生效
dig supermem.io
nslookup supermem.io

# 2. 检查 80 端口是否可访问
curl -I http://supermem.io

# 3. 查看 Traefik 日志
docker compose logs traefik | grep -i error

# 4. 检查防火墙
sudo ufw status
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

**常见原因**：
- DNS 还未生效（需要等待几分钟到几小时）
- 80 端口被其他服务占用（Nginx、Apache 等）
- 防火墙没有开放 80 端口
- 服务器在国内某些云服务商需要备案

### 问题 2: 无法访问网站

```bash
# 检查容器状态
docker compose ps

# 检查端口占用
sudo netstat -tulpn | grep -E ':(80|443)'

# 检查是否有其他 Web 服务器
sudo systemctl status nginx
sudo systemctl status apache2
```

### 问题 3: 证书获取慢

Let's Encrypt HTTP Challenge 需要：
1. DNS 解析生效（通常 5-30 分钟）
2. 80 端口可以从公网访问
3. Traefik 能够响应验证请求

**解决方法**：耐心等待，查看日志

## 📊 证书管理

### 查看证书
```bash
# 查看证书文件
docker compose exec traefik cat /letsencrypt/acme.json

# 备份证书
docker compose exec traefik cat /letsencrypt/acme.json > acme.json.backup
```

### 证书续期
- Let's Encrypt 证书有效期 90 天
- Traefik 会自动续期（一般在过期前 30 天）
- 无需手动操作

### 强制更新证书
```bash
# 删除旧证书，重启会自动申请新的
docker compose down
docker volume rm memery-homepage_traefik_letsencrypt
docker compose up -d
```

## 🔄 HTTP Challenge vs DNS Challenge

### HTTP Challenge（当前方案）
**优点**：
- ✅ 配置简单，无需 API Token
- ✅ 适用于任何 DNS 提供商
- ✅ 续期速度快

**缺点**：
- ❌ 必须开放 80 端口
- ❌ 无法申请通配符证书（*.supermem.io）

### DNS Challenge（之前的方案）
**优点**：
- ✅ 可以申请通配符证书
- ✅ 无需开放 80 端口

**缺点**：
- ❌ 需要 DNS 提供商 API Token
- ❌ 配置相对复杂

## 🌍 多域名支持

如需支持更多域名，只需修改 labels：

```yaml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.supermem.rule=Host(`supermem.io`) || Host(`www.supermem.io`) || Host(`app.supermem.io`)"
  - "traefik.http.routers.supermem.entrypoints=websecure"
  - "traefik.http.routers.supermem.tls.certresolver=letsencrypt"
```

然后添加对应的 DNS A 记录即可。

## 🔒 安全建议

1. ✅ 定期备份 `traefik_letsencrypt` volume
2. ✅ 使用强密码保护 Supabase
3. ✅ 定期更新 Docker 镜像
4. ✅ 监控访问日志

## 📝 配置文件说明

### 需要的文件
- ✅ `docker-compose.yml` - 服务配置
- ✅ `Dockerfile` - 应用镜像
- ✅ `.env` - 环境变量
- ✅ `server.js` - Node.js 服务器
- ✅ `package.json` - 依赖配置

### 不需要的文件
- ❌ `traefik/traefik.yml` - 使用 command 配置
- ❌ `traefik/config.yml` - 不需要额外配置
- ❌ `traefik/acme.json` - 自动创建在 volume 中

## 🎯 生产环境检查清单

部署前确认：
- [ ] DNS A 记录已添加并生效
- [ ] 80 和 443 端口已开放
- [ ] `.env` 文件已正确配置
- [ ] Supabase 数据库已创建
- [ ] 服务器内存 >= 1GB

部署后验证：
- [ ] 容器正常运行：`docker compose ps`
- [ ] HTTPS 正常访问：`curl https://supermem.io`
- [ ] HTTP 自动跳转：`curl -I http://supermem.io`
- [ ] 表单提交正常
- [ ] 数据正确保存到 Supabase

---

**这就是最简单的部署方式！** 🚀

无需 API Token，无需复杂配置，开箱即用！

