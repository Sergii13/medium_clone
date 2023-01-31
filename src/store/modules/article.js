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
   deleteArticleStart: '[article] deleteArticleStart',
   deleteArticleSuccess: '[article] deleteArticleSuccess',
   deleteArticleFailure: '[article] deleteArticleFailure',
}
export const actionsType = {
   getArticle: '[article] Get Article',
   deleteArticle: '[article] Delete Article'
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
   },
   [mutationsType.deleteArticleStart]() { },
   [mutationsType.deleteArticleSuccess]() { },
   [mutationsType.deleteArticleFailure]() { }
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
   },
   [actionsType.deleteArticle](context, { slug }) {
      return new Promise(resolve => {
         context.commit(mutationsType.deleteArticleStart)
         articleApi.deleteArticle(slug)
            .then(() => {
               context.commit(mutationsType.deleteArticleSuccess)
               resolve()
            })
            .catch(() => {
               context.commit(mutationsType.deleteArticleFailure)
            })
      })
   }
}
export default {
   state, actions, mutations
}