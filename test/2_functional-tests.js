const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp); // ✅ Correct: no parentheses!

describe('Functional Tests', function () {
  it('Valid input: 10L', done => {
    chai.request(server)
      .get('/api/convert?input=10L')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, 'L');
        done();
      });
  });

  it('Invalid unit: 32g', done => {
    chai.request(server)
      .get('/api/convert?input=32g')
      .end((err, res) => {
        assert.equal(res.text, 'invalid unit');
        done();
      });
  });

  it('Invalid number: 3/7.2/4kg', done => {
    chai.request(server)
      .get('/api/convert?input=3/7.2/4kg')
      .end((err, res) => {
        assert.equal(res.text, 'invalid number');
        done();
      });
  });

  it('Invalid number AND unit: 3/7.2/4kilomegagram', done => {
    chai.request(server)
      .get('/api/convert?input=3/7.2/4kilomegagram')
      .end((err, res) => {
        assert.equal(res.text, 'invalid number and unit');
        done();
      });
  });

  it('No number input: kg', done => {
    chai.request(server)
      .get('/api/convert?input=kg')
      .end((err, res) => {
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, 'kg');
        done();
      });
  });
});
