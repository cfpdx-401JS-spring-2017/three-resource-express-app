const assert = require('chai').assert;
const Teaware = require('../../lib/models/teaware');

const expectedValidation = () => { throw new Error('expected validation error'); };

describe('teaware model', () => {

    it('validates correct model', () => {
        const teaware = new Teaware({
            name: 'gaiwan',
            details: {
                age: 'qing dynasty',
                source: 'jingdezhen'
            }
        });
        return teaware.validate();
    });

    it('checks that name and style.name is required', () => {
        const teaware = new Teaware();
        return teaware.validate()
            .then(expectedValidation,
            err => {
                const errors = err.errors;
                assert.ok(errors.name && errors.name.kind === 'required');
            });
    });

});
