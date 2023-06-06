// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    baseURL: "/outlawz-website/",
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Outlawz",
    },
  },
  modules: ["@vueuse/nuxt"],
  css: ["@/assets/style/global.css"],
});
