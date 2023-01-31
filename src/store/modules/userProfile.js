import userProfileApi from "@/api/userProfile"

const state = {
   data: null,
   isLoading: false,
   error: null,
}

export const mutationsType = {
   getUserProfileStart: '[UserProfile] getUserProfileStart',
   getUserProfileSuccess: '[UserProfile] getUserProfileSuccess',
   getUserProfileFailure: '[UserProfile] getUserProfileFailure',
}
export const actionsType = {
   getUserProfile: '[UserProfile] Get User Profile'
}
const mutations = {
   [mutationsType.getUserProfileStart](state) {
      state.isLoading = true;
      state.data = null;
   },
   [mutationsType.getUserProfileSuccess](state, payload) {
      state.isLoading = false;
      state.data = payload;
   },
   [mutationsType.getUserProfileFailure](state) {
      state.isLoading = false;
   }
}
const actions = {
   [actionsType.getUserProfile](context, { slug }) {
      return new Promise(resolve => {
         context.commit(mutationsType.getUserProfileStart)
         userProfileApi.getUserProfile(slug)
            .then(
               user => {
                  context.commit(mutationsType.getUserProfileSuccess, user)
                  resolve(user)
               }
            )
            .catch(() => {
               context.commit(mutationsType.getUserProfileFailure)
            })
      })
   }
}
export default {
   state, actions, mutations
}