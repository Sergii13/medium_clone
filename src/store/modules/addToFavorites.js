import addToFavoritesApi from '@/api/addToFavorites.js'

export const mutationsTypes = {
   addToFavoritesStart: '[addToFavorites] Add to favorites start',
   addToFavoritesSuccess: '[addToFavorites] Add to favorites success',
   addToFavoritesFailure: '[addToFavorites] Add to favorites failure',
}
export const actionTypes = {
   addToFavorites: '[addToFavorites] add to favorites'
}
const mutations = {
   [mutationsTypes.addToFavoritesStart]() { },
   [mutationsTypes.addToFavoritesSuccess]() { },
   [mutationsTypes.addToFavoritesFailure]() { },
}
const actions = {
   [actionTypes.addToFavorites](context, { slug, isFavorited }) {
      return new Promise(resolve => {
         console.log(isFavorited)
         context.commit(mutationsTypes.addToFavoritesStart)
         const promise = !isFavorited
            ? addToFavoritesApi.addToFavorites(slug)
            : addToFavoritesApi.removeFromFavorites(slug);

         promise
            .then(article => {
               context.commit(mutationsTypes.addToFavoritesSuccess, article)
               resolve(article)
            })
            .catch(() => {
               context.commit(mutationsTypes.addToFavoritesFailure)
            })
      })
   }
}
export default {
   actions,
   mutations,
}