const calculatePoolSalt = (poolGallons = 10000, currentSalt = 3200) => {
	// 1 lb of salt to 1,000 gallons of water to increase salt residual 120 ppm.

	const TARGET_PPM = 3200;
	let poundsPer10000 = 8; // variable for the amount of salt to add per 1000 gallons of water
	let lbsDifference;

	if (poolGallons > 10000) {
		lbsDifference = (poolGallons - 10000) / 1000;
		poundsPer10000 += lbsDifference;
	} else if (poolGallons < 10000) {
		lbsDifference = (10000 - poolGallons) / 1000;
		poundsPer10000 -= lbsDifference;
	}

	const amountPpmNeeded = (3200 - currentSalt) / 100;

	const saltToAdd = poundsPer10000 * amountPpmNeeded;

	return currentSalt >= TARGET_PPM ? 0 : saltToAdd;
};

export default calculatePoolSalt;
