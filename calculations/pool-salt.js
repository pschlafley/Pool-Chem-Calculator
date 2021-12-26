const calculatePoolSalt = (poolGallons, currentSalt) => {
    // 1 lb of salt to 1,000 gallons of water to increase salt residual 120 ppm.

    // variable for the amount of salt to add per 1000 gallons of water
    let poundsPer10000 = 8

    if (poolGallons > 10000) {
        let lbsDifference = (poolGallons - 10000) / 1000;
        poundsPer10000 += lbsDifference;
    } else if (poolGallons < 10000) {
        let lbsDifference = (10000 - poolGallons) / 1000;
        poundsPer10000 -= lbsDifference;
    };

    const AMOUNT_OF_PPM_NEEDED = (3200 - currentSalt) / 100;

    const SALT_TO_ADD = poundsPer10000 * AMOUNT_OF_PPM_NEEDED;

    return SALT_TO_ADD;
};

calculatePoolSalt(20000, 3000);