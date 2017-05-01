const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('cats API', () => {
  before(db.drop);

  it('initial GET should return empty array', () => {
    return request.get('/api/cats')
      .then(res => res.body)
      .then(result => assert.deepEqual(result, []));
  });

  let frank = { name: 'Frank', legs: 4, siblings: 'Arthur' };

  it('POST should add document to database', () => {
    return request.post('/api/cats')
      .send(frank)
      .then(res => res.body)
      .then(saved => {
        assert.ok(saved._id);

        frank = saved;
      });
  });

  it('GET should return a cat', () => {
    return request.get('/api/cats')
      .then(res => res.body)
      .then(cats => assert.equal(cats.length, 1));
  });

  it('GET by id should return that document', () => {
    return request.get(`/api/cats/${frank._id}`)
      .then(res => res.body)
      .then(cat => assert.deepEqual(cat, frank));
  });

  it('GET by id should return 404 if it does not exist', () => {
    const nonexistentId = '589d04a8b6695bbdfd3106f1';

    return request.get(`/api/cats/${nonexistentId}`)
      .then(() => { throw new Error('Was expecting a 404 error'); },
      res => assert.equal(res.status, 404));
  });

  it('updates a document', () => {
    frank.name = 'Roger';

    return request.put(`/api/cats/${frank._id}`)
      .send(frank)
      .then(res => res.body)
      .then(updated => {
        assert.equal(updated.name, 'Roger');
      });
  });

  it('DELETEs a cat', () => {
    return request.delete(`/api/cats/${frank._id}`)
      .then(res => res.body)
      .then(result => assert.isTrue(result.removed))
      .then(() => request.get('/api/cats'))
      .then(res => res.body)
      .then(cats => assert.equal(cats.length, 0));
  });

});