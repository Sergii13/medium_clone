<script>
export default {
  name: 'McvEditArticle',
}
</script>
<script setup>
import {ref, computed, onMounted} from 'vue'
import McvLoading from '@/components/Loading.vue'
import McvArticleForm from '@/components/ArticleForm.vue'
import {useStore} from 'vuex'
import {useRouter, useRoute} from 'vue-router'
import {actionsType} from '@/store/modules/editArticle'

const store = useStore()
const router = useRouter()
const route = useRoute()

const validationErrors = computed(() => {
  return store.state.editArticle.validationErrors
})
const isSubmitting = computed(() => {
  return store.state.editArticle.isSubmitting
})
const isLoading = computed(() => {
  return store.state.editArticle.isLoading
})
const article = computed(() => {
  return store.state.editArticle.article
})
const initialValues = computed(() => {
  if (!article.value) {
    return null
  }

  return {
    title: article.value.title,
    description: article.value.description,
    body: article.value.body,
    tagList: article.value.tagList,
  }
})
onMounted(() => {
  store.dispatch(actionsType.getArticle, {slug: route.params.slug})
})
const onSubmit = (articleInput) => {
  store
    .dispatch(actionsType.updateArticle, {
      slug: route.params.slug,
      articleInput,
    })
    .then((article) => {
      router.push({name: 'article', params: {slug: article.slug}})
    })
}
</script>
<template>
  <div class="container">
    <mcv-loading v-if="isLoading" />
    <mcv-article-form
      v-if="initialValues"
      :initialValues="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting"
      @articleSubmit="onSubmit"
      >Edit Article</mcv-article-form
    >
  </div>
</template>
