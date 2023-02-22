export const priceToString = (price: any): string => {
  // console.log(`incoming price -> ${price}`);
  let num = parseFloat(price);
  // console.log(`parseFloat -> ${price}`);
  if (isNaN(num)) {
    return '0.000';
  }

  let str = num.toFixed(3);

  //   while (str.length < 10) {
  //     str = '0' + str;
  //   }
  return str;

  // const value = Number(info.getValue());
  //   if (value) {
  // return (Math.round(value * 100) / 100).toFixed(2);
  //   }
  //   return '';
  //     let value = parseFloat(price);
  //     if (isNaN(value)) {
  //       return 0;
  //     }
  //     //   console.log(`Before fixed ${value}`);
  //     const fixed = value.toFixed(3);
  //     //   console.log(`fixed fixed fixed ${fixed}`);
  //     value = parseFloat(fixed);
  //     //   console.log(`After fixed ${value}`);
  //     return value;
};
