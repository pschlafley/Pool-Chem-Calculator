const calculatePoolSalt = (poolGallons, currentSaltLvl, desiredSaltLvl) => {
    // 1 lb of salt to 1,000 gallons of water to increase salt residual 120 ppm.

    // variable for the amount of salt to add per 1000 gallons of water
    const saltPerThousand = 1

    const amtOfPpmNeeded = desiredSaltLvl - currentSaltLvl;

    // const saltToAdd = 
    console.log()
};

calculatePoolSalt(22000, 2800, 3200)