<template>
    <input
        type="text"
        :value="currenValue"
        @input="handleInput"
        @blur="handleBlur"
    />
</template>
<script>
import Emitter from '../../mixins/emitter.js'
export default {
  name: 'xInput',
  mixins: [ Emitter ],
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      currenValue: this.value
    }
  },
  watch: {
    value (val) {
      this.currenValue = val
    }
  },
  methods: {
    handleInput (event) {
      const value = event.target.value
      this.currenValue = value
      this.$emit('input', value)
      this.$emit('xFormItem', 'on-form-change', value)
    },
    handleBlur () {
      this.dispatch('xFormItem', 'on-form-blur', this.currenValue)
    }
  }

}
</script>
