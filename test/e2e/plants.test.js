const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('plants API', () => {

  before(db.drop);

  it('initial get request should return empty array', () => {
    return request.get('/api/plants')
      .then(res => res.body)
      .then(plants => assert.deepEqual(plants, []));
  });

  let maranta = { type: 'Maranta', variety: 'prayer plant', leafy: true };
  let cactus = { type: 'Spiny Cactus', variety: 'cactus', leafy: false };
  let succulent = { type: 'Black Beauty', variety: 'desert', leafy: true };

  function savePlant(plant) {
    return request.post('/api/plants')
      .send(plant)
      .then(res => res.body);
  }

  it('POST should add a plant to database', () => {
    savePlant(maranta)
      .then(saved => {
        assert.ok(saved._id);

        maranta = saved;
      })
      .then(() => request.get('/api/plants'))
      .then(res => res.body)
      .then(plant => assert.deepEqual(plant[0], maranta));
  });

  it('GET returns a list of plants', () => {
    return Promise.all([
      savePlant(cactus),
      savePlant(succulent)
    ])
    .then(saved => {
      cactus = saved[0];
      succulent = saved[1];
    })
    .then(() => request.get('/api/plants'))
    .then(res => res.body)
    .then(plants => {
      assert.equal(plants.length, 3);
      assert.include(plants, maranta);
      assert.include(plants, cactus);
      assert.include(plants, succulent);
    });
  });

  it('GET plant by id', () => {
    return request.get(`/api/plants/${maranta._id}`)
      .then(res => res.body)
      .then(plant => assert.deepEqual(plant, maranta)); 
  });

  it('GET plant by id returns 404 if does not exist', () => {
    const nonexistentId = '589d04a8b6695bbdfd3106f1';

    return request.get(`/api/plants/${nonexistentId}`)
      .then(() => { throw new Error('Expected 404 error'); },
      err => assert.equal(err.status, 404));
  });

});


