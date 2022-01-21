const DEFAULT_GALLONS = 10_000;
const DEFAULT_SALT = 3200;
const POUNDS_DIVISOR = 1_000;
const PPM_DIVISOR = 100;

export const calculatePoolSalt = (
  poolGallons = DEFAULT_GALLONS,
  currentSalt = DEFAULT_SALT
) => {
  const TARGET_PPM = DEFAULT_SALT;
  let poundsPer10000 = 8; // variable for the amount of salt to add per 10000 gallons of water
  let lbsDifference;

  if (poolGallons > DEFAULT_GALLONS) {
    lbsDifference = (poolGallons - DEFAULT_GALLONS) / POUNDS_DIVISOR;
    poundsPer10000 += lbsDifference;
  } else if (poolGallons < DEFAULT_GALLONS) {
    lbsDifference = (DEFAULT_GALLONS - poolGallons) / POUNDS_DIVISOR;
    poundsPer10000 -= lbsDifference;
  }

  const amountPpmNeeded = (DEFAULT_SALT - currentSalt) / PPM_DIVISOR;

  const saltToAdd = poundsPer10000 * amountPpmNeeded;

  return currentSalt >= TARGET_PPM ? 0 : saltToAdd;
};
