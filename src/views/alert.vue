<template>
  <div>
    <button @click="showNotificaiton">alert</button>
  </div>
</template>
<script>
export default {
  methods: {
    showNotificaiton () {
      this.$Alert.info({duration: 2, contect: '这是一个测试'})
    }
  }
}
</script>
