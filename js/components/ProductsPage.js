/* ============================================================
   阶段 6.2：全部商品列表组件
   - 展示全部 8 件商品的网格布局
   - 支持加入购物车和查看详情
   ============================================================ */

const ProductsPage = {
  template: '#tpl-products',

  computed: {
    /** 全部商品 */
    allProducts() {
      return products;
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
