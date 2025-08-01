const ConvertHandler = require('../controllers/convertHandler.js');
module.exports = function (app) {
  const convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      return res.send('invalid number and unit');
    }
    if (initNum === 'invalid number') return res.send('invalid number');
    if (initUnit === 'invalid unit') return res.send('invalid unit');

    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    res.json({ initNum, initUnit, returnNum, returnUnit, string });
  });
};
