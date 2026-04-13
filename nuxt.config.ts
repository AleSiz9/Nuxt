// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxt/image'
  ],
  components: [{ path: '~/components', pathPrefix: false }],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  typescript:{ typeCheck: true },
    css: [
    'assets/css/global.css',
  ]
})