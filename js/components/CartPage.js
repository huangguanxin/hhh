/* ============================================================
   阶段 6.4：购物车页面组件
   - 空态：显示引导提示
   - 列表态：商品图片、名称、单价、数量调节、小计、删除
   - 底栏汇总：总件数 + 合计金额
   - 操作：清空购物车（带确认弹窗）、立即结算（跳转成功页）
   ============================================================ */

const CartPage = {
  template: '#tpl-cart',

  computed: {
    /** 购物车 Store */
    cartStore() {
      return useCartStore();
    }
  },

  methods: {
    /** 删除单个商品 */
    removeItem(item) {
      const msg = this.cartStore.removeFromCart(item.id);
      if (msg) toast(msg);
    },

    /** 清空购物车（需确认） */
    clearCart() {
      if (this.cartStore.isEmpty) return;
      if (confirm('确定要清空购物车吗？此操作不可撤销。')) {
        const msg = this.cartStore.clearCart();
        toast(msg);
      }
    },

    /** 下单结算：保存订单金额 → 清空购物车 → 跳转成功页 */
    checkout() {
      if (this.cartStore.isEmpty) return;
      this.cartStore.checkout();
      this.$router.push('/order-success');
    }
  }
};
