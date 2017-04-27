const assert = require('chai').assert;
const Country = require('../../lib/models/country');

const expectedValidation = () => { throw new Error('expected validation error'); };

describe('countries model', () => {

    it('validates correct model', () => {
        const country = new Country({
            name: 'taiwan',
            continent: 'asia'
        });
        return country.validate();
    });

    it('checks that name is supplied', () => {
        const country = new Country();
        return country.validate()
            .then(expectedValidation, 
                err => {
                    const errors = err.errors;
                    assert.ok(errors.name && errors.name.kind === 'required');
                });
    });

    it('checks that continent is valid', () => {
        const country = new Country({
            name: 'taiwan',
            continent: 'not a continent'
        });
        return country.validate()
            .then(expectedValidation,
                err => {
                    const errors = err.errors;
                    assert.ok(errors.continent.kind === 'enum');
                });
    });

});
