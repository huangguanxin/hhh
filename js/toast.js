/* ============================================================
   阶段 4：Toast 消息通知系统（简易事件总线）
   - toastBus.emit(msg)  :  发送一条消息
   - toastBus.on(fn)     :  注册消息监听回调
   - toast(msg)          :  便捷函数，等同于 toastBus.emit(msg)
   ============================================================ */

const toastBus = {
  listeners: [],

  /** 发送消息到所有监听器 */
  emit(msg) {
    this.listeners.forEach(fn => fn(msg));
  },

  /** 注册一个消息监听回调 */
  on(fn) {
    this.listeners.push(fn);
  }
};

/** 快捷调用：发送一条 Toast 消息 */
const toast = (msg) => toastBus.emit(msg);
