import assert from 'assert';
import getColorFromTemperature from '../src/utils/getColorFromTemperature';

describe('function getColorFromTemperature', () => {
  it('should return the correct color for the maximum temperature', () => {
    const res = getColorFromTemperature(215);
    assert.deepStrictEqual(res, { r: 255, g: 0, b: 0, a: 0 });
  });
  it('should return the correct color for the minimum temperature', () => {
    const res = getColorFromTemperature(19);
    assert.deepStrictEqual(res, { r: 255, g: 0, b: 0, a: 0 });
  });

  it('should return the correct color for the temperature 89.25F', () => {
    const res = getColorFromTemperature(89.25);
    assert.deepStrictEqual(res, {r: 255, g: 165, b: 0, a: 255 });
  });

  it('should return intermediate colors correctly', () => {
    const res1 = getColorFromTemperature(30);
    assert.deepStrictEqual(res1, { r: 0, g: 45, b: 255, a: 255 });
    const res2 = getColorFromTemperature(60);
    assert.deepStrictEqual(res2, { r: 0, g: 255, b: 75, a: 255 });
  });
});
