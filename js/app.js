/* ============================================================
   阶段 7.1：应用入口 — 根组件 + Vue 应用创建与挂载
   - AppRoot：包含导航栏 + Toast 容器 + <router-view>
   - 创建 Vue 应用，注册 Router 和 Pinia
   ============================================================ */

/* -------- 根组件 -------- */
const AppRoot = {
  template: '#tpl-root',

  data() {
    return {
      toasts: []   // 当前显示的 Toast 消息列表
    };
  },

  computed: {
    cartStore() { return useCartStore(); },
    isLoggedIn() { return auth.isLoggedIn(); },
    nickname() { return auth.getUser().nickname || '用户'; }
  },

  methods: {
    doLogout() {
      auth.logout();
      toast('已退出登录');
      this.$router.push('/');
    }
  },

  mounted() {
    toastBus.on((msg) => {
      this.toasts.push(msg);
      setTimeout(() => { this.toasts.shift(); }, 2500);
    });
  }
};

/* -------- 创建 Pinia 实例 -------- */
const pinia = Pinia.createPinia();

/* -------- 创建并启动应用 -------- */
const app = Vue.createApp(AppRoot);
app.use(router);   // 注册 Vue Router
app.use(pinia);    // 注册 Pinia 状态管理
app.mount('#app'); // 挂载到页面
