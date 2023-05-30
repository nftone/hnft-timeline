// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    baseURL: "/outlawz-website/",
  },
  modules: ["@vueuse/nuxt"],
  css: ["@/assets/style/global.css"],
});
