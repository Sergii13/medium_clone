
<script>
export default {
  name: 'McvTopbar',
}
</script>
<script setup>
import {computed, onMounted} from 'vue'
import {useStore} from 'vuex'
import {getterType} from '@/store/modules/auth'

const store = useStore()

const currentUser = computed(() => {
  return store.getters[getterType.currentUser]
})
const isLoggedIn = computed(() => {
  return store.getters[getterType.isLoggedIn]
})
const isAnonymous = computed(() => {
  return store.getters[getterType.isAnonymous]
})
</script>
<template>
  <nav class="navbar navbar-li">
    <div class="container">
      <router-link class="navbar-brand" :to="{name: 'globalFeed'}">
        MediumClone
      </router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{name: 'globalFeed'}"
            active-class="active"
          >
            Home</router-link
          >
        </li>
        <template v-if="isLoggedIn">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'globalFeed'}"
              exact
              active-class="active"
            >
              <i class="ion-compose"></i> &nbsp; New Article</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'globalFeed'}"
              active-class="active"
            >
              <i class="ion-gear-a"></i> &nbsp;Settings</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'globalFeed', params: {slug: currentUser.username}}"
              active-class="active"
            >
              <img :src="currentUser.image" alt="" class="user-pic" />
              &nbsp;
              {{ currentUser.username }}
            </router-link>
          </li>
        </template>
        <template v-if="isAnonymous">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'login'}"
              active-class="active"
            >
              Sign in</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'register'}"
              active-class="active"
            >
              Sign up</router-link
            >
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.nav-link {
  color: grey;
  &:hover {
    opacity: 0.7;
  }
  &.active {
    color: #000;
  }
}
</style>