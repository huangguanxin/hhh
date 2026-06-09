/* ============================================================
   阶段 6.3：商品详情组件（父组件）
   - 通过路由参数 $route.params.id 获取商品 ID
   - 展示大图、名称、描述、价格
   - 父→子传值：促销信息传给 PromoLabel / PromoCountdown
   - 加入购物车（防重复点击 + 成功反馈）
   - 商品不存在时显示提示页
   ============================================================ */

const ProductDetail = {
  template: '#tpl-detail',

  // 注册子组件
  components: {
    PromoLabel,
    PromoCountdown
  },

  data() {
    return {
      added: false
    };
  },

  computed: {
    /** 通过路由参数查找当前商品 */
    product() {
      return products.find(p => p.id === Number(this.$route.params.id));
    },

    /** 购物车 Store */
    cartStore() {
      return useCartStore();
    }
  },

  methods: {
    /** 加入购物车 */
    addItem() {
      if (!this.product) return;
      const msg = this.cartStore.addToCart(this.product);
      this.added = true;
      toast(msg);
      setTimeout(() => { this.added = false; }, 2000);
    }
  }
};
