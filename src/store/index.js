import { createStore } from 'vuex'

import auth from '@/store/modules/auth'
import feed from '@/store/modules/feed';
import popularTags from '@/store/modules/popularTags';
import article from '@/store/modules/article';
import createArticle from '@/store/modules/createArticle.js'
import editArticle from '@/store/modules/editArticle.js'
import settings from '@/store/modules/settings.js'
import addToFavorites from '@/store/modules/addToFavorites.js'
import userProfile from '@/store/modules/userProfile.js'

const store = createStore({

   modules: {
      auth,
      feed,
      popularTags,
      article,
      createArticle,
      editArticle,
      settings,
      addToFavorites,
      userProfile,

   }
})
export default store;