import { toDecimal, toNumber } from "../../../utils/decimalUtils";

export const getShop = async (strapi) => {
  return await strapi.entityService.findOne("api::shop.shop", 1, {
    populate: ["taxes", "delivery", "payment"],
  });
};

export const applyShopTaxesAndDelivery = async (shop, totalPrice, deliveryPrice) => {
  let totalTaxes = toDecimal(0);
  totalPrice = toDecimal(totalPrice);

  for (const tax of shop.taxes) {
    if (tax.type === "fixed") {
      totalTaxes = toDecimal(totalTaxes.plus(toDecimal(tax.value)).toFixed(2));
    } else if (tax.type === "percent") {
      const taxPrice = totalPrice.times(toDecimal(tax.value).div(toDecimal(100))).toFixed(2);
      totalTaxes = totalTaxes.plus(taxPrice);
    }
  }

  totalPrice = totalPrice.plus(totalTaxes);

  totalPrice = totalPrice.plus(toDecimal(deliveryPrice));

  return toNumber(totalPrice);
};
