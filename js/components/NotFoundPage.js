/* ============================================================
   阶段 6.6：404 页面组件
   - 大号 404 状态码
   - 友好提示文案
   - 10 秒倒计时自动返回首页
   - 手动返回首页按钮
   ============================================================ */

const NotFoundPage = {
  template: '#tpl-404',

  data() {
    return {
      countdown: 10,
      timer: null
    };
  },

  mounted() {
    // 启动 10 秒倒计时，结束后自动跳转首页
    this.timer = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(this.timer);
        this.$router.push('/');
      }
    }, 1000);
  },

  beforeUnmount() {
    // 组件销毁前清除定时器，避免内存泄漏
    if (this.timer) clearInterval(this.timer);
  }
};
