import { getFixedDecimal } from '../utils/numberFormatters';

export const calculateChlorine = (
  freeChlor,
  totalChlor,
  poolGals,
  typeOfChlor
) => {
  const COMBINED_CHLOR = totalChlor - freeChlor;

  if (COMBINED_CHLOR > 1) {
    const NC_SHOCK = poolGals / 10000;
    console.log(
      `You should add ${NC_SHOCK} lbs of non chlorine shock to your pool.`
    );
    console.log('NC_SHOCK:', NC_SHOCK);
    return getFixedDecimal(NC_SHOCK);
  }

  if (typeOfChlor === 'granular') {
    const SHOCK = poolGals / 10000;
    console.log(
      `You should add ${SHOCK} lbs of non chlorine shock to your pool.`
    );
    console.log(
      'You may need to add more bags of shock if your pool has a lot of algae!'
    );
    console.log('SHOCK:', SHOCK);
    return getFixedDecimal(SHOCK);
  } else if (typeOfChlor === 'liquid') {
    const PPM_INCREASE = COMBINED_CHLOR * 10 - freeChlor;
    let galsDivisor = poolGals / 10000;
    // 10.7 ounces of 12.5% Sodium Hypochlorite to raise ppm by 1 per 10000 gallons
    // equation to get the amount of liquid chlorine to add in fluid ounces
    const RESULT = Math.round(10.7 * galsDivisor * PPM_INCREASE);
    // convert to gallons
    let gals = RESULT / 128;
    console.log(
      `You should add ${gals} gallons of chlorine shock you to your pool`
    );
    console.log('gals:', gals);
    return getFixedDecimal(gals);
  }
};
