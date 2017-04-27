const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('Coffee API', () => {

  before(db.drop);

  it('initial /GET', () => {
    return request.get('/api/coffees')
      .then(req => {
        const coffees = req.body;
        assert.deepEqual(coffees, []);
      });
  });

  let courierCoffee = {
    name: 'Courier Coffee',
    roast: 'mocha',
    flavor: 'chocolatey'
  };

  let nuvreiCoffee = {
    name: 'Nuvrei Coffee',
    roast: 'dark roast',
    flavor: 'burnt'
  };

  let nossaCoffee = {
    name: 'Nossa Familia Coffee',
    roast: 'light roast',
    flavor: 'strong'
  };

  function saveCoffee(coffee) {
    return request.post('/api/coffees')
      .send(coffee)
      .then(res => res.body);
  }

  it('saves a coffee', () => {
    return saveCoffee(courierCoffee)
      .then(saved => {
        assert.ok(saved._id, 'saved has id');
        courierCoffee = saved;
      })
      .then(() => {
        return request.get(`/api/coffees/${courierCoffee._id}`);
      })
      .then(res => res.body)
      .then(coffee => {
        assert.deepEqual(coffee, courierCoffee);
      });
  });

  it('returns 404 if the coffee does not exist', () => {
    const notId = '589d04a8b6695bbdfd3106f1';
    return request.get(`/api/coffees/${notId}`)
      .then(() => { throw new Error('expected 404'); },
      res => {
        assert.equal(res.status, '404');
      });
  });

  it('returns list of all coffee types', () => {
    return Promise.all([
      saveCoffee(nuvreiCoffee),
      saveCoffee(nossaCoffee)
    ])
      .then(savedCoffees => {
        nuvreiCoffee = savedCoffees[0];
        nossaCoffee = savedCoffees[1];
      })
      .then(() => request.get('/api/coffees'))
      .then(res => res.body)
      .then(coffees => {
        assert.equal(coffees.length, 3);
        assert.include(coffees, courierCoffee);
        assert.include(coffees, nuvreiCoffee);
        assert.include(coffees, nossaCoffee);
      });
  });

  it('updates a coffee', () => {
    nossaCoffee.flavor = 'gross';
    return request.put(`/api/coffees/${nossaCoffee._id}`)
      .send(nossaCoffee)
      .then(res => res.body)
      .then(updated => {
        assert.equal(updated.flavor, 'gross');
      });
  });

  it('deletes a coffee', () => {
    return request.delete(`/api/coffees/${nossaCoffee._id}`)
      .then(res => res.body)
      .then(result => {
        assert.isTrue(result.removed);
      })
      .then(() => request.get('/api/coffees'))
      .then(res => res.body)
      .then(coffees => {
        assert.equal(coffees.length, 2);
      });
  });

  it('delete a coffee that doesn\'t exist, return false', () => {
    return request.delete(`/api/coffees/${nossaCoffee._id}`)
      .then(res => res.body)
      .then(result => {
        assert.isFalse(result.removed);
      });
  });

  it('validation fails, send error', () => {
    return saveCoffee({})
      .then(() => { throw new Error('expected failure'); },
      () => { }
      );
  });

});