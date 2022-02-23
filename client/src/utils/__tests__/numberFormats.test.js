import { getFixedDecimal } from '../numberFormatters';

describe('getFixedDecimal', () => {
  test('returns the number with the specified amount of decimal places', () => {
    expect(getFixedDecimal(5.1234)).toEqual(5.1);
    expect(getFixedDecimal(10.1234, 2)).toEqual(10.12);
    expect(getFixedDecimal(100.1234, 3)).toEqual(100.123);
    expect(getFixedDecimal(100.1234, 0)).toEqual(100);
    expect(() => getFixedDecimal('test')).toThrow(
      'You must provide a valid number.'
    );
  });
});
