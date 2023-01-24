
<script>
export default {
  name: 'McvFeedToggler',
}
</script>
<script setup>
import {computed, defineProps} from 'vue'
import {useStore} from 'vuex'
import {getterType} from '@/store/modules/auth'
import {useRoute} from 'vue-router'

const props = defineProps({
  tagName: String,
  required: false,
})

const store = useStore()
const route = useRoute()

const isLoggedIn = computed(() => {
  return store.getters[getterType.isLoggedIn]
})

const routeName = computed(() => {
  return route.name
})
</script>
<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li class="nav-item" v-if="isLoggedIn">
        <router-link
          class="nav-link"
          :to="{name: 'yourFeed'}"
          :class="{active: routeName === 'yourFeed'}"
        >
          Your Feed
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          :to="{name: 'globalFeed'}"
          :class="{active: routeName === 'globalFeed'}"
        >
          Global Feed
        </router-link>
      </li>
      <li class="nav-item" v-if="tagName">
        <router-link
          class="nav-link"
          :to="{name: 'tag'}"
          :class="{active: routeName === 'tag'}"
        >
          <i class="ion-pound"></i>
          {{ props.tagName }}
        </router-link>
      </li>
    </ul>
  </div>
</template>