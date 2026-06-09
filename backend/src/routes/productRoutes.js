/**
 * 商品路由定义（RESTful 风格）
 *
 * GET    /products/query       — 分页查询（支持 ?keyword=&page=&pageSize=）
 * GET    /products/:id         — 单件查询
 * POST   /products/add         — 新增商品
 * PUT    /products/update/:id  — 更新商品
 * DELETE /products/delete/:id  — 删除商品
 */

const express = require('express');
const router = express.Router();
const ctrl = require('../controller/productController');

router.get('/products/query',        ctrl.query.bind(ctrl));
router.get('/products/:id',          ctrl.getById.bind(ctrl));
router.post('/products/add',         ctrl.add.bind(ctrl));
router.put('/products/update/:id',   ctrl.update.bind(ctrl));
router.delete('/products/delete/:id', ctrl.delete.bind(ctrl));

module.exports = router;
