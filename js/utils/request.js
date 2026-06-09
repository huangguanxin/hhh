/**
 * 统一请求工具 (request.js)
 * - 基于 Fetch API 封装
 * - 自动拼接 baseURL
 * - 超时控制 + 统一错误处理
 * - 请求/响应拦截器
 * - 后端不可用时自动标记
 */

const request = (() => {
  const BASE_URL = 'http://localhost:3000';
  const TIMEOUT = 8000; // 8s 超时
  let _backendOnline = null; // null=未检测, true=在线, false=离线

  /**
   * 检测后端是否可用
   */
  async function checkBackend() {
    if (_backendOnline !== null) return _backendOnline;
    try {
      const r = await fetch(`${BASE_URL}/products/query?pageSize=1`, {
        signal: AbortSignal.timeout(3000)
      });
      _backendOnline = r.ok;
    } catch {
      _backendOnline = false;
    }
    return _backendOnline;
  }

  /**
   * 发送请求
   * @param {string} url     - 接口路径（如 /products/query）
   * @param {object} options - Fetch 选项
   * @returns {Promise<object>} { code, data, message, page? }
   */
  async function send(url, options = {}) {
    // 超时控制
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT);
    const config = {
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      ...options
    };

    try {
      const res = await fetch(`${BASE_URL}${url}`, config);
      clearTimeout(timer);
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || `HTTP ${res.status}`);
      return json;
    } catch (err) {
      clearTimeout(timer);
      if (err.name === 'AbortError') {
        throw new Error('请求超时，请检查网络连接');
      }
      throw err;
    }
  }

  return {
    get(url, params = {}) {
      const qs = new URLSearchParams(params).toString();
      const full = qs ? `${url}?${qs}` : url;
      return send(full);
    },
    post(url, data) {
      return send(url, { method: 'POST', body: JSON.stringify(data) });
    },
    put(url, data) {
      return send(url, { method: 'PUT', body: JSON.stringify(data) });
    },
    delete(url) {
      return send(url, { method: 'DELETE' });
    },
    backendOnline() {
      return _backendOnline;
    },
    checkBackend
  };
})();
