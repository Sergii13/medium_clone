<script>
export default {
  name: 'McvBanner',
}
</script>
<script setup>
import {useStore} from 'vuex'
import {computed} from 'vue'

const store = useStore()

const isLogged = computed(() => {
  return store.state.auth.isLogged
})
</script>
<template>
  <div class="banner">
    <div class="container">
      <h1 class="logo-font ng-binding">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>
</template>