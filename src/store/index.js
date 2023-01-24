import { createStore } from 'vuex'

import auth from '@/store/modules/auth'
import feed from '@/store/modules/feed';
import popularTags from '@/store/modules/popularTags';
import article from '@/store/modules/article';

const store = createStore({

   modules: {
      auth,
      feed,
      popularTags,
      article,
   }
})
export default store;