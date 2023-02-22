export const stringToPrice = (price: any): number => {
  let value = parseFloat(price);
  if (isNaN(value)) {
    return 0;
  }
  //   console.log(`Before fixed ${value}`);
  const fixed = value.toFixed(3);
  //   console.log(`fixed fixed fixed ${fixed}`);
  value = parseFloat(fixed);
  //   console.log(`After fixed ${value}`);
  return value;
};
