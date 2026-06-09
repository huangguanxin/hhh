/* ============================================================
   路由配置 — 含登录守卫
   ============================================================ */

const routes = [
  { path: '/',                component: HomePage },
  { path: '/products',        component: ProductsPage },
  { path: '/product/:id',     component: ProductDetail },
  { path: '/cart',            component: CartPage },
  { path: '/order-success',   component: OrderSuccessPage },
  { path: '/login',           component: LoginPage,    meta: { guest: true } },
  { path: '/orders',          component: OrderPage,    meta: { auth: true } },
  { path: '/:pathMatch(.*)*', component: NotFoundPage }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

/** 路由守卫 — 未登录访问 /orders → 跳转登录页 */
router.beforeEach((to, from, next) => {
  if (to.meta.auth && !auth.isLoggedIn()) {
    next('/login');
  } else {
    next();
  }
});
