<script>
export default {
   name: 'McvAddToFavorites.vue'
}
</script>
<script setup>
import { toRefs, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { actionTypes } from '@/store/modules/addToFavorites.js'
const store = useStore()

const props = defineProps({
   isFavorited: {
      type: Boolean,
      required: true,
   },
   articleSlug: {
      type: String,
      required: true,
   },
   favoritesCount: {
      type: Number,
      required: true,
   }
})
const { isFavorited, articleSlug, favoritesCount } = toRefs(props);

let isFavoritedOptimistic = ref(isFavorited.value);
let favoritesCountOptimistic = ref(favoritesCount.value)

const handleLike = () => {
   store.dispatch(actionTypes.addToFavorites, {
      slug: articleSlug.value,
      isFavorited: isFavoritedOptimistic.value,
   })
   if (isFavoritedOptimistic.value) {
      favoritesCountOptimistic.value--;
   }
   else {
      favoritesCountOptimistic.value++;
   }
   isFavoritedOptimistic.value = !isFavoritedOptimistic.value;
}

</script>
<template>
   <button
      :class="{ btn: true, 'btn-sm': true, 'btn-primary': isFavoritedOptimistic, 'btn-outline-primary': !isFavoritedOptimistic }"
      @click="handleLike">
      <i class="ion-heart"></i>
      <span>&nbsp;{{ favoritesCountOptimistic }}</span>
   </button>
</template>