const calculatePoolVol = (poolType) => {
    const GALLONS_PER_CUBIC_FOOT = 7.48;

    return {
        calculateVol: function (len, width, sDepth, dDepth) {
            const AVERAGE_DEPTH = (sDepth + dDepth) / 2;
            const VOLUME_IN_GALLONS = len * width * AVERAGE_DEPTH * GALLONS_PER_CUBIC_FOOT;
            console.log(VOLUME_IN_GALLONS);
            return VOLUME_IN_GALLONS;
        },
        calculateCirVol: function (diameter, sDepth) {
            let radius = diameter / 2;
            const AREA = Math.round(Math.PI * Math.pow(radius, 2));
            const VOLUME = Math.round(AREA * sDepth * GALLONS_PER_CUBIC_FOOT);
            console.log(VOLUME)
            return VOLUME;
        },
        calculateOvalVol: function (len, width, sDepth, dDepth) {
            const AVERAGE_DEPTH = (sDepth + dDepth) / 2;
            const AREA = len * width * Math.PI / 4;
            const VOLUME = Math.round(AREA * AVERAGE_DEPTH * GALLONS_PER_CUBIC_FOOT);
            console.log(VOLUME);
            return VOLUME;
        },
        calculateOblongVol: function (len, lWidth, sWidth, sDepth, dDepth) {
            const AVERAGE_DEPTH = (sDepth + dDepth) / 2;
            const TOTAL_WIDTH = lWidth + sWidth;
            const VOLUME = Math.round(len * TOTAL_WIDTH * .45 * AVERAGE_DEPTH * GALLONS_PER_CUBIC_FOOT);
            console.log(VOLUME);
            return VOLUME;
        }
    }
};


const rectangleVolume = calculatePoolVol('rectangular');
rectangleVolume.calculateVol(30, 20, 2, 10);

const circularVolume = calculatePoolVol('circular');
circularVolume.calculateCirVol(30, 5);

const ovalVolume = calculatePoolVol('Oval');
ovalVolume.calculateOvalVol(30, 20, 5, 10);

const oblongVolume = calculatePoolVol('oblong');
oblongVolume.calculateOblongVol(40, 20, 15, 5, 10);