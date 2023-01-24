<script>
export default {
  name: 'McvRegister',
}
</script>

<script setup>
import {ref, onMounted, computed} from 'vue'
import {useStore, mapState} from 'vuex'
import {useRouter} from 'vue-router'
import McvValidationErrors from '@/components/ValidationErrors.vue'
import {actionsType, mutationsType} from '@/store/modules/auth'

const store = useStore()
const router = useRouter()

const isSubmitting = computed(() => {
  return store.state.auth.isSubmitting
})
const email = ref('')
const username = ref('')
const password = ref('')

const onSubmit = () => {
  store.commit(mutationsType.registerStart)
  store
    .dispatch(actionsType.register, {
      email: email.value,
      username: username.value,
      password: password.value,
    })
    .then((user) => {
      router.push({name: 'globalFeed'})
    })
}
const validationErrors = computed(() => {
  return store.state.auth.validationErrors
})
</script>

<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'login'}"> Have a account? </router-link>
          </p>
          <McvValidationErrors
            v-if="validationErrors"
            :validationErrors="validationErrors"
          />
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Username"
                v-model="username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="password"
              />
            </fieldset>
            <button
              :disabled="isSubmitting"
              class="btn btn-lg btn-primary pull-xs-right"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
 
