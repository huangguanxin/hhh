/**
 * 登录页面
 * POST /auth/login → 获取 JWT Token → 存入 localStorage → 跳转首页
 */
const LoginPage = {
  template: '#tpl-login',
  data() {
    return {
      username: '',
      password: '',
      error: '',
      loading: false
    };
  },
  methods: {
    async doLogin() {
      this.error = '';
      if (!this.username || !this.password) {
        this.error = '请输入用户名和密码';
        return;
      }
      this.loading = true;
      try {
        const res = await request.post('/auth/login', {
          username: this.username,
          password: this.password
        });
        if (res.code === 200) {
          auth.save(res.data);
          toast('登录成功');
          this.$router.push('/');
        } else {
          this.error = res.message;
        }
      } catch (err) {
        this.error = err.message || '登录失败';
      } finally {
        this.loading = false;
      }
    }
  }
};
