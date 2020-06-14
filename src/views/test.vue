<script>
import Vue from 'vue'
export default {
  mounted () {
    this.testRender()
  },
  methods: {
    testRender () {
      let Profile = Vue.extend({
        template: `<p> hello world {{firtName}} </p>`,
        data: function (params) {
          return {
            firtName: 'water'
          }
        }
      })
      // eslint-disable-next-line new-cap
      new Profile().$mount('#test')
    }
  },
  // eslint-disable-next-line standard/object-curly-even-spacing
  render: (h) => h('div', { attrs: {id: 'test' } }, '你好')
}
</script>
