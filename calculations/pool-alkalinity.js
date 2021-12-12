// Pool chemical measurements are based on 10,000 gallons of water
// For calculating total Alkalinity in a pool, you will be adding about 1.5 lbs of sodium bicarbonate (baking soda) / per 10,000 gal. of pool water
// total alkalinity levels should be between 100 - 150 ppm (parts per million)

const calculateTotalAlkalinity = (poolGallons, alkalinityInPool) => {
    // determine how much pounds of baking soda to use per gallon
    const baseMultiplier = 1.5;

    // divide the total amount of poolGallons by 10000 to get it down to a base of 10
    const gallonsBaseTen = poolGallons / 10000;
    console.log(`gal base ten: ${gallonsBaseTen}`)

    // multiply gallonsBaseTen by 1.5 to get the amount of baking soda to raise the total alkalinity by 10 ppm (parts per million)
    const bakingSodaToAdd = gallonsBaseTen * baseMultiplier;
    console.log(`bakingSodaToAdd: ${bakingSodaToAdd}`)
    // subtract alkalinityInPool from 120 ppm to see how much we want to raise the total alkalinity in the pool to get it to 120 pmm
    // In this case it will be 120 - 70 = 50...
    // So that means we will need to raise the alkalinity levels by 50 ppm to get it to a good level
    // I am then dividing it by 10 so that I can use the result of it to as a multiplier to the bakingSodaToAdd constant above
    const alk = (120 - alkalinityInPool) / 10;
    console.log(`alk: ${alk}`)
    // calculate the total amount of pounds of baking soda to add to the pool in order to raise it by a certain amount of parts per million
    // in this case it will be 22.5 lbs of baking soda. 
    const totalPoundsToAdd = bakingSodaToAdd * alk;
    console.log(totalPoundsToAdd)
    return totalPoundsToAdd;
};


calculateTotalAlkalinity(30000, 70);