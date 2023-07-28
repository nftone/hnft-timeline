export default defineNuxtConfig({
  app: {
    baseURL: "/",
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Historical Non-Fungible Tokens Timeline",
    },
  },
  modules: ["@vueuse/nuxt", "@nuxt/image", "@nuxtjs/turnstile"],
  routeRules: {
    "/": { prerender: true },
    "/project/*": { prerender: true },
    "/event/*": { prerender: true },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
    },
  },
  turnstile: {
    siteKey: '0x4AAAAAAACJyD5TN6_HsXTU',
  },

  runtimeConfig: {
    turnstile: {
      secretKey: '',
    },
  },
})
