import articleApi from "@/api/article"

const state = {
   data: null,
   isLoading: false,
   error: null,
}

export const mutationsType = {
   getArticleStart: '[article] getArticleStart',
   getArticleSuccess: '[article] getArticleSuccess',
   getArticleFailure: '[article] getArticleFailure',
}
export const actionsType = {
   getArticle: '[article] Get Article'
}
const mutations = {
   [mutationsType.getArticleStart](state) {
      state.isLoading = true;
      state.data = null;
   },
   [mutationsType.getArticleSuccess](state, payload) {
      state.isLoading = false;
      state.data = payload;
   },
   [mutationsType.getArticleFailure](state) {
      state.isLoading = false;
   }
}
const actions = {
   [actionsType.getArticle](context, { slug }) {
      return new Promise(resolve => {
         context.commit(mutationsType.getArticleStart)
         articleApi.getArticle(slug)
            .then(
               data => {
                  context.commit(mutationsType.getArticleSuccess, data)
                  resolve(data)
               }
            )
            .catch(() => {
               context.commit(mutationsType.getArticleFailure)
            })
      })
   }
}
export default {
   state, actions, mutations
}