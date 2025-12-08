# 广告投放追踪功能文档

## 功能说明

已为 Supermem waitlist 添加了广告来源追踪功能，可以追踪用户是从哪个渠道来到注册页面的。

## 使用方法

### 1. URL 参数格式

在分享 waitlist 链接时，在 URL 后面添加 `?from=渠道名称` 参数：

```
https://yourdomain.com/waitlist.html?from=google
https://yourdomain.com/waitlist.html?from=linkedin
https://yourdomain.com/waitlist.html?from=twitter
https://yourdomain.com/waitlist.html?from=facebook
```

### 2. 推荐的渠道标识

建议使用以下标准化的渠道标识：

| 渠道 | from 参数值 | 示例 URL |
|------|------------|----------|
| Google Ads | `google` | `waitlist.html?from=google` |
| LinkedIn Ads | `linkedin` | `waitlist.html?from=linkedin` |
| Twitter/X Ads | `twitter` | `waitlist.html?from=twitter` |
| Facebook Ads | `facebook` | `waitlist.html?from=facebook` |
| Instagram | `instagram` | `waitlist.html?from=instagram` |
| Reddit | `reddit` | `waitlist.html?from=reddit` |
| Product Hunt | `producthunt` | `waitlist.html?from=producthunt` |
| Hacker News | `hackernews` | `waitlist.html?from=hackernews` |
| Email Campaign | `email` | `waitlist.html?from=email` |
| Newsletter | `newsletter` | `waitlist.html?from=newsletter` |
| Referral | `referral` | `waitlist.html?from=referral` |

### 3. 自定义渠道标识

你也可以使用自定义的标识来追踪特定的营销活动：

```
waitlist.html?from=google-search-campaign-2024
waitlist.html?from=linkedin-sponsored-post-jan
waitlist.html?from=founder-network-referral
```

## 技术实现

### 前端 (waitlist.html)

- JavaScript 自动从 URL 中提取 `from` 参数
- 参数值会在表单提交时自动包含在数据中
- 在浏览器控制台可以看到追踪信息（开发模式）

### 后端 (server.js)

- 接收 `from` 参数并存储到数据库的 `from_source` 字段

### 数据库 (Supabase)

- `from_source` 字段：TEXT 类型，存储广告来源
- 已添加索引以提高查询性能

## 数据分析

### 查看各渠道转化数据

在 Supabase SQL Editor 中运行以下查询：

```sql
-- 查看各渠道的注册数量
SELECT 
    from_source, 
    COUNT(*) as count,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as percentage
FROM waitlist_submissions
WHERE from_source IS NOT NULL
GROUP BY from_source
ORDER BY count DESC;
```

### 按时间段分析渠道表现

```sql
-- 查看最近7天各渠道的表现
SELECT 
    from_source,
    DATE(created_at) as date,
    COUNT(*) as daily_count
FROM waitlist_submissions
WHERE from_source IS NOT NULL 
    AND created_at >= NOW() - INTERVAL '7 days'
GROUP BY from_source, DATE(created_at)
ORDER BY date DESC, daily_count DESC;
```

### 计算各渠道的 ROI

```sql
-- 假设你在另一个表中记录了各渠道的广告支出
-- 可以计算每个渠道的获客成本
SELECT 
    w.from_source,
    COUNT(*) as signups,
    COALESCE(s.spend, 0) as total_spend,
    CASE 
        WHEN COUNT(*) > 0 THEN COALESCE(s.spend, 0) / COUNT(*)
        ELSE 0 
    END as cost_per_signup
FROM waitlist_submissions w
LEFT JOIN ad_spend s ON w.from_source = s.source
WHERE w.from_source IS NOT NULL
GROUP BY w.from_source, s.spend
ORDER BY cost_per_signup ASC;
```

## 数据库迁移

### 新项目

如果是新建数据库，直接运行 `supabase-schema.sql`，已包含 `from_source` 字段。

### 现有项目

如果数据库已存在，运行 `migration-add-from-source.sql` 来添加新字段：

```sql
-- 在 Supabase SQL Editor 中运行
ALTER TABLE waitlist_submissions 
ADD COLUMN IF NOT EXISTS from_source TEXT;

CREATE INDEX IF NOT EXISTS idx_waitlist_from_source 
ON waitlist_submissions(from_source);
```

## 最佳实践

### 1. 使用 UTM 参数组合（可选）

除了 `from` 参数，还可以添加更详细的追踪：

```
waitlist.html?from=google&utm_source=google&utm_medium=cpc&utm_campaign=brand-2024&utm_content=ad-variant-a
```

### 2. 短链接管理

使用短链接服务（如 bit.ly, t.co）管理带追踪参数的链接：

```
原始链接: https://supermem.ai/waitlist.html?from=linkedin
短链接: https://bit.ly/supermem-li
```

### 3. 二维码追踪

为线下活动生成带追踪参数的二维码：

```
waitlist.html?from=conference-2024-booth
waitlist.html?from=meetup-sf-jan
```

### 4. A/B 测试

测试不同文案或设计的效果：

```
waitlist.html?from=facebook-ad-v1
waitlist.html?from=facebook-ad-v2
```

## 注意事项

1. **隐私合规**：追踪参数不包含个人身份信息，符合 GDPR 和 CCPA 要求
2. **参数大小写**：建议使用小写字母和连字符，保持一致性
3. **URL 编码**：如果渠道名称包含特殊字符，确保进行 URL 编码
4. **数据清理**：定期检查 `from_source` 数据，清理或规范化不一致的值

## 示例：完整营销活动设置

```bash
# Google Ads Campaign
https://supermem.ai/waitlist.html?from=google-brand-2024

# LinkedIn Sponsored Post
https://supermem.ai/waitlist.html?from=linkedin-b2b-jan

# Email Newsletter
https://supermem.ai/waitlist.html?from=newsletter-week1

# Product Hunt Launch
https://supermem.ai/waitlist.html?from=producthunt-launch
```

## 支持

如有问题，请查看：
- `SETUP.md` - 服务器设置说明
- `supabase-schema.sql` - 完整数据库结构
- `migration-add-from-source.sql` - 添加追踪字段的迁移脚本

