/* ============================================================
   阶段 6.5：下单成功页组件
   - 动画勾号（CSS popIn）
   - 展示订单编号（时间戳生成）和实付金额
   - 10 秒倒计时自动跳转首页
   - 手动按钮：返回首页 / 继续购物
   ============================================================ */

const OrderSuccessPage = {
  template: '#tpl-order-success',

  data() {
    return {
      orderId: 'ORD' + Date.now().toString(36).toUpperCase(),
      countdown: 10,
      timer: null
    };
  },

  computed: {
    /** 订单实付金额（来自 Store） */
    amount() {
      return this.cartStore.lastOrderAmount.toFixed(2);
    },

    /** 购物车 Store */
    cartStore() {
      return useCartStore();
    }
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
