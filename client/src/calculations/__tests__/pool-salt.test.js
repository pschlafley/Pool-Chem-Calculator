import calculatePoolSalt from '../pool-salt';

describe('calculatePoolSalt', () => {
  test('returns the pounds of salt needed to bring the pool to 3200ppm of salt', () => {
    expect(calculatePoolSalt(10000, 3000)).toEqual(16);
    expect(calculatePoolSalt(10000, 2800)).toEqual(32);
    expect(calculatePoolSalt(8000, 2400)).toEqual(48);
    expect(calculatePoolSalt(12000, 3000)).toEqual(20);
  });

  test('returns 0 if no values are provided or the provided salt PPM is greater than or equal to 3200', () => {
    expect(calculatePoolSalt(10000, 3200)).toEqual(0);
    expect(calculatePoolSalt(10000, 3400)).toEqual(0);
    expect(calculatePoolSalt()).toEqual(0);
  });
});
