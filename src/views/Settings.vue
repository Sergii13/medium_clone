<script>
export default {
   name: 'McvSettings',
}
</script>
<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import {
   getterType as authGetterType,
   actionsType as authActionTypes,
} from '@/store/modules/auth'
import McvValidationErrors from '@/components/ValidationErrors.vue'
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()

const isSubmitting = computed(() => {
   return store.state.settings.isSubmitting
})
const validationErrors = computed(() => {
   return store.state.settings.validationErrors
})
const currentUser = computed(() => {
   return store.getters[authGetterType.currentUser]
})
const form = computed(() => {
   return {
      username: currentUser.value.username,
      bio: currentUser.value.bio,
      image: currentUser.value.image,
      email: currentUser.value.email,
      password: '',
   }
})
const onSubmit = () => {
   store.dispatch(authActionTypes.updateCurrentUser, {
      currentUserInput: form.value,
   })
}
const logout = () => {
   store.dispatch(authActionTypes.logout)
      .then(() => {
         router.push({ name: 'globalFeed' })
      })
}
</script>
<template>
   <div class="settings-page" v-if="currentUser">
      <div class="container page">
         <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
               <h1 class="text-xs-center">Your Settings</h1>
               <mcv-validation-errors v-if="validationErrors" :validationErrors="validationErrors" />
               <form @submit.prevent="onSubmit">
                  <fieldset ng-disabled="$ctrl.isSubmitting">
                     <fieldset class="form-group">
                        <input class="form-control" type="text" placeholder="URL of profile picture"
                           v-model="form.image" />
                     </fieldset>
                     <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="text" placeholder="Username"
                           v-model="form.username" />
                     </fieldset>
                     <fieldset class="form-group">
                        <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you"
                           v-model="form.bio">
                </textarea>
                     </fieldset>
                     <fieldset class="form-group">
                        <input class="form-control" type="email" placeholder="Email" v-model="form.email" />
                     </fieldset>
                     <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="password" placeholder="New Password"
                           v-model="form.password" />
                     </fieldset>
                     <button :disabled="isSubmitting" class="btn btn-lg btn-primary pull-xs-right" type="submit">
                        Update Settings
                     </button>
                  </fieldset>
               </form>
               <hr />
               <button class="btn btn-outline-danger" @click="logout">
                  Or click here to logout.
               </button>
            </div>
         </div>
      </div>
   </div>
</template>
