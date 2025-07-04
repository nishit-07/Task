export const formatPrice = (price) => {
  const numPrice = parseFloat(price);
  return `Rs. ${numPrice.toLocaleString('en-IN')}/-`;
};  