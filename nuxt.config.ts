// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    baseURL: "/outlawz-website/",
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Outlawz",
      link: [
        {
          rel: "preload",
          href: "@/assets/fonts/nextbook-regular-webfont.woff",
          as: "font",
          type: "font/woff",
          crossorigin: "anonymous",
        },
      ],
    },
  },
  modules: ["@vueuse/nuxt"],
  css: ["@/assets/style/global.css"],
});
