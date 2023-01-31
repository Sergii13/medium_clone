import articleApi from '@/api/article'

const state = {
   isSubmitting: false,
   validationErrors: null,
   isLoading: false,
   article: null,
}

export const mutationTypes = {
   updateArticleStart: '[updateArticle] Update article start',
   updateArticleSuccess: '[updateArticle] Update article success',
   updateArticleFailure: '[updateArticle] Update article failure',

   getArticleStart: '[getArticle] Get article start',
   getArticleSuccess: '[getArticle] Get article success',
   getArticleFailure: '[getArticle] Get article failure',
}

const mutations = {
   [mutationTypes.updateArticleStart](state) {
      state.article = null;
      state.isSubmitting = true;
   },
   [mutationTypes.updateArticleSuccess](state) {
      state.isSubmitting = false;
   },
   [mutationTypes.updateArticleFailure](state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
   },
   [mutationTypes.getArticleStart](state) {
      state.isLoading = true;
   },
   [mutationTypes.getArticleSuccess](state, payload) {
      state.isLoading = false;
      state.article = payload;
   },
   [mutationTypes.getArticleFailure](state) {
      state.isLoading = false;
   }
}

export const actionsType = {
   updateArticle: '[updateArticle] Update article',
   getArticle: '[getArticle] Get article'
}

const actions = {
   [actionsType.updateArticle](context, { slug, articleInput }) {
      return new Promise(resolve => {
         context.commit(mutationTypes.updateArticleStart)
         articleApi.updateArticle(slug, articleInput)
            .then(article => {
               context.commit(mutationTypes.updateArticleSuccess, article)
               resolve(article)
            })
            .catch(result => {
               context.commit(mutationTypes.updateArticleFailure, result.response.data.errors)
            })
      })
   },
   [actionsType.getArticle](context, { slug }) {
      return new Promise(resolve => {
         context.commit(mutationTypes.getArticleStart)
         articleApi.getArticle(slug)
            .then(article => {
               context.commit(mutationTypes.getArticleSuccess, article)
               resolve(article)
            })
            .catch(() => {
               context.commit(mutationTypes.getArticleFailure)
            })
      })
   }
}
export default {
   state,
   mutations,
   actions,
}