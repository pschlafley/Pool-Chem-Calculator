import { calculateTotalAlkalinity } from '../pool-alkalinity';

describe('calculatePoolSalt', () => {
  test('returns the pounds of baking soda needed to bring the pool alkalinity to 100-150ppm', () => {
    expect(calculateTotalAlkalinity(10000, 65)).toEqual(8.3);
    expect(calculateTotalAlkalinity(10000, 100)).toEqual(3);
  });

  test('returns the amount of muriatic acid in fl oz or quarts to add if the given alkalinity is >= 120', () => {
    expect(calculateTotalAlkalinity(10000, 125)).toEqual(118.75);
    expect(calculateTotalAlkalinity(10000, 120)).toEqual(0);
  });
});
