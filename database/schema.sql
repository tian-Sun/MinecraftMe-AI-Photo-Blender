-- 用户使用次数表
CREATE TABLE IF NOT EXISTS user_usage (
    id SERIAL PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    usage_count INTEGER NOT NULL DEFAULT 0,
    usage_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_email, usage_date)
);

-- 创建索引提高查询性能
CREATE INDEX IF NOT EXISTS idx_user_usage_email_date ON user_usage(user_email, usage_date);
CREATE INDEX IF NOT EXISTS idx_user_usage_date ON user_usage(usage_date);

-- 添加行级安全策略（RLS）
ALTER TABLE user_usage ENABLE ROW LEVEL SECURITY;

-- 允许所有操作（你可以根据需要调整权限）
CREATE POLICY "Allow all operations" ON user_usage FOR ALL USING (true);

-- 用户订阅表
CREATE TABLE IF NOT EXISTS user_subscriptions (
    id SERIAL PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    plan_id VARCHAR(50) NOT NULL,
    credits INTEGER NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled')),
    order_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_email, status) DEFERRABLE INITIALLY DEFERRED
);

-- 创建索引提高查询性能
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_email ON user_subscriptions(user_email);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_status ON user_subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_order_id ON user_subscriptions(order_id);

-- 添加行级安全策略（RLS）
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

-- 允许所有操作（你可以根据需要调整权限）
CREATE POLICY "Allow all operations on subscriptions" ON user_subscriptions FOR ALL USING (true); 