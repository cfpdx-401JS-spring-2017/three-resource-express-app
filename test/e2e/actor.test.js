const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('actors api', () => {
    
    before(db.drop);

    it('initial /GET returns empty list', () => {
        return request.get('/api/actors')
            .then(req => {
                const actors = req.body;
                assert.deepEqual(actors, []);
            });
    });

    let tweety = {
        name: 'tweety',
        age: 22,
    };

    let garfield = {
        name: 'garfield',
        age: 24,
    };

    let nagini = {
        name: 'Nagini',
        age: 20,
    };

    function saveActors(actor) {
        return request  
            .post('/api/actors')
            // send the data as the request body
            .send(actor)
            .then(res => res.body);
    }

    it('roundtrips a new Actor', () => {
        return saveActors(tweety)
            .then(saved => {
                // check that we were assigned id
                assert.ok(saved._id, 'saved has id');
                // reassign saved version to our variable
                tweety = saved;
            })
            // go get this same pet by id
            .then(() => {
                return request.get(`/api/actors/${tweety._id}`);
            })
            // get the data (pet) off they response body
            .then(res => res.body)
            .then(got => {
                // should be same as response from post
                assert.deepEqual(got, tweety);
            });
    });

    it('GET returns 404 for non-existent id', () => {
        const nonId = '589d04a8b6695bbdfd3106f1';
        return request.get(`/api/actors/${nonId}`)
            .then(
                () => { throw new Error('expected 404'); },
                res => {
                    assert.equal(res.status, 404);
                }  
            );
    });

    it('returns list of all actors', () => {
        return Promise.all([
            saveActors(garfield),
            saveActors(nagini)
        ])
            .then(savedactors => {
                garfield = savedactors[0];
                nagini = savedactors[1];
            })
            .then(() => request.get('/api/actors'))
            .then(res => res.body)
            .then(actors => {
                assert.equal(actors.length, 3);
                assert.include(actors, tweety);
                assert.include(actors, garfield);
                assert.include(actors, nagini);
            });
    });

    // it('updates actors', () => {
    //     // human transform! :)
    //     nagini.age = 32;
    //     return request.put(`/api/actors/${nagini._id}`)
    //         .send(nagini)
    //         .then(res => res.body)
    //         .then(updated => {
    //             assert.equal(updated.age, 32);
    //         });
    // });

    it('deletes a actors', () => {
        return request.delete(`/api/actors/${garfield._id}`)
            .then(res => res.body)
            .then(result => {
                assert.isTrue(result.removed);
            })
            .then(() => request.get('/api/actors'))
            .then(res => res.body)
            .then(actors => {
                assert.equal(actors.length, 2);
            });
    });

    it('delete a non-existent musician is removed false', () => {
        return request.delete(`/api/actors/${garfield._id}`)
            .then(res => res.body)
            .then(result => {
                assert.isFalse(result.removed);
            });
    });

    it('errors on validation failure', () => {
        return saveActors({})
            .then(
                () => { throw new Error('expected failure'); },
                () => { }  
            );
    });

});