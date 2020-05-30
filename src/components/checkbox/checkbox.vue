<template>
    <label>
        <span>
          <input
                v-if="group"
                type="checkbox"
                :disabled="disabled"
                v-model="model"
                :value="label"
                @change="change"
          >
           <input
                v-else
                type="checkbox"
                :disabled="disabled"
                :checked="currentValue"
                @change="change"
          >
        </span>
        <slot></slot>
    </label>
</template>
<script>
import Emitter from '../../mixins/emitter'
import { findComponentUpward } from '../../utils/assist'

export default {
  name: 'xCheckbox',
  mixins: [Emitter],
  props: {
    label: {
      label: {
        type: [String, Number, Boolean]
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: false
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    }
  },
  data () {
    return {
      currentValue: this.value,
      group: false,
      parent: null,
      model: []
    }
  },
  watch: {
    value (val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateModel()
      } else {
        // throw 'value should be trueValue or falseValue'
      }
    }
  },
  methods: {
    change (event) {
      if (this.disabled) return false

      const checked = event.target.checked
      this.currentValue = checked

      const value = checked ? this.trueValue : this.falseValue

      this.$emit('input', value)

      if (this.group) {
        this.parent.change(this.model)
      } else {
        this.$emit('on-change', value)
        this.dispatch('xFormItem', 'on-form-change', value)
      }
    },
    updateModel () {
      this.currentValue = this.value === this.trueValue
    }
  },
  mounted () {
    this.parent = findComponentUpward(this, 'xCheckboxGroup')
    if (this.parent) {
      this.group = true
    }
    if (this.group) {
      this.parent.updateModel(true)
    } else {
      this.updateModel()
    }
  }
}
</script>
