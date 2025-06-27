#!/usr/bin/env node

/**
 * 生产环境验证脚本
 * 运行：node scripts/verify-production.js
 */

const https = require('https');
const { URL } = require('url');

// 配置要检查的域名
const DOMAIN = process.env.PRODUCTION_DOMAIN || 'your-domain.com';
const BASE_URL = `https://${DOMAIN}`;

// 检查项目列表
const checks = [
  {
    name: '主页加载',
    path: '/',
    expected: 'MinecraftStyle'
  },
  {
    name: '登录页面',
    path: '/login',
    expected: 'Sign in'
  },
  {
    name: 'API健康检查',
    path: '/api/remaining',
    expected: 'Unauthorized',
    expectStatus: 401
  },
  {
    name: 'Webhook端点',
    path: '/api/subscription/webhook',
    method: 'POST',
    body: '{}',
    expected: 'Missing webhook signature',
    expectStatus: 401
  }
];

// 执行HTTP请求
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const requestOptions = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || 443,
      path: parsedUrl.pathname,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    const req = https.request(requestOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({
        status: res.statusCode,
        data: data,
        headers: res.headers
      }));
    });

    req.on('error', reject);

    if (options.body) {
      req.write(options.body);
    }

    req.end();
  });
}

// 执行单项检查
async function runCheck(check) {
  try {
    console.log(`🔍 检查: ${check.name}...`);
    
    const url = `${BASE_URL}${check.path}`;
    const response = await makeRequest(url, {
      method: check.method,
      body: check.body
    });

    const expectedStatus = check.expectStatus || 200;
    const statusOk = response.status === expectedStatus;
    const contentOk = check.expected ? response.data.includes(check.expected) : true;

    if (statusOk && contentOk) {
      console.log(`✅ ${check.name}: 通过`);
      return true;
    } else {
      console.log(`❌ ${check.name}: 失败`);
      console.log(`   期望状态: ${expectedStatus}, 实际: ${response.status}`);
      if (check.expected) {
        console.log(`   期望包含: "${check.expected}"`);
        console.log(`   实际内容: ${response.data.substring(0, 200)}...`);
      }
      return false;
    }
  } catch (error) {
    console.log(`💥 ${check.name}: 错误 - ${error.message}`);
    return false;
  }
}

// 主函数
async function main() {
  console.log('🚀 开始生产环境验证...');
  console.log(`🌐 检查域名: ${DOMAIN}`);
  console.log('─'.repeat(50));

  let passed = 0;
  let total = checks.length;

  for (const check of checks) {
    const result = await runCheck(check);
    if (result) passed++;
    console.log('');
  }

  console.log('─'.repeat(50));
  console.log(`📊 验证结果: ${passed}/${total} 项通过`);

  if (passed === total) {
    console.log('🎉 所有检查通过！生产环境就绪。');
    process.exit(0);
  } else {
    console.log('⚠️  部分检查失败，请修复后重试。');
    process.exit(1);
  }
}

// 环境变量检查
function checkEnvironmentVariables() {
  const requiredVars = [
    'NEXTAUTH_URL',
    'NEXTAUTH_SECRET',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'DODOPAYMENT_SHOP_ID',
    'DODOPAYMENT_TOKEN',
    'DODO_PREMIUM_PAYMENT_LINK',
    'DODO_WEBHOOK_SECRET'
  ];

  console.log('🔐 检查环境变量...');
  let missingVars = [];

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  }

  if (missingVars.length > 0) {
    console.log('❌ 缺少以下环境变量:');
    missingVars.forEach(v => console.log(`   - ${v}`));
    console.log('\n请设置所有必需的环境变量后重试。');
    process.exit(1);
  } else {
    console.log('✅ 所有环境变量已设置');
  }
}

// 启动验证
if (require.main === module) {
  checkEnvironmentVariables();
  main().catch(console.error);
} 