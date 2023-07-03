// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    baseURL: "/hnft-timeline/",
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Historical Non-Fungible Tokens Timeline",
    },
  },
  modules: ["@vueuse/nuxt"],
});
