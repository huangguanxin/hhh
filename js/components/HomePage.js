/* ============================================================
   阶段 6.1：首页组件
   - Hero 活动区域 + 抢购按钮
   - 三项服务特性卡片
   - 热销爆款（前 4 件商品）
   ============================================================ */

const HomePage = {
  template: '#tpl-home',

  computed: {
    /** 热销商品：取前 4 件 */
    hotProducts() {
      return products.slice(0, 4);
    },

    /** 购物车 Store */
    cartStore() {
      return useCartStore();
    }
  },

  methods: {
    /** 加入购物车 */
    addItem(product) {
      const msg = this.cartStore.addToCart(product);
      toast(msg);
    }
  }
};
