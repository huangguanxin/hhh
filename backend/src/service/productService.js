/**
 * 商品服务层 — 内存存储（演示用，生产环境应替换为数据库）
 * 提供商品的增删改查及分页查询
 */

const products = [
  { id: 1, name: '无线蓝牙耳机',   desc: '主动降噪 | 30h续航 | Hi-Fi音质',            price: 299, image: '🎧',   color: '#2d3436' },
  { id: 2, name: '智能手表 Pro',    desc: '心率监测 | 血氧检测 | 14天续航',              price: 899, image: '⌚',   color: '#636e72' },
  { id: 3, name: '便携充电宝',      desc: '20000mAh | 快充 | 数显',                     price: 129, image: '🔋',   color: '#00b894' },
  { id: 4, name: '机械键盘 87键',    desc: '青轴 | RGB背光 | 热插拔',                    price: 349, image: '⌨️',   color: '#6c5ce7' },
  { id: 5, name: '运动跑鞋 轻云',    desc: '超轻透气 | 缓震回弹 | 防滑耐磨',              price: 459, image: '👟',   color: '#fd79a8' },
  { id: 6, name: '双肩电脑包',       desc: '防泼水 | 15.6寸 | USB充电口',                price: 189, image: '🎒',   color: '#0984e3' },
  { id: 7, name: '保温杯 500ml',    desc: '316不锈钢 | 24h保温 | 真空断热',              price: 89,  image: '☕',   color: '#e17055' },
  { id: 8, name: '无线鼠标 静音版',  desc: '双模连接 | 人体工学 | 超长续航',              price: 79,  image: '🖱️',   color: '#b2bec3' },
];

let nextId = 9;

class ProductService {
  /** 分页查询商品 */
  query({ keyword, page = 1, pageSize = 10 }) {
    let list = [...products];
    if (keyword) {
      list = list.filter(p => p.name.includes(keyword) || p.desc.includes(keyword));
    }
    const total = list.length;
    const start = (page - 1) * pageSize;
    const data = list.slice(start, start + pageSize);
    return { data, page: { page, pageSize, total } };
  }

  /** 根据 ID 查询 */
  getById(id) {
    return products.find(p => p.id === id) || null;
  }

  /** 新增商品 */
  add({ name, desc, price, image, color }) {
    const product = {
      id: nextId++,
      name,
      desc: desc || '',
      price: Number(price),
      image: image || '📦',
      color: color || '#dfe6e9'
    };
    products.push(product);
    return product;
  }

  /** 更新商品 */
  update(id, { name, desc, price, image, color }) {
    const p = this.getById(id);
    if (!p) return null;
    if (name !== undefined)  p.name = name;
    if (desc !== undefined)  p.desc = desc;
    if (price !== undefined) p.price = Number(price);
    if (image !== undefined) p.image = image;
    if (color !== undefined) p.color = color;
    return p;
  }

  /** 删除商品 */
  delete(id) {
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return false;
    products.splice(idx, 1);
    return true;
  }
}

module.exports = new ProductService();
