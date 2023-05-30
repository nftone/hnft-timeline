import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig>{
  scrollBehavior: async function (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    const findEl = async (hash: string, x = 0): Promise<Element | null> => {
      return (
        document.querySelector(hash) ||
        new Promise((resolve) => {
          if (x > 50) {
            return resolve(document.querySelector("#app"));
          }
          setTimeout(() => {
            resolve(findEl(hash, ++x || 1));
          }, 100);
        })
      );
    };

    if (to.hash) {
      let el = await findEl(to.hash);

      if ("scrollBehavior" in document.documentElement.style) {
        // @ts-ignore
        return window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
      } else {
        // @ts-ignore
        return window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }

    return window.scrollTo({ top: 0, behavior: "smooth" });
  },
};
