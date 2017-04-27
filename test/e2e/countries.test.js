const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('country api', () => {

    before(db.drop);

    it('first GET returns empty list', () => {
        return request.get('/api/countries')
            .then(req => {
                const countries = req.body;
                assert.deepEqual(countries, []);
            });
    });

    let china = {
        name: 'china',
        continent: 'asia',
        popular: 'puer'
    };

    let taiwan = {
        name: 'taiwan',
        continent: 'asia',
        popular: 'dayuling'
    };

    let japan = {
        name: 'japan',
        continent: 'asia',
        popular: 'sencha'
    };

    function saveCountry(country) {
        return request
            .post('/api/countries')
            .send(country)
            .then(res => res.body);
    }

    it('roundtrips a new country', () => {
        return saveCountry(china)
            .then(saved => {
                assert.ok(saved._id);
                china = saved;
            })
            .then(() => {
                return request.get(`/api/countries/${china._id}`);
            })
            .then(res => res.body)
            .then(got => {
                assert.deepEqual(got, china);
            });
    });

    it('GET returns 404 if for no-existent id', () => {
        const nonId = '589d04a8b6695bbdfd3106f1';
        return request.get(`/api/countries/${nonId}`)
            .then(() => { throw new Error('expected 404'); },
            res => {
                assert.equal(res.status, 404);
            });
    });

    it('returns list of all countries', () => {
        return Promise.all([
            saveCountry(taiwan),
            saveCountry(japan)
        ])
            .then(savedCountries => {
                taiwan = savedCountries[0];
                japan = savedCountries[1];
            })
            .then(() => request.get('/api/countries'))
            .then(res => res.body)
            .then(countries => {
                assert.equal(countries.length, 3);
                assert.include(countries, china);
                assert.include(countries, taiwan);
                assert.include(countries, japan);
            });
    });

    it('updated a country', () => {
        china.popular = 'wulong';
        return request.put(`/api/countries/${china._id}`)
            .send(china)
            .then(res => res.body)
            .then(updated => {
                assert.equal(updated.popular, 'wulong');
            });
    });

    it('deletes a country', () => {
        return request.delete(`/api/countries/${china._id}`)
            .then(res => res.body)
            .then(result => {
                assert.isTrue(result.removed);
            })
            .then(() => request.get('/api/countries'))
            .then(res => res.body)
            .then(countries => {
                assert.equal(countries.length, 2);
            });
    });

    it('deleting a non existent pet is removed false', () => {
        return request.delete(`/api/countries/${china._id}`)
            .then(res => res.body)
            .then(result => {
                assert.isFalse(result.removed);
            });
    });

    it('errors on validation failure', () => {
        return saveCountry({})
            .then(
            () => { throw new Error('expected failure'); },
            () => { }
            );
    });
});