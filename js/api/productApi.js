/**
 * 商品 API 封装 (productApi.js)
 * - query({ page, pageSize, keyword, category }) → 分页查询
 * - 后端不可用时自动使用本地 mock 分页
 */

const productApi = {
  /** 后端路径 */
  BASE: '/products',

  /**
   * 分页查询商品
   * @param {object} opts
   * @param {number} opts.page     - 页码，默认 1
   * @param {number} opts.pageSize - 每页条数，默认 6
   * @param {string} opts.keyword  - 搜索关键字
   * @param {string} opts.category - 分类筛选 (all|digital|accessory|life|sport)
   * @returns {Promise<{data:Array, page:{page,pageSize,total,totalPages}}>}
   */
  async query(opts = {}) {
    const { page = 1, pageSize = 6, keyword, category } = opts;
    const params = { page, pageSize };
    if (keyword) params.keyword = keyword;
    if (category) params.category = category;

    // 尝试后端 API
    try {
      if (await request.checkBackend()) {
        const res = await request.get(`${this.BASE}/query`, params);
        return { data: res.data, page: res.page };
      }
    } catch { /* 后端不可用，走 mock */ }

    // Mock 兜底
    return this._mockQuery({ page, pageSize, keyword, category });
  },

  /** Mock 分页查询（后端不可用时自动切换） */
  _mockQuery({ page, pageSize, keyword, category }) {
    let list = [...products];

    // 关键字过滤
    if (keyword) {
      const kw = keyword.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(kw) || p.desc.toLowerCase().includes(kw)
      );
    }

    // 分类过滤
    if (category && category !== 'all') {
      const map = {
        digital:  [1, 2],        // 数码: 蓝牙耳机、智能手表
        accessory: [3, 4, 8],    // 配件: 充电宝、键盘、鼠标
        life:     [6, 7],        // 生活: 电脑包、保温杯
        sport:    [5]            // 运动: 跑鞋
      };
      const ids = map[category] || [];
      list = list.filter(p => ids.includes(p.id));
    }

    const total = list.length;
    const start = (page - 1) * pageSize;
    const data = list.slice(start, start + pageSize);

    return {
      data,
      page: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) }
    };
  }
};
