<script>
export default {
  name: 'McvErrorMessage',
}
</script>
<script setup>
import {defineProps} from 'vue'

const props = defineProps({
  message: {
    type: String,
    default: 'Something went wrong',
  },
})
</script>
<template>
  <div class="ng-hide">
    {{ props.message }}
  </div>
</template>