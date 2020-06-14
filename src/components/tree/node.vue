<template>
  <ul class="tree-ul">
    <li class="tree-li">
      <span class="tree-expand" @click="handleExpand">
        <span v-if="data.children && data.children.length && !data.expand"> + </span>
        <span v-if="data.children && data.children.length && data.expand"> - </span>
        <x-checkbox
          v-if="showCheckbox"
          :value ="data.checked"
          @input="handleCheck"
        ></x-checkbox>
        <tree-node v-if="data.expand"
          v-for="(item, index) in data.children"
          :key="index"
          :data="item"
          :show-checkbox="showCheckbox"
        />
      </span>
    </li>
  </ul>
</template>
<script>
import xCheckbox from '../checkbox/checkbox'
import { findComponentUpward } from '../../utils/assist'
export default {
  components: { xCheckbox },
  data () {
    return {
      tree: findComponentUpward(this, 'Tree')
    }
  },
  watch: {
    'data.children': {
      handler (data) {
        if (data) {
          const checkedAll = !data.some(item => !item.checked)
          this.$set(this.data, 'checked', checkedAll)
        }
      },
      deep: true
    }
  },
  methods: {
    handleCheck (checked) {
      this.updateTreeDown(this.data, checked)
      if (this.tree) {
        this.tree.emitEvent('on-check-change', this.data)
      }
    },
    updataTreeDown (data, checked) {
      this.$set(data, 'checked', checked)
      if (data.children && data.children.length) {
        data.children.forEach(item => {
          this.updataTreeDown(item, checked)
        })
      }
    },
    handleExpand () {
      this.$set(this.data, 'expand', !this.data.expand)
      if (this.tree) {
        this.tree.emitEvent('on-toggle-expand', this.data)
      }
    }
  },
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    showCheckbox: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped>
.tree-ul, .tree-li{
  list-style: none;
  padding-left: 10px;
}
.tree-expand{
   cursor: pointer;
}
</style>
