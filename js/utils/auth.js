/**
 * 认证工具 — Token 管理
 * - 登录后 token 存 localStorage
 * - 每次请求自动附带 Authorization: Bearer xxx
 * - 路由守卫检查登录状态
 */
const auth = {
  /** 保存登录信息 */
  save(data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('username', data.username);
    localStorage.setItem('nickname', data.nickname || data.username);
  },

  /** 获取 Token */
  getToken() {
    return localStorage.getItem('token');
  },

  /** 是否已登录 */
  isLoggedIn() {
    return !!this.getToken();
  },

  /** 当前用户信息 */
  getUser() {
    return {
      userId: localStorage.getItem('userId'),
      username: localStorage.getItem('username'),
      nickname: localStorage.getItem('nickname')
    };
  },

  /** 退出登录 */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('nickname');
  }
};
