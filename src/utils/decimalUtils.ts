import Decimal from "decimal.js";

export const toDecimal = (value) => new Decimal(value.toString());
export const toNumber = (decimal) => parseFloat(decimal.toFixed(2));
