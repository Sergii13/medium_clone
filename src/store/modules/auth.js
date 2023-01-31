import authApi from '@/api/auth'
import { setItem } from '@/helpers/persistanceStorage'

const state = {
   isSubmitting: false,
   isLoading: false,
   currentUser: null,
   validationErrors: null,
   isLoggedIn: null
}

export const getterType = {
   currentUser: '[auth] currentUser',
   isLoggedIn: '[auth] isLoggedIn',
   isAnonymous: '[auth] isAnonymous'
}
const getters = {
   [getterType.currentUser]: state => {
      return state.currentUser;
   },
   [getterType.isLoggedIn]: state => {
      return Boolean(state.isLoggedIn)
   },
   [getterType.isAnonymous]: state => {
      return state.isLoggedIn === false
   },
}
export const mutationsType = {
   registerStart: '[auth] registerStart',
   registerFailure: '[auth] registerFailure',
   registerSuccess: '[auth] registerSuccess',

   loginStart: '[auth] loginStart',
   loginFailure: '[auth] loginFailure',
   loginSuccess: '[auth] loginSuccess',

   getCurrentUserStart: '[auth] getCurrentUserStart',
   getCurrentUserFailure: '[auth] getCurrentUserFailure',
   getCurrentUserSuccess: '[auth] getCurrentUserSuccess',

   updateCurrentUserStart: '[auth] updateCurrentUserStart',
   updateCurrentUserFailure: '[auth] updateCurrentUserFailure',
   updateCurrentUserSuccess: '[auth] updateCurrentUserSuccess',

   logout: '[auth] logout'
}
const mutations = {
   [mutationsType.registerStart](state) {
      state.isSubmitting = true;
      state.isLoading = true;
      state.validationErrors = null;
   },
   [mutationsType.registerSuccess](state, payload) {
      state.isSubmitting = false;
      state.currentUser = payload;
      state.isLoggedIn = true;
      state.isLoading = false;
   },
   [mutationsType.registerFailure](state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
      state.isLoading = false;
   },
   [mutationsType.loginStart](state) {
      state.isLoading = true;
      state.isSubmitting = true;
      state.validationErrors = null;
   },
   [mutationsType.loginSuccess](state, payload) {
      state.isSubmitting = false;
      state.currentUser = payload;
      state.isLoggedIn = true;
      state.isLoading = false;
   },
   [mutationsType.loginFailure](state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
      state.isLoading = false;
   },
   [mutationsType.getCurrentUserStart](state) {
      state.isLoading = true;
   },
   [mutationsType.getCurrentUserSuccess](state, payload) {
      state.isLoading = false;
      state.currentUser = payload;
      state.isLoggedIn = true;
   },
   [mutationsType.getCurrentUserFailure](state, payload) {
      state.isLoading = false;
      state.isLoggedIn = false;
   },
   [mutationsType.updateCurrentUserStart]() {
   },
   [mutationsType.updateCurrentUserSuccess](state, payload) {
      state.currentUser = payload;
   },
   [mutationsType.updateCurrentUserFailure]() {
   },
   [mutationsType.logout](state) {
      state.currentUser = null;
      state.isLoggedIn = false;
   },
}

export const actionsType = {
   register: '[auth] register',
   login: '[auth] register',
   getCurrentUser: '[auth] getCurrentUser',
   updateCurrentUser: '[auth] updateCurrentUser',
   logout: '[auth] logut',
}

const actions = {
   [actionsType.register](context, credentials) {
      return new Promise(resolve => {
         context.commit(mutationsType.registerStart)
         authApi.register(credentials)
            .then(response => {
               context.commit(mutationsType.registerSuccess, response.data.user)
               setItem('jwtToken', response.data.user.token)
               resolve(response.data.user)
            })
            .catch(result => {
               context.commit(mutationsType.registerFailure, result.response.data.errors)
            })
      })
   },
   [actionsType.login](context, credentials) {
      return new Promise(resolve => {
         context.commit(mutationsType.loginStart)
         authApi.login(credentials)
            .then(response => {
               context.commit(mutationsType.loginSuccess, response.data.user)
               setItem('accessToken', response.data.user.token)
               resolve(response.data.user)
            })
            .catch(result => {
               context.commit(mutationsType.loginFailure, result.response.data.errors)
            })
      })
   },
   [actionsType.getCurrentUser](context) {
      return new Promise(resolve => {
         context.commit(mutationsType.getCurrentUserStart)
         authApi.getCurrentUser()
            .then(response => {
               context.commit(mutationsType.getCurrentUserSuccess, response.data.user)
               resolve(response.data.user)
            })
            .catch(() => {
               context.commit(mutationsType.getCurrentUserFailure)
            })
      })
   },
   [actionsType.updateCurrentUser](context, { currentUserInput }) {
      return new Promise(resolve => {
         context.commit(mutationsType.updateCurrentUserStart)
         authApi.updateCurrentUser(currentUserInput)
            .then(user => {
               context.commit(mutationsType.updateCurrentUserSuccess, user)
               resolve(user)
            })
            .catch(() => {
               context.commit(mutationsType.updateCurrentUserFailure, result.response.data.errors)
            })
      })
   },
   [actionsType.logout](context) {
      return new Promise(resolve => {
         setItem('accessToken', '')
         context.commit(mutationsType.logout)
         resolve()
      })
   }
}

export default {
   state,
   mutations,
   actions,
   getters,
}