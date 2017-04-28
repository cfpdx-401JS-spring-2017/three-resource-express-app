const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('tea api', () => {

    before(db.drop);

    it('first GET returns empty list', () => {
        return request.get('/api/teas')
            .then(req => {
                const teas = req.body;
                assert.deepEqual(teas, []);
            });
    });

    let rougui = {
        name: 'rougui',
        style: {
            name: 'yancha',
            processing: {
                harvestMonth: 'april',
                roasted: true
            }
        },
    };

    let ruby18 = {
        name: 'ruby18',
        style: {
            name: 'hong cha',
            processing: {
                harvestMonth: 'march',
                roasted: true
            }
        },
    };

    let baozhong = {
        name: 'baozhong',
        style: {
            name: 'wulong',
            processing: {
                harvestMonth: 'may',
                roasted: false
            }
        },
    };

    function saveTea(tea) {
        return request
            .post('/api/teas')
            .send(tea)
            .then(res => res.body);
    }

    it('roundtrips a new tea', () => {
        return saveTea(rougui)
            .then(saved => {
                assert.ok(saved._id);
                rougui = saved;
            })
            .then(() => {
                return request.get(`/api/teas/${rougui._id}`);
            })
            .then(res => res.body)
            .then(got => {
                assert.deepEqual(got, rougui);
            });
    });

    it('GET returns 404 if for no-existent id', () => {
        const nonId = '589d04a8b6695bbdfd3106f1';
        return request.get(`/api/teas/${nonId}`)
            .then(() => { throw new Error('expected 404'); },
            res => {
                assert.equal(res.status, 404);
            });
    });

    it('returns list of all teas', () => {
        return Promise.all([
            saveTea(ruby18),
            saveTea(baozhong)
        ])
            .then(savedteas => {
                ruby18 = savedteas[0];
                baozhong = savedteas[1];
            })
            .then(() => request.get('/api/teas'))
            .then(res => res.body)
            .then(teas => {
                assert.equal(teas.length, 3);
                assert.include(teas, rougui);
                assert.include(teas, ruby18);
                assert.include(teas, baozhong);
            });
    });

    it('updated a tea', () => {
        rougui.style.name = 'wulong';
        return request.put(`/api/teas/${rougui._id}`)
            .send(rougui)
            .then(res => res.body)
            .then(updated => {
                assert.equal(updated.style.name, 'wulong');
            });
    });

    it('deletes a tea', () => {
        return request.delete(`/api/teas/${rougui._id}`)
            .then(res => res.body)
            .then(result => {
                assert.isTrue(result.removed);
            })
            .then(() => request.get('/api/teas'))
            .then(res => res.body)
            .then(teas => {
                assert.equal(teas.length, 2);
            });
    });

    it('deleting a non existent tea is removed false', () => {
        return request.delete(`/api/teas/${rougui._id}`)
            .then(res => res.body)
            .then(result => {
                assert.isFalse(result.removed);
            });
    });

    it('errors on validation failure', () => {
        return saveTea({})
            .then(
            () => { throw new Error('expected failure'); },
            () => { }
            );
    });
});