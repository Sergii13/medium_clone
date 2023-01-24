<script>
export default {
  name: 'McvArticle',
}
</script>
<script setup>
import {actionsType as articleActionsType} from '@/store/modules/article'
import {getterType as authGetterType} from '@/store/modules/auth'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import {computed, onMounted} from 'vue'
import McvLoading from '@/components/Loading.vue'
import McvErrorMessage from '@/components/ErrorMessage.vue'
const router = useRoute()
const store = useStore()

onMounted(() => {
  store.dispatch(articleActionsType.getArticle, {slug: router.params.slug})
})

const isLoading = computed(() => {
  return store.state.article.isLoading
})
const error = computed(() => {
  return store.state.article.error
})
const article = computed(() => {
  return store.state.article.data
})
const currentUser = computed(() => {
  return store.getters[authGetterType.currentUser]
})
const isAuthor = computed(() => {
  if (!currentUser || !article) {
    return false
  }
  return currentUser.username === article.author.username
})
</script>
<template>
  <div class="article-page">
    <div class="banner">
      <mcv-loading v-if="isLoading" />
      <mcv-error-message v-if="error" />
      <div class="container" v-if="article">
        <h1>
          {{ article.title }}
        </h1>
        <div class="article-meta">
          <router-link
            :to="{name: 'userProfile', params: {slug: article.author.username}}"
          >
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: {slug: article.author.username},
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">
              {{ article.createdAt }}
            </span>
          </div>
          <span v-if="isAuthor">
            <router-link
              class="btn btn-outline-secondary btn-small"
              :to="{
                name: 'editArticle',
                params: {slug: article.slug},
              }"
            >
              <i class="ion-edit"></i>
              Edit Article
            </router-link>
            <button class="btn btn-small btn-outline-danger">
              <i class="ion-trash-a"> Delete Article</i>
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class="container page">
      <mcv-loading v-if="isLoading" />
      <mcv-error-message v-if="error" />
      <div class="row article-content" v-if="article">
        <div class="col-xs-12">
          <div>
            <p>
              {{ article.body }}
            </p>
          </div>
          TAGLIST
        </div>
      </div>
    </div>
  </div>
</template>