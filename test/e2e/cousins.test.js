const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('cousins api', () => {
    before(db.drop);


    it('initial /GET returns empty list', () => {
        return request
            .get('/api/cousins')
            .then(req => {
                const cousins = req.body;
                assert.deepEqual(cousins, []);
            });
    });

    let fakeCousin1 = {
        name: 'fake',
        likes: ['fake stuff', 'lame stuff'],
    };

    let fakeCousin2 = {
        name: 'fake2',
        likes: ['faker stuff', 'lamer stuff'],
    };

    let fakeCousin3 = {
        name: 'fake3',
        likes: ['fakest stuff', 'lamest stuff'],
    };

    // //create a helper save function to use in your test
    function saveCousin(cousin) {
        return request
            .post('/api/cousins')
            .send(cousin)
            .then(res => res.body);
    }

    it.only('roundtrips a new cousin', () => {
        return saveCousin(fakeCousin1)
            .then(savedCousin => {
                assert.ok(savedCousin._id, 'saved has id');
                fakeCousin1 = savedCousin;
            })
            .then(() => {
                return request.get(`/api/cousins/${fakeCousin1._id}`);
            })
            .then(res => res.body)
            .then(gotCousin => {
                assert.deepEqual(gotCousin, fakeCousin1);
            });
    });

    it('GET returns 404 for non-existent id', () => {
        const fakeId = '5201103b8896909da4402997';
        return request.get(`/api/cousins/${fakeId}`)
            .then(
            () => { throw new Error('expected 404'); },
            res => {
                assert.equal(res.status, 404);
            }
            );
    });

    it('returns list of all cousins', () => {
        return Promise.all([
            saveCousin(fakeCousin2),
            saveCousin(fakeCousin3)
        ])
            .then(savedCousin => {
                fakeCousin2 = savedCousin[0];
                fakeCousin3 = savedCousin[1];
            })
            .then(() => request.get('/api/cousins'))
            .then(res => res.body)
            .then(cousins => {
                assert.equal(cousins.length, 3);
                assert.include(cousins, fakeCousin1);
                assert.include(cousins, fakeCousin2);
                assert.include(cousins, fakeCousin3);
            });
    });

    // it('retuns an array of likes', () => { //TODO: come back to this test

    // })

    it('updates cousins', () => {
        fakeCousin3.likes = 'sprinkles';
        return request.put(`/api/cousins/${fakeCousin3._id}`)
            .send(fakeCousin3)
            .then(res => res.body)
            .then(updated => {
                assert.equal(updated.likes, 'sprinkles');
            });
    });

    it('deletes a cousins', () => {
        return request.delete(`/api/cousins/${fakeCousin3._id}`)
            .then(res => res.body)
            .then(result => {
                assert.isTrue(result.removed);
            })
            .then(() => request.get('/api/cousins'))
            .then(res => res.body)
            .then(cousins => {
                assert.equal(cousins.length, 2);
            });
    });

    it('deletes a non-eistent cousins, returns removed false', () => {
        return request.delete(`/api/cousins/${fakeCousin3._id}`)
            .then(res => res.body)
            .then(result => {
                assert.isFalse(result.removed);
            });
    });

    it('errors on validation falure', () => {  //Q: checking to see if we get an error when we save a blank sibling object?
        return saveCousin({})
            .then(
            () => { throw new Error('expected failure'); },
            () => { }
            );
    });

});