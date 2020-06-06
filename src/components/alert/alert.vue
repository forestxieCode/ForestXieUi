<template>
  <div class="alert">
    <div class="alert-main" v-for="(item, index) in notices" :key="index">
      <div class="alert-contect">
        {{item.contect}}
      </div>
    </div>
  </div>
</template>
<script>
let seed = 0
function getUuid () {
  return 'alert_' + (seed++)
}
export default {
  data () {
    return {
      notices: []
    }
  },
  methods: {
    add (notice) {
      const name = getUuid()
      let _notice = Object.assign({
        name: name
      }, notice)
      this.notices.push(_notice)
      const duration = notice.duration

      setTimeout(() => {
        this.remove(name)
      }, duration * 1000)
    },
    remove (name) {
      const notices = this.notices
      for (let i = 0; i < notices.length; i++) {
        if (notices[i].name === name) {
          this.notices.splice(i, 1)
          break
        }
      }
    }
  }
}
</script>
<style>
.alert {
  position: fixed;
  width: 100%;
  top: 16px;
  right: 26px;
  text-align: right;
  pointer-events: none;
}
.alert-contect {
  display: inline-block;
  padding: 8px 16px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
  margin-bottom: 8px;
}
</style>
