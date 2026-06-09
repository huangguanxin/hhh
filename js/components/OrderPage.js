/**
 * 订单列表页 — JWT 认证后查询当前用户订单
 * GET /orders/query (自动带 Token → 后端解析 userId)
 */
const OrderPage = {
  template: '#tpl-orders',
  data() {
    return {
      orders: [],
      loading: false,
      error: '',
      currentPage: 1,
      pageSize: 5,
      total: 0,
      totalPages: 0,
      status: '' // 筛选状态
    };
  },
  computed: {
    cartStore() { return useCartStore(); },
    isLoggedIn() { return auth.isLoggedIn(); },
    user() { return auth.getUser(); },
    pageNumbers() {
      const pages = [];
      for (let i = 1; i <= this.totalPages; i++) pages.push(i);
      return pages;
    },
    statuses() {
      return [
        { key: '',        name: '全部' },
        { key: 'PENDING',   name: '待支付' },
        { key: 'PAID',      name: '已支付' },
        { key: 'SHIPPED',   name: '已发货' },
        { key: 'COMPLETED', name: '已完成' },
        { key: 'CANCELLED', name: '已取消' }
      ];
    }
  },
  mounted() {
    if (!auth.isLoggedIn()) {
      this.$router.push('/login');
      return;
    }
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      this.loading = true;
      this.error = '';
      try {
        const params = { page: this.currentPage, pageSize: this.pageSize };
        if (this.status) params.status = this.status;
        const res = await request.get('/orders/query', params);
        if (res.code === 200) {
          this.orders = res.data;
          this.total = res.page.total;
          this.totalPages = res.page.totalPages;
        } else {
          this.error = res.message;
        }
      } catch (err) {
        this.error = err.message || '加载失败';
      } finally {
        this.loading = false;
      }
    },
    filterStatus(s) {
      this.status = s;
      this.currentPage = 1;
      this.fetchOrders();
    },
    goPage(p) {
      if (p < 1 || p > this.totalPages || p === this.currentPage) return;
      this.currentPage = p;
      this.fetchOrders();
    },
    statusText(s) {
      const map = { PENDING:'待支付', PAID:'已支付', SHIPPED:'已发货', COMPLETED:'已完成', CANCELLED:'已取消' };
      return map[s] || s;
    },
    addItem(p) {
      const msg = this.cartStore.addToCart({
        id: p.productId, name: p.productName,
        price: parseFloat(p.unitPrice), image: '📦', color: '#dfe6e9'
      });
      toast(msg);
    }
  }
};
