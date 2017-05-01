const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('cars API', () => {

  before(db.drop);

  it('initial GET request returns empty array', () => {
    return request.get('/api/cars')
      .then(req => req.body)
      .then(cars => assert.deepEqual(cars, []));
  });

  let mustang = { make: 'Ford', model: 'Mustang' };
  let mr2 = { make: 'Toyota', model: 'MR2' };
  let miata = { make: 'Mazda', model: 'Miata' };
  
  function saveCar(car) {
    return request
    .post('/api/cars')
    .send(car)
    .then(res => res.body);
  }

  it('roundtrips a new car', () => {
    saveCar(mustang)
      .then(saved => {
        assert.ok(saved._id, 'saved car has an id');

        mustang = saved;
      })
      .then(() => request.get(`/api/cars/${mustang._id}`))
      .then(res => res.body)
      .then(got => {
        assert.deepEqual(got, mustang);
      });
  });

  it('GET returns a list of all cars', () => {
    return Promise.all([
      saveCar(mr2),
      saveCar(miata)
    ])
    .then(savedCars => {
      mr2 = savedCars[0];
      miata = savedCars[1];
    })
    .then(() => request.get('/api/cars'))
    .then(res => res.body)
    .then(cars => {
      assert.equal(cars.length, 3);
      assert.include(cars, mustang);
      assert.include(cars, mr2);
      assert.include(cars, miata);
    });
  });

  it('updates a car', () => {
    mustang.make = 'Not Ford';

    return request.put(`/api/cars/${mustang._id}`)
      .send(mustang)
      .then(res => res.body)
      .then(car => assert.equal(car.make, 'Not Ford'));
  });

  it('DELETEs a car', () => {
    return request.delete(`/api/cars/${mustang._id}`)
      .then(res => res.body)
      .then(result => assert.isTrue(result.removed))
      .then(() => request.get('/api/cars'))
      .then(res => res.body)
      .then(cars => assert.equal(cars.length, 2));
  });

  it('DELETE a non-existent car returns removed false', () => {
    return request.delete(`/api/cars/${mustang._id}`)
      .then(res => res.body)
      .then(result => assert.isFalse(result.removed));
  });

  it('GET a non-existent car returns 404', () => {
    const invalidId = '589d04a8b6695bbdfd3106f1';

    return request.get(`/api/cars/${invalidId}`)
      .then(
        () => { throw new Error('was expecting a 404 error'); },
        res => assert.equal(res.status, 404)
      );
  });

});