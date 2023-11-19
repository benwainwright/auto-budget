import type { LayoutServerLoad, PageServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
  if (event.locals.loggedIn) {
    return {
      loggedIn: true,
    };
  }
  return {
    loggedIn: false,
  };
};
