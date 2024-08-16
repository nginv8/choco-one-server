import { Strapi } from "@strapi/strapi";

export const findOrders = async (ctx, strapi: Strapi) => {
  const { user } = ctx.state;

  if (!user) {
    return ctx.unauthorized("You must be logged in to view orders");
  }

  const { pagination = {} } = ctx.query;
  const page = Number(pagination["page"]) || 1;
  const pageSize = Number(pagination["pageSize"]) || 10;

  const orders = await strapi.entityService.findPage("api::order.order", {
    filters: { user: user.id },
    fields: ["id", "createdAt", "status", "totalPrice"],
    pageSize,
    page,
  });

  return orders;
};
