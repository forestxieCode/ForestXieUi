<template>
  <div class="form">
    <x-form :model="formData" :rules="rules" ref="form">
      <x-form-item label="用户名" prop="name">
        <x-input v-model="formData.name"/>
      </x-form-item>
      <x-form-item label="邮箱" prop="mail">
        <x-input v-model="formData.mail"/>
      </x-form-item>
    </x-form>
     <button @click="handleSubmit">提交</button>
     <button @click="handleReset">重置</button>
  </div>
</template>
<script>
import xForm from '@/components/form/Form.vue'
import xFormItem from '@/components/form/FormItem.vue'
import xInput from '@/components/Input/input.vue'
export default {
  name: 'testform',
  data () {
    return {
      formData: {
        name: '',
        mail: ''
      },
      rules: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    xForm,
    xFormItem,
    xInput
  },
  methods: {
    handleSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          window.alert('提交成功')
        } else {
          window.alert('表达校验失败')
        }
      })
    },
    handleReset () {
      this.$refs.form.resetFields()
    }
  }
}
</script>
<style scoped>

</style>
