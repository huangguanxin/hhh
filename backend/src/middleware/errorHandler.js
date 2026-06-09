/**
 * 全局异常处理中间件
 * 统一捕获：参数校验错误、业务异常、路由未匹配
 */

const Result = require('../common/Result');

/**
 * 404 — 接口不存在
 */
function notFoundHandler(req, res, _next) {
  res.status(404).json(Result.fail(404, `接口不存在: ${req.method} ${req.originalUrl}`));
}

/**
 * 全局异常捕获
 */
function globalErrorHandler(err, req, res, _next) {
  console.error(`[ERROR] ${req.method} ${req.originalUrl}:`, err.message);

  // JSON 解析失败
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json(Result.paramError('请求体 JSON 格式错误'));
  }

  // 其他未预期错误
  const status = err.status || 500;
  const message = status === 500 ? '服务器内部错误' : err.message;
  res.status(status).json(Result.fail(status, message));
}

module.exports = { notFoundHandler, globalErrorHandler };
