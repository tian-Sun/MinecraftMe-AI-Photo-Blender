# 🚀 生产环境部署指南

## 📋 部署前检查清单

### 1. 数据库设置 (Supabase)
确保在Supabase生产环境中执行以下SQL：

```sql
-- 执行 database/schema.sql 中的所有内容
-- 包括 user_usage 和 user_subscriptions 表
```

### 2. 环境变量配置

在Vercel或其他部署平台中设置以下环境变量：

```bash
# NextAuth Configuration
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-production-secret-here

# Google OAuth (Production)
GOOGLE_CLIENT_ID=your-production-google-client-id
GOOGLE_CLIENT_SECRET=your-production-google-client-secret

# Supabase (Production)
NEXT_PUBLIC_SUPABASE_URL=https://your-production-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key

# DodoPayment (Production)
DODOPAYMENT_SHOP_ID=your-production-shop-id
DODOPAYMENT_TOKEN=your-production-token
DODO_PREMIUM_PAYMENT_LINK=https://pay.dodopayment.com/your-premium-link
DODO_WEBHOOK_SECRET=your-production-webhook-secret

# Production Settings
NODE_ENV=production
```

### 3. DodoPayment 生产环境配置

1. **登录DodoPayment控制台**
2. **切换到生产环境模式**
3. **更新Webhook URL**：
   - 设置为：`https://your-domain.com/api/subscription/webhook`
4. **获取生产环境支付链接**：
   - Premium计划的支付链接
5. **获取生产环境API密钥**：
   - Shop ID
   - API Token
   - Webhook Secret

### 4. Google OAuth 生产环境配置

1. **Google Cloud Console**
2. **OAuth同意屏幕** → 发布应用
3. **凭据** → 更新授权重定向URI：
   - `https://your-domain.com/api/auth/callback/google`

### 5. Vercel 部署配置

```json
{
  "name": "minecraftme-ai-photo-blender",
  "version": 2,
  "build": {
    "env": {
      "NODE_ENV": "production"
    }
  },
  "functions": {
    "app/api/**": {
      "maxDuration": 30
    }
  }
}
```

## 🔍 部署后验证清单

### 数据库验证
- [ ] 确认 `user_usage` 表存在
- [ ] 确认 `user_subscriptions` 表存在
- [ ] 测试数据库连接

### 功能验证
- [ ] Google登录功能正常
- [ ] 免费版本每日限制正常工作
- [ ] 支付按钮跳转到正确的DodoPayment链接
- [ ] Webhook接收支付成功通知
- [ ] 付费用户积分正确显示
- [ ] 图片上传和AI处理功能正常

### 安全检查
- [ ] NEXTAUTH_SECRET 已设置为强密码
- [ ] 生产环境API密钥已配置
- [ ] Webhook签名验证正常工作
- [ ] HTTPS 证书正常

## 🚨 紧急回滚计划

如果部署出现问题：

1. **立即回滚到上一个稳定版本**
2. **检查错误日志**：
   - Vercel函数日志
   - Supabase日志
   - DodoPayment webhook日志
3. **联系技术支持**

## 📞 支持联系方式

- DodoPayment技术支持
- Supabase支持
- Vercel支持

---

**⚠️ 重要提醒：部署前请备份现有数据！** 