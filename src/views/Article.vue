<script>
export default {
   name: 'McvArticle',
}
</script>
<script setup>
import { actionsType as articleActionsType } from '@/store/modules/article'
import { getterType as authGetterType } from '@/store/modules/auth'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import McvLoading from '@/components/Loading.vue'
import McvErrorMessage from '@/components/ErrorMessage.vue'
import McvArticleTags from '@/components/ArticleTags.vue'

const router = useRouter()
const store = useStore()
const route = useRoute()

onMounted(() => {
   store.dispatch(articleActionsType.getArticle, { slug: route.params.slug })
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
const articleTextNormalize = computed(() => {
   return article.value.body.replace(/\\n/g, '\n')
})
const currentUser = computed(() => {
   return store.getters[authGetterType.currentUser]
})
const isAuthor = computed(() => {
   if (!currentUser || !article) {
      return false
   }
   return currentUser.value.username === article.value.author.username
})

const deleteArticle = () => {
   store
      .dispatch(articleActionsType.deleteArticle, { slug: route.params.slug })
      .then(() => {
         router.push({ name: 'globalFeed' })
      })
}
</script>
<template>
   <div class="article-page">
      <div class="banner">
         <div class="container">
            <mcv-loading v-if="isLoading" />
            <mcv-error-message v-if="error" />
         </div>
         <div class="container" v-if="article">
            <h1>
               {{ article.title }}
            </h1>
            <div class="article-meta">
               <router-link :to="{ name: 'userProfile', params: { slug: article.author.username } }">
                  <img :src="article.author.image" />
               </router-link>
               <div class="info">
                  <router-link :to="{
                     name: 'userProfile',
                     params: { slug: article.author.username },
                  }">
                     {{ article.author.username }}
                  </router-link>
                  <span class="date">
                     {{ article.createdAt }}
                  </span>
               </div>
               <span v-if="isAuthor">
                  <router-link class="btn btn-outline-secondary btn-small mx-2" :to="{
                     name: 'editArticle',
                     params: { slug: article.slug },
                  }">
                     <i class="ion-edit"></i>
                     Edit Article
                  </router-link>
                  <button @click="deleteArticle" class="btn btn-small btn-outline-danger">
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
                     {{ articleTextNormalize }}
                  </p>
               </div>
               <mcv-article-tags :tags="article.tagList" />
            </div>
         </div>
      </div>
   </div>
</template>
<style>
.mx-2 {
   margin-right: 10px;
}
</style>