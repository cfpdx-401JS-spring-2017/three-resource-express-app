const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('siblings api', () => {
    before(db.drop);


    it('initial /GET returns empty list', () => {
        return request
            .get('/api/siblings')
            .then(req => {
                const siblings = req.body;
                assert.deepEqual(siblings, []);
            });
    });

    let fakeSibling1 = {
        name: 'fake',
        likes: ['fake stuff', 'lame stuff'],
    };

    let fakeSibling2 = {
        name: 'fake2',
        likes: ['faker stuff', 'lamer stuff'],
    };

    let fakeSibling3 = {
        name: 'fake3',
        likes: ['fakest stuff', 'lamest stuff'],
    };

    // //create a helper save function to use in your test
    function saveSibling(sibling) {
        return request
            .post('/api/siblings')
            .send(sibling)
            .then(res => res.body);
    }

    it('roundtrips a new sibling', () => {
        return saveSibling(fakeSibling1)
            .then(savedSibling => {
                assert.ok(savedSibling._id, 'saved has id');
                fakeSibling1 = savedSibling;
            })
            .then(() => {
                return request.get(`/api/siblings/${fakeSibling1._id}`);
            })
            .then(res => res.body)
            .then(gotSibling => {
                assert.deepEqual(gotSibling, fakeSibling1);
            });
    });

    it('GET returns 404 for non-existent id', () => {
        const fakeId = '5201103b8896909da4402997';
        return request.get(`/api/siblings/${fakeId}`)
            .then(
            () => { throw new Error('expected 404'); },
            res => {
                assert.equal(res.status, 404);
            }
            );
    });

    it('returns list of all siblings', () => {
        return Promise.all([ 
            saveSibling(fakeSibling2),
            saveSibling(fakeSibling3)
        ])
            .then(savedSibling => {
                fakeSibling2 = savedSibling[0];
                fakeSibling3 = savedSibling[1];
            })
            .then(() => request.get('/api/siblings'))
            .then(res => res.body)
            .then(siblings => {
                assert.equal(siblings.length, 3);
                assert.include(siblings, fakeSibling1);
                assert.include(siblings, fakeSibling2);
                assert.include(siblings, fakeSibling3);
            });
    });

    // it('retuns an array of likes', () => { //TODO: come back to this test

    // })

    it('updates siblings', () => {
        fakeSibling3.likes = 'sprinkles';
        return request.put(`/api/siblings/${fakeSibling3._id}`)
            .send(fakeSibling3)
            .then(res => res.body)
            .then(updated => {
                assert.equal(updated.likes, 'sprinkles');
            });
    });

    it('deletes a sibling', () => {
        return request.delete(`/api/siblings/${fakeSibling3._id}`)
            .then(res => res.body) //must return res.body after send request
            .then(result => {
                assert.isTrue(result.removed);
            })
            .then(() => request.get('/api/siblings'))
            .then(res => res.body)
            .then(siblings => {
                assert.equal(siblings.length, 2);
            });
    });

    it('deletes a non-eistent sibling, returns removed false', () => {
        return request.delete(`/api/siblings/${fakeSibling3._id}`)
        .then(res => res.body)
        .then(result => {
            assert.isFalse(result.removed);
        });
    });

    it('errors on validation falure', () => {  //Q: checking to see if we get an error when we save a blank sibling object?
        return saveSibling({})
        .then(
            () => { throw new Error('expected failure'); },
            () => { }
        );
    });



});