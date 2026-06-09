/**
 * 统一返回结果类
 * 包含：状态码、消息、数据、分页信息
 *
 * 使用示例：
 *   Result.ok(data)                      — 成功（无分页）
 *   Result.ok(data, pageInfo)            — 成功（含分页）
 *   Result.fail(code, msg)               — 业务失败
 *   Result.error(msg)                    — 系统错误
 */

class Result {
  /**
   * @param {number} code   状态码
   * @param {string} message 提示消息
   * @param {*}      data    响应数据
   * @param {object} page    分页信息 { page, pageSize, total, totalPages }
   */
  constructor(code, message, data = null, page = null) {
    this.code = code;
    this.message = message;
    if (data !== null) this.data = data;
    if (page !== null) this.page = page;
  }

  // -------- 工厂方法 --------

  /** 操作成功 */
  static ok(data, pageInfo) {
    if (pageInfo) {
      return new Result(200, '操作成功', data, {
        page: pageInfo.page,
        pageSize: pageInfo.pageSize,
        total: pageInfo.total,
        totalPages: Math.ceil(pageInfo.total / pageInfo.pageSize)
      });
    }
    return new Result(200, '操作成功', data);
  }

  /** 业务失败（自定义 code + msg） */
  static fail(code, message) {
    return new Result(code, message);
  }

  /** 参数校验失败 */
  static paramError(message) {
    return new Result(400, message || '参数错误');
  }

  /** 资源未找到 */
  static notFound(message) {
    return new Result(404, message || '资源不存在');
  }

  /** 服务器内部错误 */
  static error(message) {
    return new Result(500, message || '服务器内部错误');
  }

  /** 转为 JSON（Express res.json 自动调用 toJSON） */
  toJSON() {
    const obj = { code: this.code, message: this.message };
    if (this.data !== undefined) obj.data = this.data;
    if (this.page !== undefined) obj.page = this.page;
    return obj;
  }
}

module.exports = Result;
