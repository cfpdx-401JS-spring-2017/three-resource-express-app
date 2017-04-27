const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('cows api', () => {
  before(db.drop);
  it('initial /GET returns an empty list', () => {
    return request.get('/api/cows')
    .then(req => {
      const cows = req.body;
      assert.deepEqual(cows, []);
    });
  });
});