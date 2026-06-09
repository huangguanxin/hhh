/* ============================================================
   阶段 5：Vue Router 路由配置
   使用 Hash 模式，兼容静态文件部署
   路由表：
     /                 → HomePage          首页
     /products         → ProductsPage      全部商品
     /product/:id      → ProductDetail     商品详情（动态路由）
     /cart             → CartPage           购物车
     /order-success    → OrderSuccessPage   下单成功页
     /:pathMatch(.*)*  → NotFoundPage       404 兜底
   ============================================================ */

const routes = [
  { path: '/',                component: HomePage },
  { path: '/products',        component: ProductsPage },
  { path: '/product/:id',     component: ProductDetail },
  { path: '/cart',            component: CartPage },
  { path: '/order-success',   component: OrderSuccessPage },
  { path: '/:pathMatch(.*)*', component: NotFoundPage }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});
