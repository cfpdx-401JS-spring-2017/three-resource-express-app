const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('banana-stand api', () => {

  before(db.drop);

  it.only('initial /GET returns empty list', () => {
    return request.get('/api/banana-stands')
      .then(req => {
        const bananaStand = req.body;
        assert.deepEqual(bananaStand, []);
      });
  });

});