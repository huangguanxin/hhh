/* ============================================================
   阶段 2：商品数据模型
   定义全部商品列表，作为前端静态数据源
   每件商品包含：id, name, desc, price, image(emoji), color
   ============================================================ */

const products = [
  {
    id: 1,
    name: '无线蓝牙耳机',
    desc: '主动降噪 | 30h续航 | Hi-Fi音质',
    price: 299,
    image: '🎧',
    color: '#2d3436',
    promotion: { type: 'flash', text: '限时特惠', endTime: Date.now() + 2 * 3600 * 1000 }
  },
  {
    id: 2,
    name: '智能手表 Pro',
    desc: '心率监测 | 血氧检测 | 14天续航',
    price: 899,
    image: '⌚',
    color: '#636e72',
    promotion: { type: 'coupon', text: '满899减100', endTime: Date.now() + 6 * 3600 * 1000 }
  },
  {
    id: 3,
    name: '便携充电宝 20000mAh',
    desc: '快充 | 数显 | 轻薄机身',
    price: 129,
    image: '🔋',
    color: '#00b894',
    promotion: { type: 'new', text: '新品首发', endTime: Date.now() + 24 * 3600 * 1000 }
  },
  {
    id: 4,
    name: '机械键盘 87键',
    desc: '青轴 | RGB背光 | 热插拔',
    price: 349,
    image: '⌨️',
    color: '#6c5ce7',
    promotion: { type: 'flash', text: '秒杀中', endTime: Date.now() + 1800 * 1000 }
  },
  {
    id: 5,
    name: '运动跑鞋 轻云',
    desc: '超轻透气 | 缓震回弹 | 防滑耐磨',
    price: 459,
    image: '👟',
    color: '#fd79a8',
    promotion: { type: 'hot', text: '热销爆款', endTime: Date.now() + 48 * 3600 * 1000 }
  },
  {
    id: 6,
    name: '双肩电脑包',
    desc: '防泼水 | 15.6寸 | USB充电口',
    price: 189,
    image: '🎒',
    color: '#0984e3',
    promotion: { type: 'coupon', text: '满299包邮', endTime: Date.now() + 12 * 3600 * 1000 }
  },
  {
    id: 7,
    name: '保温杯 500ml',
    desc: '316不锈钢 | 24h保温 | 真空断热',
    price: 89,
    image: '☕',
    color: '#e17055',
    promotion: { type: 'flash', text: '限时半价', endTime: Date.now() + 3600 * 1000 }
  },
  {
    id: 8,
    name: '无线鼠标 静音版',
    desc: '双模连接 | 人体工学 | 超长续航',
    price: 79,
    image: '🖱️',
    color: '#b2bec3',
    promotion: { type: 'new', text: '上新特价', endTime: Date.now() + 72 * 3600 * 1000 }
  }
];
