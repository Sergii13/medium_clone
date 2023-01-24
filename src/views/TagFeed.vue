<script>
export default {
  name: 'McvTagFeed',
}
</script>
<script setup>
import McvFeed from '@/components/Feed.vue'
import McvPopularTags from '@/components/PopularTags.vue'
import McvBanner from '@/components/Banner.vue'
import McvFeedToggler from '@/components/FeedToggler.vue'
import {computed, ref} from 'vue'
import {useRoute} from 'vue-router'

const route = useRoute()

const tagName = computed(() => {
  return route.params.slug
})
const apiUrl = computed(() => {
  return `/articles?tag=${tagName.value}`
})
</script>
<template>
  <div class="home-page">
    <mcv-banner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <mcv-feed-toggler :tag-name="tagName" />
          <mcv-feed :api-url="apiUrl" />
        </div>
        <div class="col-md-3">
          <mcv-popular-tags />
        </div>
      </div>
    </div>
  </div>
</template>