/**
 * 促销标签子组件 (PromoLabel)
 * 父组件通过 props 传入促销类型和文字
 *
 * props:
 *   type  — 促销类型: 'flash' 限时 | 'coupon' 满减 | 'new' 新品 | 'hot' 爆款
 *   text  — 标签显示文字
 */

const PromoLabel = {
  template: '#tpl-promo-label',

  props: {
    type: {
      type: String,
      default: 'hot',
      validator: v => ['flash', 'coupon', 'new', 'hot'].includes(v)
    },
    text: {
      type: String,
      default: '热销'
    }
  },

  computed: {
    /** 不同类型对应不同 CSS 类名 */
    labelClass() {
      return 'promo-label promo-' + this.type;
    }
  }
};
