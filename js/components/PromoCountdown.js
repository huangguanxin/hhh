/**
 * 促销倒计时子组件 (PromoCountdown)
 * 父组件通过 props 传入促销结束时间戳
 *
 * props:
 *   endTime — 促销结束时间（毫秒时间戳或 Date 字符串）
 */

const PromoCountdown = {
  template: '#tpl-promo-countdown',

  props: {
    endTime: {
      type: [Number, String],
      required: true
    }
  },

  data() {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: false,
      timer: null
    };
  },

  mounted() {
    this.tick();
    this.timer = setInterval(() => this.tick(), 1000);
  },

  beforeUnmount() {
    if (this.timer) clearInterval(this.timer);
  },

  methods: {
    tick() {
      const end = typeof this.endTime === 'string'
        ? new Date(this.endTime).getTime()
        : this.endTime;
      const now = Date.now();
      const diff = Math.max(0, end - now);

      if (diff <= 0) {
        this.expired = true;
        if (this.timer) clearInterval(this.timer);
        return;
      }

      this.hours = Math.floor(diff / 3600000);
      this.minutes = Math.floor((diff % 3600000) / 60000);
      this.seconds = Math.floor((diff % 60000) / 1000);
    }
  }
};
