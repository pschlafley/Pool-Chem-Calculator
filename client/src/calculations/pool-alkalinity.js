// Pool chemical measurements are based on 10,000 gallons of water
// For calculating total Alkalinity in a pool, you will be adding about 1.5 lbs of sodium bicarbonate (baking soda) / per 10,000 gal. of pool water
// total alkalinity levels should be between 100 - 150 ppm (parts per million)

export const UNITS = {
  pounds: 'lbs',
  fluidOunce: 'fl oz',
  quarts: 'qt'
};

export const CHEMICALS = {
  base: {
    label: 'Baking Soda',
    unit: UNITS.pounds,
  },
  acid: {
    label: 'Muriatic Acid',
    unit: UNITS.fluidOunce,
  },
};

export const calculateTotalAlkalinity = (poolGallons, alkalinityInPool) => {
  // determine how much pounds of baking soda to use per gallon
  const baseMultiplier = 1.5;

  // divide the total amount of poolGallons by 10000 to get it down to a base of 10
  const gallonsBaseTen = poolGallons / 10000;
  // console.log(`gal base ten: ${gallonsBaseTen}`)

  // multiply gallonsBaseTen by 1.5 to get the amount of baking soda to raise the total alkalinity by 10 ppm (parts per million)
  const bakingSodaToAdd = gallonsBaseTen * baseMultiplier;
  // console.log(`bakingSodaToAdd: ${bakingSodaToAdd}`)
  // subtract alkalinityInPool from 120 ppm to see how much we want to raise the total alkalinity in the pool to get it to 120 pmm
  // In this case it will be 120 - 70 = 50...
  // So that means we will need to raise the alkalinity levels by 50 ppm to get it to a good level
  // I am then dividing it by 10 so that I can use the result of it to as a multiplier to the bakingSodaToAdd constant above
  const alk = (120 - alkalinityInPool) / 10;
  // console.log(`alk: ${alk}`)
  // calculate the total amount of pounds of baking soda to add to the pool in order to raise it by a certain amount of parts per million
  // in this case it will be 22.5 lbs of baking soda.
  const totalPoundsToAdd = bakingSodaToAdd * alk;
  // console.log(totalPoundsToAdd)

  // if alkalinty level in pool is greater than 120, than we want to lower it by adding muriatic acid which will also affect the ph levels
  if (alkalinityInPool > 120) {
    // (myperfectpool.com) says that we will need approximately 35-60 fl oz of muriatic acid per 10,000 gals of water 
    // in order to reduce alkalinity by 10 ppm
    const Avg_floz = (35 + 60) / 2;
    const floz_perGal = gallonsBaseTen * Avg_floz;
    const Target_lvl = 100;
    const ppm_to_adjust = (alkalinityInPool - Target_lvl) / 10;
    const result = floz_perGal * ppm_to_adjust;
    // there are 32 fl oz in a quart so if result is greater than 32 then we divide that number by 32 to get how many quarts that will be
    return result;
  };


  return totalPoundsToAdd <= 0 ? 0 : totalPoundsToAdd.toFixed(1);
};

// calculateTotalAlkalinity(10000, 130);