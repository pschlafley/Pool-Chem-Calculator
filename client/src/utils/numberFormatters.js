// format a number to have the specified number of decimal places
export const getFixedDecimal = (num, places = 1) => {
  if (typeof num !== 'number') {
    throw new Error('You must provide a valid number.');
  }
  return Number(num.toFixed(places));
};
