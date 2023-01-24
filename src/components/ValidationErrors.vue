<script>
export default {
  name: 'McvValidationErrors',
}
</script>

<script setup>
import {computed, defineProps} from 'vue'

const props = defineProps({
  validationErrors: {
    type: Object,
    required: true,
  },
})
const errorMessages = computed(() => {
  return Object.keys(props.validationErrors).map((name) => {
    const messages = props.validationErrors[name].join(', ')
    return `${name}: ${messages}`
  })
})
</script>

<template>
  <ul class="error-messages">
    <li v-for="errorMessage in errorMessages" :key="errorMessage">
      {{ errorMessage }}
    </li>
  </ul>
</template>