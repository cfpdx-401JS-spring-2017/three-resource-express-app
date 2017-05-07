const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('bluth api', () => {

  before(db.drop);

  it('initial GET/ returns empty list', () => {
    return request.get('/api/bluths')
      .then(req => {
        const bluths = req.body;
        assert.deepEqual(bluths, []);
      });
  });

});
