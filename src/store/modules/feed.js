import feedApi from "@/api/feed"

const state = {
   data: null,
   isLoading: false,
   error: null,
}
export const mutationsType = {
   getFeedStart: '[feed] getFeedStart',
   getFeedSuccess: '[feed] getFeedSuccess',
   getFeedFailure: '[feed] getFeedFailure',
}
export const actionsType = {
   getFeed: '[feed] Get Feed'
}
const mutations = {
   [mutationsType.getFeedStart](state) {
      state.isLoading = true;
      state.data = null;
   },
   [mutationsType.getFeedSuccess](state, payload) {
      state.isLoading = false;
      state.data = payload;
   },
   [mutationsType.getFeedFailure](state) {
      state.isLoading = false;
   }
}
const actions = {
   [actionsType.getFeed](context, { apiUrl }) {
      return new Promise(resolve => {
         context.commit(mutationsType.getFeedStart)
         feedApi.getFeed(apiUrl)
            .then(
               response => {
                  context.commit(mutationsType.getFeedSuccess, response.data)
                  resolve(response.data)
               }
            )
            .catch(() => {
               context.commit(mutationsType.getFeedFailure)
            })
      })
   }
}
export default {
   state, actions, mutations
}