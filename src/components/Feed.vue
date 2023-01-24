<script>
export default {
  name: 'McvFeed',
}
</script>
<script setup>
import {computed, defineProps, onMounted, onUpdated, ref, watch} from 'vue'
import {useStore} from 'vuex'
import {actionsType} from '@/store/modules/feed'
import McvPagination from '@/components/Pagination.vue'
import McvLoading from '@/components/Loading.vue'
import McvErrorMessage from '@/components/ErrorMessage.vue'
import {limitValue} from '@/helpers/vars'
import {useRoute} from 'vue-router'
import queryString from 'query-string'

const store = useStore()
const route = useRoute()

const props = defineProps({
  apiUrl: {
    type: String,
    required: true,
  },
})

const apiUrl = computed(() => {
  return props.apiUrl
})
watch(apiUrl, () => {
  fetchFeed()
})

const limit = ref(limitValue)

const baseUrl = computed(() => {
  return route.path
})

const isLoading = computed(() => {
  return store.state.feed.isLoading
})

const error = computed(() => {
  return store.state.feed.error
})

const feed = computed(() => {
  return store.state.feed.data
})

const currentPage = computed(() => {
  return Number(route.query.page || 1)
})
const offset = computed(() => {
  return currentPage.value * limit.value - limit.value
})

const fetchFeed = () => {
  const parsedUrl = queryString.parseUrl(props.apiUrl)
  const stringifiedParams = queryString.stringify({
    limit: limit.value,
    offset: offset.value,
    ...parsedUrl.query,
  })
  const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
  store.dispatch(actionsType.getFeed, {apiUrl: apiUrlWithParams})
}

onMounted(() => {
  fetchFeed()
})

watch(currentPage, () => {
  fetchFeed()
})
</script>
<template>
  <div>
    <mcv-loading v-if="isLoading" />
    <mcv-error-message v-if="error" />
    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
        <div class="article-meta">
          <router-link
            :to="{
              name: 'globalFeed',
              params: {slug: article.author.username},
            }"
          >
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'globalFeed',
                params: {slug: article.author.username},
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">ADD TO FAVORITES</div>
        </div>
        <router-link
          :to="{name: 'article', params: {slug: article.slug}}"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          TAG LIST
        </router-link>
      </div>
      <mcv-pagination
        :total="feed.articlesCount"
        :limit="limit"
        :current-page="currentPage"
        :url="baseUrl"
      />
    </div>
  </div>
</template>