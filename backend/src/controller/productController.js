/**
 * 商品控制器 — 处理 HTTP 请求，参数校验，调用 Service，返回 Result
 */

const Result = require('../common/Result');
const productService = require('../service/productService');

class ProductController {
  /** GET /products/query — 分页查询 */
  query(req, res) {
    const { keyword, page, pageSize } = req.query;
    const p = {
      page: parseInt(page) || 1,
      pageSize: parseInt(pageSize) || 10
    };
    if (keyword) p.keyword = keyword;

    const { data, page: pageInfo } = productService.query(p);
    res.json(Result.ok(data, pageInfo));
  }

  /** GET /products/:id — 单件查询 */
  getById(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json(Result.paramError('商品 ID 必须为数字'));
    }
    const p = productService.getById(id);
    if (!p) {
      return res.status(404).json(Result.notFound(`商品 ID=${id} 不存在`));
    }
    res.json(Result.ok(p));
  }

  /** POST /products/add — 新增 */
  add(req, res) {
    const { name, price } = req.body;
    if (!name) {
      return res.status(400).json(Result.paramError('商品名称不能为空'));
    }
    if (price === undefined || price === null || isNaN(Number(price)) || Number(price) < 0) {
      return res.status(400).json(Result.paramError('商品价格必须为非负数字'));
    }
    const product = productService.add(req.body);
    res.status(201).json(Result.ok(product));
  }

  /** PUT /products/update/:id — 更新 */
  update(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json(Result.paramError('商品 ID 必须为数字'));
    }
    if (req.body.price !== undefined && (isNaN(Number(req.body.price)) || Number(req.body.price) < 0)) {
      return res.status(400).json(Result.paramError('商品价格必须为非负数字'));
    }
    const p = productService.update(id, req.body);
    if (!p) {
      return res.status(404).json(Result.notFound(`商品 ID=${id} 不存在`));
    }
    res.json(Result.ok(p));
  }

  /** DELETE /products/delete/:id — 删除 */
  delete(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json(Result.paramError('商品 ID 必须为数字'));
    }
    const ok = productService.delete(id);
    if (!ok) {
      return res.status(404).json(Result.notFound(`商品 ID=${id} 不存在`));
    }
    res.json(Result.ok(null));
  }
}

module.exports = new ProductController();
