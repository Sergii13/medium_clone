<script>
export default {
   name: 'McvArticleForm',
}
</script>
<script setup>
import { defineProps, defineEmits, ref, toRefs, computed } from 'vue'
import McvValidationErrors from '@/components/ValidationErrors.vue'

const props = defineProps({
   initialValues: {
      type: Object,
      required: true,
   },
   errors: {
      type: Object,
      required: false,
   },
   isSubmitting: {
      type: Boolean,
      required: true,
   },
})
const { title, description, body, tagList } = toRefs(props.initialValues)

const emit = defineEmits({
   articleSubmit: null,
})

const removeTag = (index) => {
   tagList.value.splice(index, 1)
}

const newTagList = ref('')

const onSubmit = () => {
   const newTags = newTagList.value.trim().length > 0 ? tagList.value.concat(newTagList.value.split(' ')) : tagList.value
   const formData = {
      title: title.value,
      description: description.value,
      body: body.value,
      tagList: newTags,
   }
   emit('articleSubmit', formData)
}
</script>
<template>
   <div class="editor-page ng-scope">
      <div class="container page">
         <div class="row">
            <h2 class="title">
               <slot></slot>
            </h2>
            <div class="col-md-10 offset-md-1 col-xs-12">
               <mcv-validation-errors :validationErrors="props.errors" v-if="props.errors" />
               <form @submit.prevent="onSubmit">
                  <fieldset>
                     <fieldset class="form-group">
                        <input v-model="title" class="form-control form-control-lg" type="text"
                           placeholder="Article Title" />
                     </fieldset>

                     <fieldset class="form-group">
                        <input v-model="description" class="form-control" type="text"
                           placeholder="What's this article about?" />
                     </fieldset>

                     <fieldset class="form-group">
                        <textarea v-model="body" class="form-control" rows="8" ng-model="$ctrl.article.body"
                           placeholder="Write your article (in markdown)">
                </textarea>
                     </fieldset>

                     <fieldset class="form-group">
                        <input v-model="newTagList" class="form-control" type="text" placeholder="Enter tags" />
                        <div v-if="tagList" class="tag-list">
                           <span v-for="(tag, index) in tagList" :key="tag" class="tag-default tag-pill">
                              <i @click="removeTag(index)" class="ion-close-round"></i>
                              {{ tag }}
                           </span>
                        </div>
                     </fieldset>

                     <button class="btn btn-lg pull-xs-right btn-primary" :disable="isSubmitting" type="submit">
                        Publish Article
                     </button>
                  </fieldset>
               </form>
            </div>
         </div>
      </div>
   </div>
</template>
<style scoped>
.title {
   text-align: center;
   width: 100%;
   margin-bottom: 30px;
   font-weight: 700;
}

.tag-list {
   margin-top: 10px;
}
</style>
