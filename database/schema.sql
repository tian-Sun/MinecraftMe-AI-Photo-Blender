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