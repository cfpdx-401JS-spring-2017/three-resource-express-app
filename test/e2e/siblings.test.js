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

});