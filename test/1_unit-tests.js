const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

describe('Unit its', function () {
  it('Whole number input', () => assert.equal(convertHandler.getNum('32L'), 32));
  it('Decimal input', () => assert.equal(convertHandler.getNum('3.1mi'), 3.1));
  it('Fraction input', () => assert.equal(convertHandler.getNum('1/2km'), 0.5));
  it('Fraction + decimal', () => assert.approximately(convertHandler.getNum('5.4/3lbs'), 1.8, 0.01));
  it('Double fraction error', () => assert.equal(convertHandler.getNum('3/2/3kg'), 'invalid number'));
  it('Default to 1', () => assert.equal(convertHandler.getNum('kg'), 1));
  it('Valid units', () => ['gal', 'L', 'mi', 'km', 'lbs', 'kg'].forEach(unit =>
    assert.equal(convertHandler.getUnit('12' + unit), unit)
  ));
  it('Invalid unit', () => assert.equal(convertHandler.getUnit('32g'), 'invalid unit'));
  it('Return unit', () => assert.equal(convertHandler.getReturnUnit('gal'), 'L'));
  it('Spelled out', () => assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms'));
  it('gal to L', () => assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.00001));
  it('L to gal', () => assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.00001));
  it('mi to km', () => assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.00001));
  it('km to mi', () => assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.00001));
  it('lbs to kg', () => assert.approximately(convertHandler.convert(1, 'lbs'), 0.453592, 0.00001));
  it('kg to lbs', () => assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.00001));
});
