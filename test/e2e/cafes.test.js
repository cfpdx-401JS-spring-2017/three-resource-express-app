const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('Cafe API', () => {

  before(db.drop);

  let dragonfly = {
    name: 'Dragonfly Cafe',
    location: {
      city: 'Portland',
      state: 'OR',
      country: 'USA'
    },
    food: true
  };

  let samanthas = {
    name: 'Samantha\'s',
    address: {
      city: 'Akron',
      state: 'OH',
      country: 'USA'
    },
    food: true
  };

  let byways = {
    name: 'Byways Cafe',
    address: {
      city: 'Hood River',
      state: 'OR',
      country: 'USA'
    },
    food: true
  };

  function saveCafe(cafe) {
    return request.post('/api/cafes')
      .send(cafe)
      .then(res => res.body);
  }

  it('initial /GET', () => {
    return request.get('/api/cafes')
      .then(res => {
        const cafes = res.body;
        assert.deepEqual(cafes, []);
      });
  });

  it('saves a cafe', () => {
    return saveCafe(dragonfly)
      .then(saved => {
        assert.ok(saved._id, 'cafe has id');
        dragonfly = saved;
      })
      .then(() => {
        return request.get(`/api/cafes/${dragonfly._id}`);
      })
      .then(res => res.body)
      .then(cafe => {
        assert.deepEqual(cafe, dragonfly);
      });
  });

  it('returns 404 if the coffee does not exist', () => {
    const notId = '589d04a8b6695bbdfd3106f1';
    return request.get(`/api/cafes/${notId}`)
      .then(() => { throw new Error('expected 404'); },
      res => {
        assert.equal(res.status, '404');
      });
  });

  it('returns list of all cafes', () => {
    return Promise.all([
      saveCafe(samanthas),
      saveCafe(byways)
    ])
      .then(savedCafes => {
        samanthas = savedCafes[0];
        byways = savedCafes[1];
      })
      .then(() => request.get('/api/cafes'))
      .then(res => res.body)
      .then(cafes => {
        assert.equal(cafes.length, 3);
        assert.include(cafes, dragonfly);
        assert.include(cafes, samanthas);
        assert.include(cafes, byways);
      });
  });

  it('updates a cafe', () => {
    samanthas.food = false;
    return request.put(`/api/cafes/${samanthas._id}`)
      .send(samanthas)
      .then(res => res.body)
      .then(updated => {
        assert.equal(updated.food, false);
      });
  });

  it('deletes a cafe', () => {
    return request.delete(`/api/cafes/${byways._id}`)
      .then(res => res.body)
      .then(result => {
        assert.isTrue(result.removed);
      })
      .then(() => request.get('/api/cafes'))
      .then(res => res.body)
      .then(cafes => {
        assert.equal(cafes.length, 2);
      });
  });

  it('fails to delete non-existant cafe', () => {
    return request.delete(`/api/cafes/${byways._id}`)
      .then(res => res.body)
      .then(result => {
        assert.isFalse(result.removed);
      });
  });

  it('validation fails', () => {
    return saveCafe({})
      .then(() => { throw new Error('expected failure'); },
      () => { }
      );
  });

});