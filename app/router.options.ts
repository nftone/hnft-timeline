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
      if (el) {
        const stickyHeaderHeight = to.hash === "#team" ? 0 : 120;
        const offset =
          el.getBoundingClientRect().top +
          window.pageYOffset -
          stickyHeaderHeight;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  },
};
