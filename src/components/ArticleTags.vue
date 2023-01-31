<script>
export default {
  name: 'McvArticleTags',
}
</script>
<script setup>
import {defineProps} from 'vue'

const props = defineProps({
  tags: {
    type: Array,
    required: true,
  },
})
</script>
<template>
  <ul class="tag-list">
    <li
      v-for="tag in tags"
      :key="tag"
      class="tag-default tag-pill tag-outline ng-binding ng-scope"
    >
      {{ tag }}
    </li>
  </ul>
</template>
