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

  let courierCookie = {
    name: 'Courier Cookie',
    flavor: 'chocolate chip',
    amount: 12
  };

  let starbucksCookie = {
    name: 'Starbucks Cookie',
    flavor: 'ginger',
    amount: 45
  };

  let codeFellowCookie = {
    name: 'Code Fellow Cookie',
    flavor: 'oatmeal',
    amount: 78
  };

  function saveCookie(cookie) {
    return request.post('/api/cookies')
    .send(cookie)
    .then(res => res.body);
  }

  it('saves a cookie', () => {
    return saveCookie(courierCookie)
    .then(saved => {
      assert.ok(saved._id, 'saved has id');
      courierCookie = saved;
    })
    .then(() => {
      return request.get(`/api/cookies/${courierCookie._id}`);
    })
    .then(res => res.body)
    .then(cookie => {
      assert.deepEqual(cookie, courierCookie);
    });
  });

});