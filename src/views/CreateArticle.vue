<script>
export default {
   name: 'McvCreateArticle',
}
</script>
<script setup>
import { ref, computed } from 'vue'
import McvArticleForm from '@/components/ArticleForm.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { actionsType } from '@/store/modules/createArticle'

const store = useStore()
const router = useRouter()

const initialValues = ref({
   title: '',
   description: '',
   body: '',
   tagList: [],
})

const validationErrors = computed(() => {
   return store.state.createArticle.validationErrors
})

const isSubmitting = computed(() => {
   return store.state.createArticle.isSubmitting
})

const onSubmit = (articleInput) => {
   store.dispatch(actionsType.createArticle, { articleInput })
      .then((article) => {
         router.push({ name: 'article', params: { slug: article.slug } })
      })
}
</script>
<template>
   <mcv-article-form :initial-values="initialValues" :errors="validationErrors" :is-submitting="isSubmitting"
      @articleSubmit="onSubmit">Create Article</mcv-article-form>
</template>
