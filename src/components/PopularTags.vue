<script>
export default {
  name: 'McvPopularTags',
}
</script>
<script setup>
import {useStore} from 'vuex'
import {computed, onMounted} from '@vue/runtime-core'
import {actionsType} from '@/store/modules/popularTags'
import McvLoading from '@/components/Loading.vue'
import McvErrorMessage from '@/components/ErrorMessage.vue'

const store = useStore()

const isLoading = computed(() => {
  return store.state.popularTags.isLoading
})
const error = computed(() => {
  return store.state.popularTags.error
})
const popularTags = computed(() => {
  return store.state.popularTags.data
})

onMounted(() => {
  store.dispatch(actionsType.getPopularTags)
})
</script>
<template>
  <div class="sidebar">
    <p>Popular Tags</p>
    <div v-if="popularTags" class="tag-list">
      <router-link
        v-for="popularTag in popularTags"
        :key="popularTag"
        :to="{name: 'tag', params: {slug: popularTag}}"
        class="tag-default tag-pill ng-binding ng-scope"
      >
        {{ popularTag }}
      </router-link>
    </div>
    <mcv-loading v-if="isLoading" />
    <mcv-error-message v-if="error" :message="'Not tags is...'" />
  </div>
</template>