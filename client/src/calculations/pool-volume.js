const POOL_SHAPES = {
	rectanguler: 'rectangular',
	circular: 'circular',
	oval: 'oval',
	oblong: 'oblong',
};

export const POOL_TYPES = [
	{
		id: 'rect',
		label: 'Rectangle',
	},
	{
		id: 'circle',
		label: 'Circle',
	},
	{
		id: 'oval',
		label: 'Oval',
	},
	{
		id: 'oblong',
		label: 'Oblong',
	},
];

const calculatePoolVol = poolType => {
	const GALLONS_PER_CUBIC_FOOT = 7.48;

	const volumeCalcs = {
		[POOL_SHAPES.rectanguler]: function (len, width, sDepth, dDepth) {
			const AVERAGE_DEPTH = (sDepth + dDepth) / 2;
			const VOLUME_IN_GALLONS =
				len * width * AVERAGE_DEPTH * GALLONS_PER_CUBIC_FOOT;
			console.log(VOLUME_IN_GALLONS);
			return VOLUME_IN_GALLONS;
		},
		[POOL_SHAPES.circular]: function (diameter, sDepth) {
			let radius = diameter / 2;
			const AREA = Math.round(Math.PI * Math.pow(radius, 2));
			const VOLUME = Math.round(AREA * sDepth * GALLONS_PER_CUBIC_FOOT);
			console.log(VOLUME);
			return VOLUME;
		},
		[POOL_SHAPES.oval]: function (len, width, sDepth, dDepth) {
			const AVERAGE_DEPTH = (sDepth + dDepth) / 2;
			const AREA = (len * width * Math.PI) / 4;
			const VOLUME = Math.round(AREA * AVERAGE_DEPTH * GALLONS_PER_CUBIC_FOOT);
			console.log(VOLUME);
			return VOLUME;
		},
		[POOL_SHAPES.oblong]: function (len, lWidth, sWidth, sDepth, dDepth) {
			const AVERAGE_DEPTH = (sDepth + dDepth) / 2;
			const TOTAL_WIDTH = lWidth + sWidth;
			const VOLUME = Math.round(
				len * TOTAL_WIDTH * 0.45 * AVERAGE_DEPTH * GALLONS_PER_CUBIC_FOOT
			);
			console.log(VOLUME);
			return VOLUME;
		},
	};

	return volumeCalcs[poolType];
};

export const calculateRectangleVolume = calculatePoolVol(
	POOL_SHAPES.rectanguler
);
calculateRectangleVolume(30, 20, 2, 10);

export const calculateCircularVolume = calculatePoolVol(POOL_SHAPES.circular);
calculateCircularVolume(30, 5);

export const calculateOvalVolume = calculatePoolVol(POOL_SHAPES.oval);
calculateOvalVolume(30, 20, 5, 10);

export const calculateOblongVolume = calculatePoolVol(POOL_SHAPES.oblong);
calculateOblongVolume(40, 20, 15, 5, 10);
