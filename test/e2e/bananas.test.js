const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('bananas api', () => {

  before(db.drop);

  it('initial /GET returns empty list', () => {
    return request.get('/api/bananas')
      .then(req => {
        const bananas = req.body;
        assert.deepEqual(bananas, []);
      });
  });

  let bananaSplit = {
    name: 'Banana Split',
    toppings: 3
  };

  let georgeMichael = {
    name: 'George Michael',
    toppings: 4
  };

  let gobBluthe = {
    name: 'Gob Bluthe',
    toppings: 1
  };

  function saveBanana(banana) {
    return request
      .post('/api/bananas')
      .send(banana)
      .then(res => res.body);
  }

  it('roundtrips a new banana', () => {
    return saveBanana(bananaSplit)
      .then(saved => {
        assert.ok(saved._id, 'saved has id');
        return bananaSplit = saved;
      })
      .then(() => {
        return request.get(`/api/bananas/${bananaSplit._id}`);
      })
      .then(res => res.body)
      .then(got => {
        assert.deepEqual(got, bananaSplit);
      });
  });

  it('GET returns 404 for non-existent id', () => {
    const nonId = '589d04a8b6695bbdfd3106f1';
    return request.get(`/api/bananas/${nonId}`)
      .then(
      () => { throw new Error('expected 404'); },
      res => {
        assert.equal(res.status, 404);
      }
      );
  });

  it('returns list of all bananas', () => {
    return Promise.all([
      saveBanana(georgeMichael),
      saveBanana(gobBluthe)
    ])
      .then(savedBananas => {
        georgeMichael = savedBananas[0];
        gobBluthe = savedBananas[1];
      })
      .then(() => request.get('/api/bananas'))
      .then(res => res.body)
      .then(bananas => {
        assert.equal(bananas.length, 3);
        assert.include(bananas, bananaSplit);
        assert.include(bananas, georgeMichael);
        assert.include(bananas, gobBluthe);
      });
  });

  it('updates banana', () => {
    bananaSplit.toppings = 4;
    return request.put(`/api/bananas/${bananaSplit._id}`)
      .send(bananaSplit)
      .then(res => res.body)
      .then(updated => {
        assert.equal(updated.toppings, 4);
      });
  });

  it('deletes a banana', () => {
    return request.delete(`/api/bananas/${georgeMichael._id}`)
      .then(res => res.body)
      .then(result => {
        assert.isTrue(result.removed);
      })
      .then(() => request.get('/api/bananas'))
      .then(res => res.body)
      .then(bananas => {
        assert.equal(bananas.length, 2);
      });
  });

  it('delete a non-existent banana is removed false', () => {
    return request.delete(`/api/bananas/${georgeMichael._id}`)
      .then(res => res.body)
      .then(result => {
        assert.isFalse(result.removed);
      });
  });

  it('errors on validation failure', () => {
    return saveBanana({})
      .then(
      () => { throw new Error('expected failure'); },
      () => { }
      );
  });

});