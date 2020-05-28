<template>
    <div>
        <label v-if="label" :class="{'x-form-item-required':isRequired}">{{label}}</label>
        <div>
            <slot></slot>
            <div v-if="validateState === 'error'" class="x-form-item-message">{{validateMessage}}</div>
        </div>
    </div>
</template>
<script>
import Emitter from '../../mixins/emitter'
import AsyncValidator from 'async-validator'
export default {
  name: 'xFormItem',
  mixins: [ Emitter ],
  inject: ['form'],
  data () {
    return {
      initialValue: '',
      validateState: '', // 校验状态
      validateMessage: '',
      isRequired: false // 是否为必填
    }
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String
    }
  },
  computed: {
    // 从Form 的model中动态得到当前表单组件的数据
    fieldValue () {
      return this.form.model[this.prop]
    }
  },
  methods: {
    setRules () {
      let rule = this.getRules()
      if (rule && rule.length) {
        rule.every(item => {
          this.isRequired = item.required
        })
      }
      this.$on('on-form-blur', this.onFieldBlur)
      this.$on('on-form-change', this.onFieldChange)
    },
    // 得到当前的prop的rule
    getRules () {
      let formRules = this.form.rules
      formRules = formRules ? formRules[this.prop] : []
      return [].concat(formRules || [])
    },
    getFilteredRule (trigger) {
      const rules = this.getRules()
      return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1)
    },
    /**
     * 校验数据
     * @param trigger 校验类型
     * @param callback 回调函数
     */
    validator (trigger, callback = function () {}) {
      let rules = this.getFilteredRule(trigger)
      if (!rules || rules.length === 0) {
        return true
      }
      this.validateState = 'validating'
      let descriptor = {}
      descriptor[this.prop] = rules

      const validator = new AsyncValidator(descriptor)
      let model = {}

      model[this.prop] = this.fieldValue
      validator.validate(model, { firstFields: true }, errors => {
        this.validateState = !errors ? 'success' : 'error'
        this.validateMessage = errors ? errors[0].message : ''
        callback(this.validateMessage)
      })
    },
    onFieldBlur () {
      this.validator('blur')
    },
    onFieldChange () {
      this.validator('change')
    },
    resetField () {
      this.validateState = ''
      this.validateMessage = ''
      this.form.model[this.prop] = this.initialValue
    }
  },
  mounted () {
    if (this.prop) {
      this.dispatch('xForm', 'on-form-item-add', this)

      // 设置初始值，以便在重置时恢复默认值
      this.initialValue = this.fieldValue

      this.setRules()
    }
  },
  beforeDestroy () {
    this.dispatch('xForm', 'on-form-item-remove', this)
  }
}
</script>
<style scoped>
 .x-form-item-required::before {
   content: '*';
   color:red;
 }
 .x-form-item-message {
   color: red;
 }
</style>
