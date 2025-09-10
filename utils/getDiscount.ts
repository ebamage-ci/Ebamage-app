export const getDiscount = (price: number, oldPrice: number = 0): number => {
  const discount = ((oldPrice - price) / oldPrice) * 100;
  return Math.round(discount);
};
