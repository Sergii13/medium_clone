
<script setup>
import {onMounted} from 'vue'
import McvTopbar from '@/components/Topbar.vue'
import {actionsType} from './store/modules/auth'
import {useStore} from 'vuex'

const store = useStore()

onMounted(() => {
  store.dispatch(actionsType.getCurrentUser)
})
</script>

<template>
  <div>
    <McvTopbar />
    <router-view></router-view>
  </div>
</template>


 
