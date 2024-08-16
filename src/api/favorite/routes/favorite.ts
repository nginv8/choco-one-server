import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::favorite.favorite", {
  config: {
    updateFavorites: {
      policies: ["global::isAuthenticated"],
    },
    create: {
      policies: ["global::isAuthenticated"],
    },
    delete: {
      policies: ["global::isAuthenticated"],
    },
    find: {
      policies: ["global::isAuthenticated"],
    },
    findOne: {
      policies: ["global::isAuthenticated"],
    },
  },
});
