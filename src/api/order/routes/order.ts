import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::order.order", {
  config: {
    findOne: {
      policies: ["global::isAuthenticated"],
    },
    find: {
      policies: ["global::isAuthenticated"],
    },
  },
});
