const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('teaware api', () => {

    before(db.drop);

    it('first GET returns empty list', () => {
        return request.get('/api/teawares')
            .then(req => {
                const teawares = req.body;
                assert.deepEqual(teawares, []);
            });
    });

    let gaiwan = {
        name: 'gaiwan',
        details: {
            age: 'qing dynasty',
            source: 'jingdezhen'
        },
    };

    let yixing = {
        name: 'zhu ni yixing',
        details: {
            age: 'ming dynasty',
            source: 'yixing'
        },
    };

    let tetsubin = {
        name: 'tetsubin',
        details: {
            age: 'ming dynasty',
            source: 'japan'
        },
    };

    function saveTeaware(teaware) {
        return request
            .post('/api/teawares')
            .send(teaware)
            .then(res => res.body);
    }

    it('roundtrips a new teaware', () => {
        return saveTeaware(gaiwan)
            .then(saved => {
                assert.ok(saved._id);
                gaiwan = saved;
            })
            .then(() => {
                return request.get(`/api/teawares/${gaiwan._id}`);
            })
            .then(res => res.body)
            .then(got => {
                assert.deepEqual(got, gaiwan);
            });
    });

    it('GET returns 404 if for no-existent id', () => {
        const nonId = '589d04a8b6695bbdfd3106f1';
        return request.get(`/api/teawares/${nonId}`)
            .then(() => { throw new Error('expected 404'); },
            res => {
                assert.equal(res.status, 404);
            });
    });

    it('returns list of all teawares', () => {
        return Promise.all([
            saveTeaware(yixing),
            saveTeaware(tetsubin)
        ])
            .then(savedteawares => {
                yixing = savedteawares[0];
                tetsubin = savedteawares[1];
            })
            .then(() => request.get('/api/teawares'))
            .then(res => res.body)
            .then(teawares => {
                assert.equal(teawares.length, 3);
                assert.include(teawares, gaiwan);
                assert.include(teawares, yixing);
                assert.include(teawares, tetsubin);
            });
    });

    it('updated a teaware', () => {
        gaiwan.details.age = 'modern';
        return request.put(`/api/teawares/${gaiwan._id}`)
            .send(gaiwan)
            .then(res => res.body)
            .then(updated => {
                assert.equal(updated.details.age, 'modern');
            });
    });

    it('deletes a teaware', () => {
        return request.delete(`/api/teawares/${gaiwan._id}`)
            .then(res => res.body)
            .then(result => {
                assert.isTrue(result.removed);
            })
            .then(() => request.get('/api/teawares'))
            .then(res => res.body)
            .then(teawares => {
                assert.equal(teawares.length, 2);
            });
    });

    it('deleting a non existent teaware is removed false', () => {
        return request.delete(`/api/teawares/${gaiwan._id}`)
            .then(res => res.body)
            .then(result => {
                assert.isFalse(result.removed);
            });
    });

    it('errors on validation failure', () => {
        return saveTeaware({})
            .then(
            () => { throw new Error('expected failure'); },
            () => { }
            );
    });
});