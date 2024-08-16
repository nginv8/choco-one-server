import { toDecimal, toNumber } from "../../../utils/decimalUtils";

const calculateProductPrice = async (strapi, product) => {
  const dbProduct = await strapi.entityService.findOne(
    "api::product.product",
    product.productId,
    {
      populate: ["optionSets", "optionSets.options", "optionSets.title"],
    }
  );

  if (!dbProduct || !dbProduct.available) {
    throw new Error("Invalid or unavailable product ID");
  }

  let totalProductPrice = toDecimal(dbProduct.price);
  let selectedOptionsString = "";

  for (const selectedOption of product.selectedOptions) {
    const dbOptionSet = dbProduct.optionSets.find(
      (set) => set.id === selectedOption.optionSetId
    );
    if (!dbOptionSet) {
      throw new Error("Invalid option set ID");
    }

    const dbOption = dbOptionSet.options.find(
      (option) => option.id === selectedOption.optionId
    );
    if (!dbOption || !dbOption.available) {
      throw new Error("Invalid or unavailable option ID");
    }

    selectedOption.optionName = dbOption.name;
    selectedOption.optionPrice = dbOption.price;
    selectedOptionsString += `${dbOptionSet.title.title}: ${dbOption.name}, `;

    totalProductPrice = totalProductPrice.plus(toDecimal(dbOption.price));
  }

  product.product = dbProduct.id;
  product.productName = dbProduct.name;
  product.selectedOptionsString = selectedOptionsString;
  product.price = toNumber(totalProductPrice);

  return toNumber(totalProductPrice.times(toDecimal(product.quantity)));
};

export const calculateTotalOrderPrice = async (strapi, products) => {
  let totalOrderPrice = toDecimal(0);

  for (const product of products) {
    const productPrice = await calculateProductPrice(strapi, product);
    totalOrderPrice = totalOrderPrice.plus(toDecimal(productPrice));
  }

  return toNumber(totalOrderPrice);
};
