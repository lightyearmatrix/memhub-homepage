# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是 Supermem（记忆中心平台）的候补名单表单提交服务器。项目包含 Node.js/Express 后端、静态 HTML 前端页面，使用 Docker 部署，Traefik 作为反向代理。

**技术栈：**
- 后端：Node.js + Express + Supabase
- 前端：原生 HTML/CSS/JavaScript
- 部署：Docker + Traefik + Let's Encrypt SSL
- 数据库：Supabase (PostgreSQL)

## 常用命令

### 开发环境
```bash
# 安装依赖
npm install

# 启动开发服务器（运行在 http://localhost:8080）
npm start
# 或
npm run dev

# 访问页面：
# http://localhost:8080/index.html （主页）
# http://localhost:8080/waitlist.html （候补名单表单）
```

### 测试
```bash
# 测试健康检查接口
curl http://localhost:8080/api/health

# 查看所有提交记录（仅开发环境）
curl http://localhost:8080/api/submissions
```

### Docker 部署
```bash
# 使用 Docker Compose 构建并启动服务
docker compose up -d

# 查看日志
docker compose logs -f

# 查看特定服务日志
docker compose logs -f supermem-waitlist
docker compose logs -f traefik

# 停止服务
docker compose down

# 代码更新后重新构建
docker compose down
docker compose build --no-cache
docker compose up -d
```

## 架构设计

### 应用结构

**入口文件：** `server.js` - Express 服务器，处理 API 请求并提供静态文件服务

**API 端点：**
- `POST /api/waitlist` - 提交候补名单表单（保存到 Supabase）
- `GET /api/submissions` - 查看所有提交记录（用于测试）
- `GET /api/health` - 健康检查端点

**前端页面：**
- `index.html` - 主页，包含产品介绍和 hero 区域
- `waitlist.html` - 候补名单注册表单

**数据库架构：** `supabase-schema.sql` - 完整的数据库架构，包括 `waitlist_submissions` 表，字段有：
- email, website, building_for, company_size, use_cases (JSONB)
- other_use_case, from_source（广告追踪）, created_at

### 核心功能

**广告来源追踪：** 应用通过 URL 参数 `?from=来源` 追踪用户来源，保存到数据库的 `from_source` 字段。详见 `AD-TRACKING.md`。

**表单数据流程：**
1. 用户在 `waitlist.html` 填写表单
2. JavaScript 提取 URL 中的 `?from` 参数用于广告追踪
3. 表单提交到 `/api/waitlist` 端点
4. 服务器验证并保存到 Supabase 的 `waitlist_submissions` 表
5. 服务器返回成功/错误响应

### 部署架构

**Docker 服务：**
- `traefik` - 反向代理，处理 SSL 终止和路由
- `supermem-waitlist` - Node.js 应用容器

**Traefik 配置：**
- 自动将 HTTP 重定向到 HTTPS
- 通过 HTTP challenge 获取 Let's Encrypt SSL 证书
- 路由 `supermem.io` 和 `www.supermem.io` 的流量
- 证书存储在 Docker volume `traefik_letsencrypt`

**网络：** 所有服务通过 `supermem-network` 桥接网络通信

## 环境配置

**必需的环境变量**（`.env` 文件）：
```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NODE_ENV=production
```

服务器启动时会验证 Supabase 凭证是否存在，如果缺失会报错退出。

## 数据库操作

### 初始设置（新数据库）
在 Supabase SQL Editor 中运行 `supabase-schema.sql` 创建完整的数据库架构。

### 迁移（现有数据库）
运行 `migration-add-from-source.sql` 为现有表添加广告追踪字段。

### 查询示例
```sql
-- 按来源查看注册数
SELECT from_source, COUNT(*) as count
FROM waitlist_submissions
WHERE from_source IS NOT NULL
GROUP BY from_source
ORDER BY count DESC;

-- 最近的提交记录
SELECT email, from_source, created_at
FROM waitlist_submissions
ORDER BY created_at DESC
LIMIT 10;
```

## 安全说明

**CORS 配置：** 当前允许所有来源（`cors()` 无选项）。生产环境应在 `server.js` 中限制来源：
```javascript
app.use(cors({
    origin: ['https://supermem.io', 'https://www.supermem.io']
}));
```

**行级安全性 (RLS)：** `waitlist_submissions` 表已启用 RLS，策略如下：
- 公开可以 INSERT（用于表单提交）
- Service role 可以 SELECT（用于后端查询）

**Supabase 密钥：** 使用 `SUPABASE_ANON_KEY`，通过 RLS 策略限制权限。

## 重要文件位置

- **应用代码：** `server.js`, `index.html`, `waitlist.html`
- **数据库架构：** `supabase-schema.sql`, `migration-add-from-source.sql`
- **Docker 配置：** `Dockerfile`, `docker-compose.yml`
- **部署指南：** `DEPLOYMENT.md`（生产环境部署完整指南，使用 Traefik）
- **广告追踪文档：** `AD-TRACKING.md`
- **静态资源：** `logo.svg`（Supermem 标志）

## 部署检查清单

生产环境部署时：
1. 设置 Supabase 项目并运行 `supabase-schema.sql`
2. 配置域名的 DNS A 记录
3. 创建包含 Supabase 凭证的 `.env` 文件
4. 确保防火墙开放 80 和 443 端口
5. 启动服务：`docker compose up -d`
6. 验证成功获取 SSL 证书
7. 测试端点：健康检查和表单提交
8. 更新 `server.js` 中的 CORS 设置以限制来源

## 故障排查

**SSL 证书问题：**
- 检查 Traefik 日志：`docker compose logs traefik | grep -i acme`
- 验证 DNS 记录指向服务器：`dig supermem.io`
- 确保 80 端口可访问（HTTP challenge 需要）

**数据库连接问题：**
- 验证环境变量：`docker compose exec supermem-waitlist env | grep SUPABASE`
- 在 Supabase 控制台检查项目状态
- 验证容器的网络连接

**表单提交失败：**
- 检查浏览器控制台的 JavaScript 错误
- 验证 `/api/waitlist` 端点可访问
- 检查服务器日志查看错误详情
- 确保 Supabase RLS 策略允许插入操作
