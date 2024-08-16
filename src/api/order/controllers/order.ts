import { factories } from "@strapi/strapi";
import { createOrder } from "./create-order";
import { findOrders } from "./find-orders";
import { findOneOrder } from "./find-one-order";

export default factories.createCoreController(
  "api::order.order",
  ({ strapi }) => ({
    async create(ctx) {
      return await createOrder(ctx, strapi);
    },

    async find(ctx) {
      return await findOrders(ctx, strapi);
    },

    async findOne(ctx) {
      return await findOneOrder(ctx, strapi);
    },
  })
);
