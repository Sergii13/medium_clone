import { mutationsType as authMutationsType } from "@/store/modules/auth"
const state = {
   isSubmitting: false,
   validationErrors: null,
}

const mutations = {
   [authMutationsType.updateCurrentUserStart](state) {
      state.isSubmitting = true;
      state.validationErrors = null;
   },
   [authMutationsType.updateCurrentUserSuccess](state) {
      state.isSubmitting = false;
   },
   [authMutationsType.updateCurrentUserFailure](state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
   },
}

export default {
   state,
   mutations,
}