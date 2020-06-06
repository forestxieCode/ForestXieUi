<template>
  <div>
    <x-display :code="code"></x-display>
    12312312
  </div>
</template>
<script>
import xDisplay from '../components/display/display'
import defaultCode from './default-code'
export default {
  components: {
    xDisplay
  },
  data () {
    return {
      code: defaultCode
    }
  }
}
</script>
