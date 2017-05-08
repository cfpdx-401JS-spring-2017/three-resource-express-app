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

  let lucille = {
    name: 'Lucille'
  };

  // let georgeMichael = {
  //   name: 'George Michael'
  // };

  // let gob = {
  //   name: 'Gob'
  // };

  function saveBluth(bluth) {
    return request
      .post('/api/bluths')
      .send(bluth)
      .then(res => res.body);
  }

  it('roundtrips a bluth', () => {
    return saveBluth(lucille)
      .then(saved => {
        assert.ok(saved._id, 'saved has id');
        lucille = saved;
      })
      .then(() => {
        return request.get(`/api/bluths/${lucille._id}`);
      })
      .then(res => res.body)
      .then(got => {
        assert.deepEqual(got, lucille);
      });
  });

  it('updates bluth', () => {
    lucille.name = 'George Michael';
    return request.put(`/api/bluths/${lucille._id}`)
      .send(lucille)
      .then(res => res.body)
      .then(updated => {
        assert.equal(updated.name, 'George Michael');
      });
  });

  it('deletes a bluth', () => {
    return request.delete(`/api/bluths/${lucille._id}`)
      .then(res => res.body)
      .then(result => {
        assert.isTrue(result.removed);
      })
      .then(() => request.get('/api/bluths'))
      .then(res => res.body)
      .then(bluths => {
        assert.equal(bluths.length, 0);
      });
  });
});

