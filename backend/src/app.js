/**
 * 电商购物平台 — 后端入口
 * 启动：node src/app.js  或  npm start
 * 默认端口：3000
 */

const express = require('express');
const productRoutes = require('./routes/productRoutes');
const { notFoundHandler, globalErrorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// 全局中间件
app.use(express.json());                         // 解析 JSON 请求体
app.use(express.urlencoded({ extended: true })); // 解析 URL 编码请求体

// CORS 跨域（允许前端调用）
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// 根路径 — API 文档页
app.get('/', (req, res) => {
  res.type('html').send(`<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="UTF-8"><title>电商购物平台 API</title>
<style>body{font-family:system-ui,sans-serif;max-width:720px;margin:40px auto;padding:0 20px;color:#2d3436}
h1{color:#ff4757}table{width:100%;border-collapse:collapse;margin:16px 0}
th,td{border:1px solid #e0e0e0;padding:10px 14px;text-align:left;font-size:14px}
th{background:#f5f6fa}code{background:#f5f6fa;padding:2px 6px;border-radius:4px;font-size:13px}
.tag{display:inline-block;padding:2px 8px;border-radius:4px;font-size:12px;font-weight:700;color:#fff}
.get{background:#0984e3}.post{background:#00b894}.put{background:#e17055}.del{background:#d63031}
a{color:#ff4757}</style></head><body>
<h1>电商购物平台 API</h1><p>服务运行中，以下为全部接口：</p>
<table><tr><th>方法</th><th>路径</th><th>说明</th></tr>
<tr><td><span class="tag get">GET</span></td><td><code>/products/query?page=1&pageSize=10</code></td><td>分页查询（可选 keyword）</td></tr>
<tr><td><span class="tag get">GET</span></td><td><code>/products/1</code></td><td>单件查询</td></tr>
<tr><td><span class="tag post">POST</span></td><td><code>/products/add</code></td><td>新增商品（Body: JSON）</td></tr>
<tr><td><span class="tag put">PUT</span></td><td><code>/products/update/1</code></td><td>更新商品（Body: JSON）</td></tr>
<tr><td><span class="tag del">DELETE</span></td><td><code>/products/delete/1</code></td><td>删除商品</td></tr>
</table>
<p>Postman 测试集合：<code>backend/postman/电商平台API测试.postman_collection.json</code></p>
<p style="color:var(--text-light)">返回格式：<code>{"code":200,"message":"操作成功","data":...}</code></p>
</body></html>`);
});

// 路由注册
app.use(productRoutes);

// 全局异常处理（顺序重要：404 → 异常捕获）
app.use(notFoundHandler);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`✅ 电商后端服务已启动: http://localhost:${PORT}`);
  console.log('   接口列表:');
  console.log(`   GET    http://localhost:${PORT}/products/query?page=1&pageSize=10`);
  console.log(`   GET    http://localhost:${PORT}/products/1`);
  console.log(`   POST   http://localhost:${PORT}/products/add`);
  console.log(`   PUT    http://localhost:${PORT}/products/update/1`);
  console.log(`   DELETE http://localhost:${PORT}/products/delete/1`);
});
