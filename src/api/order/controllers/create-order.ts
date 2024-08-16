import { authenticateUser } from "../services/userService";
import { calculateTotalOrderPrice } from "../services/productService";
import { applyShopTaxesAndDelivery, getShop } from "../services/shopService";

export const createOrder = async (ctx, strapi) => {
  const data = ctx.request.body;

  try {
    const order = {
      ...data,
      orderJSONFormat: data || {},
    };

    const shop = await getShop(strapi);

    const delivery = shop.delivery.find((del: { name: string; }) => del.name === order.delivery);
    if (!delivery) {
      throw new Error("Invalid delivery method");
    } else {
      order.deliveryPrice = delivery.price;
    }

    const payment = shop.payment.find((pay: { name: string; }) => pay.name === order.payment);
    if (!payment) {
      throw new Error("Invalid payment method");
    }

    const userId = await authenticateUser(ctx, strapi, order.email);
    if (userId) {
      order.user = userId;
    } else {
      console.warn(
        "User not authenticated or not found, proceeding without user association."
      );
      order.user = null;
    }

    let totalOrderPrice = await calculateTotalOrderPrice(
      strapi,
      order.products
    );

    totalOrderPrice = await applyShopTaxesAndDelivery(
      shop,
      totalOrderPrice,
      order.deliveryPrice
    );

    if (order.totalPrice !== totalOrderPrice) {
      throw new Error("Invalid total price");
    }

    order.taxes = shop.taxes;

    const response = await strapi.entityService.create("api::order.order", {
      data: order,
    });

    return ctx.created(response);
  } catch (error) {
    console.error("Error creating order:", error);
    return ctx.internalServerError(
      "An error occurred while creating the order"
    );
  }
};
