import { getFixedDecimal } from '../utils/numberFormatters';
import { CHLORINE_TYPES } from '../constants';

const CHLOR_TYPES = Object.keys(CHLORINE_TYPES);

export const calculateChlorine = (
  freeChlor,
  totalChlor,
  poolGals,
  typeOfChlor
) => {
  const COMBINED_CHLOR = totalChlor - freeChlor;

  if (COMBINED_CHLOR >= 1) {
    const NC_SHOCK = poolGals / 10000; // Non-Chlorine shock - oxidizing shock

    return getFixedDecimal(NC_SHOCK); // bags of NC_SHOCK to use
  }

  if (typeOfChlor === CHLOR_TYPES[0]) {
    const SHOCK = poolGals / 10000;

    return getFixedDecimal(SHOCK);
  } else if (typeOfChlor === CHLOR_TYPES[1]) {
    const PPM_INCREASE = COMBINED_CHLOR * 10 - freeChlor;
    let galsDivisor = poolGals / 10000;
    // 10.7 ounces of 12.5% Sodium Hypochlorite to raise ppm by 1 per 10000 gallons
    // equation to get the amount of liquid chlorine to add in fluid ounces
    const RESULT = Math.round(10.7 * galsDivisor * PPM_INCREASE);
    // convert to gallons
    let gals = RESULT / 128;

    return getFixedDecimal(gals);
  }
};
