<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
import { findComponentsDownward } from '../../utils/assist'
import Emitter from '../../mixins/emitter'
export default {
  name: 'xCheckboxGroup',
  mixins: [Emitter],
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      currentValue: this.value,
      childrens: []
    }
  },
  methods: {
    updateModel (update) {
      this.childrens = findComponentsDownward(this, 'xCheckbox')
      if (this.childrens) {
        const { value } = this
        this.childrens.forEach(child => {
          console.log(this.childrens)
          child.model = value
          if (update) {
            // eslint-disable-next-line no-undef
            child.currentValue = value.indexOf(child.label) >= 0
            child.group = true
          }
        })
      }
    },
    change (data) {
      this.currentValue = data
      this.$emit('input', data)
      this.$emit('on-change', data)
      this.dispatch('xFormItem', 'on-form-change', data)
    }
  },
  mounted () {
    this.updateModel(true)
  },
  watch: {
    value () {
      this.updateModel(true)
    }
  }

}
</script>
