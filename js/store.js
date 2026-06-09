/* ============================================================
   阶段 3：Pinia 购物车全局状态管理
   - State:   items（购物车商品）, lastOrderAmount（订单金额）
   - Getters:  totalCount, totalPrice, isEmpty
   - Actions:  CRUD 操作 + 下单结算 + 清空购物车
   - 持久化:   localStorage 自动读写
   ============================================================ */

const useCartStore = Pinia.defineStore('cart', {
  // -------- State --------
  state: () => ({
    // 购物车商品列表，初始化时从 localStorage 恢复
    items: JSON.parse(localStorage.getItem('cart_items') || '[]'),

    // 最近一笔订单金额（清空购物车后用于成功页展示）
    lastOrderAmount: 0
  }),

  // -------- Getters（计算属性） --------
  getters: {
    /**
     * 购物车商品总件数（含数量累加）
     */
    totalCount(state) {
      return state.items.reduce((sum, item) => sum + item.quantity, 0);
    },

    /**
     * 购物车商品总价
     */
    totalPrice(state) {
      return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },

    /**
     * 购物车是否为空
     */
    isEmpty(state) {
      return state.items.length === 0;
    }
  },

  // -------- Actions（操作方法） --------
  actions: {
    /* 私有：将购物车数据持久化到 localStorage */
    _persist() {
      localStorage.setItem('cart_items', JSON.stringify(this.items));
    },

    /**
     * 添加商品到购物车
     * 若商品已存在则累加数量，否则新增条目
     * @param {Object} product - 商品对象
     * @param {number} quantity - 添加数量，默认 1
     * @returns {string} 操作提示信息
     */
    addToCart(product, quantity = 1) {
      const existing = this.items.find(item => item.id === product.id);
      if (existing) {
        existing.quantity += quantity;
        this._persist();
        return '已更新商品数量';
      }
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || '📦',
        color: product.color || '#dfe6e9',
        quantity
      });
      this._persist();
      return '已加入购物车';
    },

    /**
     * 从购物车移除指定商品
     * @param {number} productId - 商品 ID
     * @returns {string|null} 操作提示信息
     */
    removeFromCart(productId) {
      const idx = this.items.findIndex(item => item.id === productId);
      if (idx !== -1) {
        const name = this.items[idx].name;
        this.items.splice(idx, 1);
        this._persist();
        return '已移除: ' + name;
      }
      return null;
    },

    /**
     * 更新商品数量
     * 数量 ≤ 0 时自动移除该商品
     * @param {number} productId - 商品 ID
     * @param {number} quantity  - 新数量
     */
    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.id === productId);
      if (item) {
        if (quantity <= 0) return this.removeFromCart(productId);
        item.quantity = quantity;
        this._persist();
      }
      return null;
    },

    /**
     * 商品数量 +1
     */
    increaseQty(productId) {
      const item = this.items.find(item => item.id === productId);
      if (item) {
        item.quantity++;
        this._persist();
      }
    },

    /**
     * 商品数量 -1（减至 0 自动移除）
     */
    decreaseQty(productId) {
      const item = this.items.find(item => item.id === productId);
      if (item) {
        if (item.quantity <= 1) return this.removeFromCart(productId);
        item.quantity--;
        this._persist();
      }
      return null;
    },

    /**
     * 下单结算
     * 保存当前订单金额，清空购物车
     */
    checkout() {
      this.lastOrderAmount = this.totalPrice;
      this.items = [];
      this._persist();
    },

    /**
     * 清空购物车
     * @returns {string} 操作提示信息
     */
    clearCart() {
      this.items = [];
      this._persist();
      return '购物车已清空';
    }
  }
});
