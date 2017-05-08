const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('banana-stand api', () => {

  before(db.drop);

  it('initial /GET returns empty list', () => {

    return request.get('/api/banana-stands')
      .then(req => {
        const bananaStand = req.body;
        assert.deepEqual(bananaStand, []);
      });
  });

  let downtown = {
    name: 'Downtown'
  };

  function saveBananaStand(bananaStand) {
    return request
      .post('/api/banana-stands')
      .send(bananaStand)
      .then(res => res.body);
  }

  it('roundtrips a banana stand', () => {

    return saveBananaStand(downtown)
      .then(saved => {
        assert.ok(saved._id, 'saved has id');
        downtown = saved;
      })
      .then(() => {
        return request.get(`/api/banana-stands/${downtown._id}`);
      })
      .then(res => res.body)
      .then(got => {
        assert.deepEqual(got, downtown);
      });
  });

  it('GET returns 404 for non-existent id', () => {
    
    const nonId = '589d04a8b6695bbdfd3106f1';
    return request.get(`/api/banana-stands/${nonId}`)
      .then(
      () => { throw new Error('expected 404'); },
      res => {
        assert.equal(res.status, 404);
      }
      );
  });

});