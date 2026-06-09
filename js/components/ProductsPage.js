/**
 * 全部商品列表页面（异步请求 + 分页 + 分类筛选）
 * - mounted 时发送第 1 页请求
 * - 翻页时发送新的异步请求（每次翻页 = 一次请求）
 * - URL 参数同步: ?page=2&category=digital
 */

const ProductsPage = {
  template: '#tpl-products',

  data() {
    return {
      products: [],        // 当前页商品
      loading: false,      // 加载状态
      error: '',           // 错误信息
      currentPage: 1,
      pageSize: 6,
      total: 0,
      totalPages: 0,
      category: 'all',     // 当前分类
      keyword: ''          // 搜索关键字
    };
  },

  computed: {
    cartStore() { return useCartStore(); },

    /** 分类列表 */
    categories() {
      return [
        { key: 'all',      name: '全部' },
        { key: 'digital',  name: '数码电子' },
        { key: 'accessory', name: '电脑配件' },
        { key: 'life',     name: '生活用品' },
        { key: 'sport',    name: '运动户外' }
      ];
    },

    /** 页码按钮数组 */
    pageNumbers() {
      const pages = [];
      for (let i = 1; i <= this.totalPages; i++) pages.push(i);
      return pages;
    }
  },

  watch: {
    /** 监听路由 query 变化，自动重新加载 */
    '$route.query': {
      handler() { this.loadFromRoute(); },
      immediate: false
    }
  },

  mounted() {
    this.loadFromRoute();
  },

  methods: {
    /** 从路由参数读取 page/category，发起请求 */
    loadFromRoute() {
      const q = this.$route.query;
      this.currentPage = parseInt(q.page) || 1;
      this.category = q.category || 'all';
      this.keyword = q.keyword || '';
      this.fetchProducts();
    },

    /** 核心：发送异步分页请求 */
    async fetchProducts() {
      this.loading = true;
      this.error = '';

      try {
        const result = await productApi.query({
          page: this.currentPage,
          pageSize: this.pageSize,
          keyword: this.keyword || undefined,
          category: this.category
        });

        this.products = result.data;
        this.total = result.page.total;
        this.totalPages = result.page.totalPages;
      } catch (err) {
        this.error = err.message || '加载失败';
        this.products = [];
      } finally {
        this.loading = false;
      }
    },

    /** 切换页码 → 发起新请求 */
    goPage(page) {
      if (page < 1 || page > this.totalPages || page === this.currentPage) return;
      this.currentPage = page;
      this.updateRoute();
      this.fetchProducts();  // ← 每次翻页发送一次请求
    },

    /** 切换分类 → 重置为第 1 页并请求 */
    selectCategory(key) {
      if (key === this.category) return;
      this.category = key;
      this.currentPage = 1;
      this.updateRoute();
      this.fetchProducts();  // ← 切换分类也发送请求
    },

    /** 搜索 */
    doSearch() {
      this.currentPage = 1;
      this.updateRoute();
      this.fetchProducts();
    },

    /** 同步状态到 URL */
    updateRoute() {
      const query = {};
      if (this.currentPage > 1) query.page = this.currentPage;
      if (this.category !== 'all') query.category = this.category;
      if (this.keyword) query.keyword = this.keyword;
      this.$router.replace({ query });
    },

    /** 加入购物车 */
    addItem(p) {
      const msg = this.cartStore.addToCart(p);
      toast(msg);
    }
  }
};
