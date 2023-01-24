import { createRouter, createWebHistory } from "vue-router"
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import GlobalFeed from '@/views/GlobalFeed.vue'
import YourFeed from '@/views/YourFeed.vue'
import TagFeed from '@/views/TagFeed.vue'
import Article from '@/views/Article.vue'

const routes = [

   {
      path: '/register',
      name: 'register',
      component: Register,
   },
   {
      path: '/login',
      name: 'login',
      component: Login,
   },

   {
      path: '/',
      name: 'globalFeed',
      component: GlobalFeed,
   },
   {
      path: '/feed',
      name: 'yourFeed',
      component: YourFeed,
   },
   {
      path: '/tags/:slug',
      name: 'tag',
      component: TagFeed,
   },
   {
      path: '/articles/new',
      name: 'createArticle',
      component: GlobalFeed,
   },
   {
      path: '/articles/:slug',
      name: 'article',
      component: Article,
   },
   {
      path: '/articles/:slug/edit',
      name: 'editArticle',
      component: GlobalFeed,
   },
   {
      path: '/settings',
      name: 'settings',
      component: GlobalFeed,
   },
   {
      path: '/profiles/:slug',
      name: 'userProfile',
      component: GlobalFeed,
   },
   {
      path: '/profiles/:slug/favorites',
      name: 'userProfileFavorites',
      component: GlobalFeed,
   },
]

const router = createRouter({
   routes,
   history: createWebHistory()
})

export default router;
