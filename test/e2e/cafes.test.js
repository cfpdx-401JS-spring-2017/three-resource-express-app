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

  let firstWatch = {
    name: 'First Watch',
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
      saveCafe(firstWatch),
      saveCafe(byways)
    ])
      .then(savedCafes => {
        firstWatch = savedCafes[0];
        byways = savedCafes[1];
      })
      .then(() => request.get('/api/cafes'))
      .then(res => res.body)
      .then(cafes => {
        assert.equal(cafes.length, 3);
        assert.include(cafes, dragonfly);
        assert.include(cafes, firstWatch);
        assert.include(cafes, byways);
      });
  });

  it('updates a cafe', () => {
    firstWatch.food = false;
    return request.put(`/api/cafes/${firstWatch._id}`)
      .send(firstWatch)
      .then(res => res.body)
      .then(updated => {
        assert.equal(updated.food, false);
      });
  });

});