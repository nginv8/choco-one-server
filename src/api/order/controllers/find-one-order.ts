export const findOneOrder = async (ctx, strapi) => {
  const { user } = ctx.state;
  const { id } = ctx.params;

  if (!id) {
    return ctx.badRequest("Order ID is required");
  }

  const order = await strapi.entityService.findOne("api::order.order", id, {
    filters: { user: user.id },
    fields: [
      "id",
      "createdAt",
      "status",
      "totalPrice",
      "address",
      "delivery",
      "payment",
      "comment",
      "delivery",
      "currency",
      "deliveryPrice",
    ],
    populate: {
      taxes: true,
      products: {
        quantity: true,
        populate: {
          product: {
            id: true,
            name: true,
            price: true,
            populate:{
              mainImage: true,
            },
          },
          selectedOptions: {
            optionSetName: true,
            optionName: true,
          },
        },
      },
    },
  });

  if (!order) {
    return ctx.notFound("Order not found");
  }

  return order;
};
