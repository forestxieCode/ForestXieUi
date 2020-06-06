<template>
  <div ref="display"></div>
</template>
<script>
import Vue from 'vue'
import { randomStr } from '../../utils/tools'
export default {
  name: 'xDisplay',
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      html: '',
      js: '',
      css: '',
      id: randomStr()
    }
  },
  watch: {
    code () {
      this.destroyCode()
      this.renderCode()
    }
  },
  methods: {
    getSource (source, type) {
      const regex = new RegExp(`<${type}[^>]*>`)
      let openinTag = source.match(regex)
      if (!openinTag) return ''
      else openinTag = openinTag[0]
      return source.slice(source.indexOf(openinTag) + openinTag.length, source.lastIndexOf(`</${type}>`))
    },
    splitCode () {
      const script = this.getSource(this.code, 'script').replace(/export default/, 'return')
      const style = this.getSource(this.code, 'style')
      const template = `<div id="app">${this.getSource(this.code, 'template')} </div>`
      this.js = script
      this.css = style
      this.html = template
    },
    renderCode () {
      this.splitCode()
      if (this.html !== '' && this.js !== '') {
        if (this.css !== '') {
          const style = document.createElement('style')
          style.style = 'text/css'
          style.id = this.id
          style.innerHTML = this.css
          document.getElementsByTagName('head')[0].appendChild(style)
        }
        console.log(this.js)
        // eslint-disable-next-line no-new-func
        const parseStrFunc = new Function(this.js)()
        parseStrFunc.template = this.html
        const Component = Vue.extend(parseStrFunc)
        this.component = new Component().$mount()
        this.$refs.display.appendChild(this.component.$el)
      }
    },
    destroyCode () {
      const $target = document.getElementById(this.id)
      if ($target) $target.parentNode.removeChild($target)
      if (this.component) {
        this.$refs.display.removeChild(this.component.$el)
        this.component.$destroy()
        this.component = null
      }
    }
  },
  beforeDestroy () {
    this.destroyCode()
  },
  mounted () {
    this.renderCode()
  }
}
</script>
