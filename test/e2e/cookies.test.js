const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('Cookies API', () => {

  before(db.drop);

  it('initial /GET', () => {
    return request.get('/api/cookies')
    .then(req => {
      const cookies = req.body;
      assert.deepEqual(cookies, []);
    });
  });
});