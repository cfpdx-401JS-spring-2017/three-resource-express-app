const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('films api', () => {
    
    before(db.drop);

    it('initial /GET returns empty list', () => {
        return request.get('/api/films')
            .then(req => {
                const films = req.body;
                assert.deepEqual(films, []);
            });
    });

    let tweety = {
        title: 'tweety',
        year: 2012,
    };

    let garfield = {
        title: 'garfield',
        year: 2014,
    };

    let nagini = {
        title: 'Nagini',
        year: 2000,
    };

    function saveFilm(film) {
        return request
            .post('/api/films')
            // send the data as the request body
            .send(film)
            .then(res => res.body);
    }

    it('roundtrips a new Film', () => {
        return saveFilm(tweety)
            .then(saved => {
                // check that we were assigned id
                assert.ok(saved._id, 'saved has id');
                // reassign saved version to our variable
                tweety = saved;
            })
            .then(() => {
                return request.get(`/api/films/${tweety._id}`);
            })
            .then(res => res.body)
            .then(got => {
                assert.deepEqual(got, tweety);
            });
    });

    it('GET returns 404 for non-existent id', () => {
        const nonId = '589d04a8b6695bbdfd3106f1';
        return request.get(`/api/films/${nonId}`)
            .then(
                () => { throw new Error('expected 404'); },
                res => {
                    assert.equal(res.status, 404);
                }  
            );
    });

    it('returns list of all films', () => {
        return Promise.all([
            saveFilm(garfield),
            saveFilm(nagini)
        ])
            .then(savedfilms => {
                garfield = savedfilms[0];
                nagini = savedfilms[1];
            })
            .then(() => request.get('/api/films'))
            .then(res => res.body)
            .then(films => {
                assert.equal(films.length, 3);
                assert.include(films, tweety);
                assert.include(films, garfield);
                assert.include(films, nagini);
            });
    });

    // it('updates films', () => {
    //     nagini.year = 2002;
    //     return request.put(`/api/films/${nagini._id}`)
    //         .send(nagini)
    //         .then(res => res.body)
    //         .then(updated => {
    //             assert.equal(updated.year, 2002);
    //         });
    // });

    it('deletes a films', () => {
        return request.delete(`/api/films/${garfield._id}`)
            .then(res => res.body)
            .then(result => {
                assert.isTrue(result.removed);
            })
            .then(() => request.get('/api/films'))
            .then(res => res.body)
            .then(films => {
                assert.equal(films.length, 2);
            });
    });

    it('delete a non-existent film is removed false', () => {
        return request.delete(`/api/films/${garfield._id}`)
            .then(res => res.body)
            .then(result => {
                assert.isFalse(result.removed);
            });
    });

    it('errors on validation failure', () => {
        return saveFilm({})
            .then(
                () => { throw new Error('expected failure'); },
                () => { }  
            );
    });

});