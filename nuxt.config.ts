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
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "@/assets/images/favicons/apple-touch-icon.png",
        },
        {
          rel: "icon",
          sizes: "32x32",
          href: "@/assets/images/favicons/favicon-32x32.png",
        },
        {
          rel: "icon",
          sizes: "16x16",
          href: "@/assets/images/favicons/favicon-16x16.png",
        },
      ],
    },
  },
  modules: ["@vueuse/nuxt"],
  css: ["@/assets/style/global.css"],
});
