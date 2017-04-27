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

  it('returns 404 if cookie doesnt exist', () => {
    const notId = '589d04a8b6695bbdfd3106f1';
    return request.get(`/api/cookies/${notId}`)
      .then(() => { throw new Error('expected 404'); },
      res => {
        assert.equal(res.status, '404');
      });
  });

  it('returns list of all cookies', () => {
    return Promise.all([
      saveCookie(starbucksCookie),
      saveCookie(codeFellowCookie)
    ])
    .then(savedCookies => {
      starbucksCookie = savedCookies[0];
      codeFellowCookie = savedCookies[1];
    })
    .then(() => request.get('/api/cookies'))
    .then(res => res.body)
    .then(cookies => {
      assert.equal(cookies.length, 3);
      assert.include(cookies, courierCookie);
      assert.include(cookies, starbucksCookie);
      assert.include(cookies, codeFellowCookie);
    });
  });

});