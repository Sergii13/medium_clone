import popularTagsApi from "@/api/popularTags"

const state = {
   data: null,
   isLoading: false,
   error: null,
}

export const mutationsType = {
   getPopularTagsStart: '[popularTag] getPopularTagsStart',
   getPopularTagsSuccess: '[popularTag] getPopularTagsSuccess',
   getPopularTagsFailure: '[popularTag] getPopularTagsFailure',
}
export const actionsType = {
   getPopularTags: '[popularTag] Get Popular Tags'
}
const mutations = {
   [mutationsType.getPopularTagsStart](state) {
      state.isLoading = true;
      state.data = null;
   },
   [mutationsType.getPopularTagsSuccess](state, payload) {
      state.isLoading = false;
      state.data = payload;
   },
   [mutationsType.getPopularTagsFailure](state) {
      state.isLoading = false;
   }
}
const actions = {
   [actionsType.getPopularTags](context) {
      return new Promise(resolve => {
         context.commit(mutationsType.getPopularTagsStart)
         popularTagsApi.getPopularTags()
            .then(
               tags => {
                  context.commit(mutationsType.getPopularTagsSuccess, tags)
                  resolve(tags)
               }
            )
            .catch(() => {
               context.commit(mutationsType.getPopularTagsFailure)
            })
      })
   }
}
export default {
   state, actions, mutations
}