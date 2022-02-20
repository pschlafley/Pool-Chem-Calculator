import { POOL_SHAPES } from '../constants';

const POOL_MEASUREMENTS = {
  len: 'Length',
  width: 'Width',
  lWidth: 'lWidth',
  sWidth: 'sWidth',
  sDepth: 'sDepth',
  dDepth: 'dDepth',
  diamter: 'Diameter',
};

const { lWidth, len, width, sDepth, sWidth, dDepth, diamter } =
  POOL_MEASUREMENTS;

export const POOL_TYPES = [
  {
    label: POOL_SHAPES.rectanguler,
    measurements: { len, width, sDepth, dDepth },
  },
  {
    label: POOL_SHAPES.circular,
    measurements: { diamter, sDepth },
  },
  {
    label: POOL_SHAPES.oval,
    measurements: { len, width, sDepth, dDepth },
  },
  {
    label: POOL_SHAPES.oblong,
    measurements: { len, lWidth, sWidth, sDepth, dDepth },
  },
];

const calculatePoolVol = poolType => {
  const GALLONS_PER_CUBIC_FOOT = 7.48;

  const volumeCalcs = {
    [POOL_SHAPES.rectanguler]: function (len, width, sDepth, dDepth) {
      const AVERAGE_DEPTH = (sDepth + dDepth) / 2;
      const VOLUME_IN_GALLONS =
        len * width * AVERAGE_DEPTH * GALLONS_PER_CUBIC_FOOT;
      return VOLUME_IN_GALLONS;
    },
    [POOL_SHAPES.circular]: function (diameter, sDepth) {
      let radius = diameter / 2;
      const AREA = Math.round(Math.PI * Math.pow(radius, 2));
      const VOLUME = Math.round(AREA * sDepth * GALLONS_PER_CUBIC_FOOT);
      return VOLUME;
    },
    [POOL_SHAPES.oval]: function (len, width, sDepth, dDepth) {
      const AVERAGE_DEPTH = (sDepth + dDepth) / 2;
      const AREA = (len * width * Math.PI) / 4;
      const VOLUME = Math.round(AREA * AVERAGE_DEPTH * GALLONS_PER_CUBIC_FOOT);
      return VOLUME;
    },
    [POOL_SHAPES.oblong]: function (len, lWidth, sWidth, sDepth, dDepth) {
      const AVERAGE_DEPTH = (sDepth + dDepth) / 2;
      const TOTAL_WIDTH = lWidth + sWidth;
      const VOLUME = Math.round(
        len * TOTAL_WIDTH * 0.45 * AVERAGE_DEPTH * GALLONS_PER_CUBIC_FOOT
      );
      return VOLUME;
    },
  };

  return volumeCalcs[poolType];
};

export const calculateRectangleVolume = calculatePoolVol(
  POOL_SHAPES.rectanguler
);
console.log(calculateRectangleVolume(30, 20, 2, 10));

export const calculateCircularVolume = calculatePoolVol(POOL_SHAPES.circular);
console.log(calculateCircularVolume(30, 5));

export const calculateOvalVolume = calculatePoolVol(POOL_SHAPES.oval);
console.log(calculateOvalVolume(30, 20, 5, 10));

export const calculateOblongVolume = calculatePoolVol(POOL_SHAPES.oblong);
console.log(calculateOblongVolume(40, 20, 15, 5, 10));
