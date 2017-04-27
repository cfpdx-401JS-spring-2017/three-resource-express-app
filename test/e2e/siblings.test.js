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

    // // let fakeSibling2 = {
    // //     name: 'fake2',
    // //     likes: ['faker stuff', 'lamer stuff'],
    // // };

    // // let fakeSibling3 = {
    // //     name: 'fake3',
    // //     likes: ['fakest stuff', 'lamest stuff'],
    // // };

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



});