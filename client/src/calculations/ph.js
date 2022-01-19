const calculatePH = (gallons, currentPH) => {
    // Ideal PH levels will be 7.2-7.8
    // approximately 17 oz of muriatic acid will lower PH by .6
    const M_A = 17;
    // based off of a 10,000 gallon pool, we will subtract 3oz of M_A every 2,000 gallons above or below 10,000 
    const subtrahend = 4;

    if (currentPH > 7.8) {
        const ph_difference = currentPH - 7.8;
        console.log(ph_difference);
    };
};

calculatePH(10000, 8.0);