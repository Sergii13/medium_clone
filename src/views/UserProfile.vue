<template>
  <div class="container">
    <mcv-loading v-if="isLoading" />
    <mcv-error-message v-if="errors" />
  </div>
  <div class="profile-page" v-if="userProfile">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img class="user-img" :src="userProfile.image" />
            <h4>{{ userProfile.username }}</h4>
            <p>{{ userProfile.bio }}</p>
            <div>
              <button
                v-if="!isCurrentUserProfile"
                class="btn btn-sm action-btn btn-outline-secondary"
              >
                <i class="ion-plus-round"></i>
                &nbsp; Follow {{ userProfile.username }}
              </button>
              <router-link
                v-if="isCurrentUserProfile"
                :to="{name: 'settings'}"
                class="btn btn-sm btn-outline-secondary action-btn"
              >
                <i class="ion-gear-a"></i> Edit Profile Settings
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :class="{active: routeName === 'userProfile'}"
                  :to="{
                    name: 'userProfile',
                    params: {slug: userProfile.username},
                  }"
                  >My articles</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :class="{active: routeName === 'userProfileFavorites'}"
                  :to="{name: 'userProfileFavorites'}"
                  >Favorites articles</router-link
                >
              </li>
            </ul>
          </div>
          <mcv-feed :api-url="apiUrl" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'McvUserProfile',
}
</script>
<script setup>
import {computed, onMounted, watch} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import {actionsType as userProfileActionsType} from '@/store/modules/userProfile'
import {getterType as authGetterType} from '@/store/modules/auth'
import McvFeed from '@/components/Feed.vue'
import McvLoading from '@/components/Loading.vue'
import McvErrorMessage from '@/components/ErrorMessage.vue'

const store = useStore()
const route = useRoute()

const apiUrl = computed(() => {
  const isFavorites = route.path.includes('favorites')
  return isFavorites
    ? `/articles?favorited=${userProfileSlug.value}`
    : `/articles/?author=${userProfileSlug.value}`
})
const userProfileSlug = computed(() => {
  return route.params.slug
})
const routeName = computed(() => {
  return route.name
})
const isLoading = computed(() => {
  return store.state.userProfile.isLoading
})
const errors = computed(() => {
  return store.state.userProfile.errors
})
const userProfile = computed(() => {
  return store.state.userProfile.data
})
const currentUser = computed(() => {
  return store.getters[authGetterType.currentUser]
})
const isCurrentUserProfile = computed(() => {
  if (!currentUser || !userProfile) {
    return false
  }
  return userProfile.value.username === currentUser.value.username
})

const getUserProfile = () => {
  store.dispatch(userProfileActionsType.getUserProfile, {
    slug: route.params.slug,
  })
}
onMounted(() => {
  getUserProfile()
})
watch(userProfileSlug, () => {
  getUserProfile()
})
</script>
