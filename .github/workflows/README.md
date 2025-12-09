# GitHub Actions 部署配置

## 概述

该 GitHub Action 会在代码推送到 `main` 分支时自动部署到生产服务器。

## 部署流程

1. SSH 连接到服务器
2. 执行 `git pull` 拉取最新代码
3. 使用 `docker compose restart` 重启应用容器

## 配置步骤

在 GitHub 仓库中配置以下 Secrets（Settings → Secrets and variables → Actions → New repository secret）：

### 必需的 Secrets

| Secret 名称 | 说明 | 示例 |
|------------|------|------|
| `SERVER_HOST` | Google Cloud 服务器 IP 地址或域名 | `34.123.456.78` |
| `SERVER_USER` | SSH 登录用户名 | `diamond_shx` |
| `SERVER_SSH_KEY` | SSH 私钥（完整内容） | 见下方说明 |

**项目路径：** 已硬编码为 `/home/diamond_shx/memhub-homepage`（无需配置 Secret）

**注意：** 端口固定为 22（SSH 默认端口）

### Google Cloud 特定配置

#### 1. 确保防火墙规则允许 SSH
在 Google Cloud Console 中：
- VPC network → Firewall → 确保有规则允许端口 22 (tcp:22)
- 或创建新规则：允许来源 `0.0.0.0/0`，目标端口 `22`

#### 2. 获取服务器 IP 地址
```bash
# 在 GCP Console 中查看 VM 实例的外部 IP
# 或通过 gcloud CLI：
gcloud compute instances list
```

### 获取 SSH 私钥

在本地机器上运行：

```bash
# 查看现有的 SSH 公钥（如果已配置服务器）
cat ~/.ssh/id_rsa.pub

# 查看 SSH 私钥（复制完整内容到 GitHub Secret）
cat ~/.ssh/id_rsa
```

**重要提示：**
- 复制私钥时需要包含 `-----BEGIN RSA PRIVATE KEY-----` 和 `-----END RSA PRIVATE KEY-----`
- 确保服务器的 `~/.ssh/authorized_keys` 中包含对应的公钥

### 确保服务器上的公钥配置

在服务器上运行：

```bash
# 查看已授权的公钥
cat ~/.ssh/authorized_keys

# 如果需要添加公钥（将本地的 id_rsa.pub 内容追加）
echo "你的公钥内容" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

## 手动触发部署

1. 进入 GitHub 仓库的 **Actions** 标签页
2. 选择 **Deploy to Production** workflow
3. 点击 **Run workflow** 按钮
4. 选择分支（通常是 `main`）并点击运行

## 查看部署日志

1. 进入 **Actions** 标签页
2. 点击最近的 workflow 运行记录
3. 查看 **Deploy Application** job 的详细日志

## 故障排查

### SSH 连接失败
- 检查 `SERVER_HOST`、`SERVER_USER` 是否正确
- 验证 `SERVER_SSH_KEY` 格式是否完整（包含头尾标记）
- 确认 Google Cloud 防火墙规则允许 SSH 访问（端口 22）
- 检查 GCP VM 实例的 SSH 密钥配置是否正确

### Git Pull 失败
- 确保服务器上 `/home/diamond_shx/memhub-homepage` 目录存在且是 Git 仓库
- 检查服务器上是否有未提交的更改：`git status`
- 如有冲突，在服务器上手动解决：`git stash` 或 `git reset --hard`

### Docker 重启失败
- 检查服务器上 Docker 和 Docker Compose 是否安装
- 验证当前用户是否有 Docker 权限：`docker ps`
- 如果需要 sudo，修改 workflow 中的命令为 `sudo docker compose restart`
