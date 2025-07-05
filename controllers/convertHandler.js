const unitMap = {
  gal: { returnUnit: 'L', factor: 3.78541, spelledOut: 'gallons' },
  l:   { returnUnit: 'gal', factor: 1 / 3.78541, spelledOut: 'liters' },
  lbs: { returnUnit: 'kg', factor: 0.453592, spelledOut: 'pounds' },
  kg:  { returnUnit: 'lbs', factor: 1 / 0.453592, spelledOut: 'kilograms' },
  mi:  { returnUnit: 'km', factor: 1.60934, spelledOut: 'miles' },
  km:  { returnUnit: 'mi', factor: 1 / 1.60934, spelledOut: 'kilometers' }
};

function ConvertHandler() {
  this.getNum = function(input) {
    const result = input.match(/^[\d/.]+/);
    if (!result) return 1;

    const numStr = result[0];
    const slashCount = (numStr.match(/\//g) || []).length;

    if (slashCount > 1) return 'invalid number';
    if (slashCount === 1) {
      const [num, den] = numStr.split('/');
      if (isNaN(num) || isNaN(den)) return 'invalid number';
      return parseFloat(num) / parseFloat(den);
    }

    return isNaN(numStr) ? 'invalid number' : parseFloat(numStr);
  };

  this.getUnit = function(input) {
    const result = input.match(/[a-zA-Z]+$/);
    if (!result) return 'invalid unit';
    const unit = result[0].toLowerCase();
    return unitMap[unit] ? (unit === 'l' ? 'L' : unit) : 'invalid unit';
  };

  this.getReturnUnit = function(initUnit) {
    const unit = initUnit.toLowerCase();
    return unitMap[unit] ? unitMap[unit].returnUnit : 'invalid unit';
  };

  this.spellOutUnit = function(unit) {
    const unitKey = unit.toLowerCase();
    return unitMap[unitKey] ? unitMap[unitKey].spelledOut : '';
  };

  this.convert = function(initNum, initUnit) {
    const unitKey = initUnit.toLowerCase();
    const factor = unitMap[unitKey]?.factor;
    if (!factor) return 'invalid unit';
    return parseFloat((initNum * factor).toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
