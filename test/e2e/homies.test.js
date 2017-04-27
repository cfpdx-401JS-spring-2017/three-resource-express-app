const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('homies api', () => {

    before(db.drop);

    it('initial /GET returns empty list', () => {
        return request
            .get('/api/homies')
            .then(req => {
                const homies = req.body;
                assert.deepEqual(homies, []);
            });
    });

    let fakeHomie1 = {
        name: 'fake',
        likes: 'fake stuff',
    };

    // let fakeHomie2 = {
    //     name: 'fake2',
    //     likes: 'lame stuff',
    // };

    // let fakeHomie3 = {
    //     name: 'fake3',
    //     likes: 'updated like',
    // };

    function saveHomie(homie) {
        return request
            .post('/api/homies')
            .send(homie)
            .then(res => res.body);
    }

    it ('rountrips a new homie', () => {
        return saveHomie(fakeHomie1)
        .then(savedHomie => {
            assert.ok(savedHomie._id, 'saved has id');
            fakeHomie1 = savedHomie;
        })
        .then(() => {
            return request.get(`/api/homies/${fakeHomie1._id}`);
        })
        .then(res => res.body)
        .then(gotHomie => {
            assert.deepEqual(gotHomie, fakeHomie1);
        });
    });



});