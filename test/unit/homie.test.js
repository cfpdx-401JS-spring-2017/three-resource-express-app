const assert = require('chai').assert;
const Homie = require('../../lib/models/homie');

const expectedValidation = () => { throw new Error('expected validation errors'); };

describe('homies model', () => {
    const homie = new Homie({
        name: 'fakeHomie',
        likes: 'candy'
    });
    return homie.validate(); //Q: where does validate come from? express? mongoose?
});

describe('validation failures', () => {

    it('requires name and likes', () => {
        const homie = new Homie();
        return homie.validate()
            .then(expectedValidation,
            err => {
                const errors = err.errors;
                assert.ok(errors.name && errors.name.kind === 'required');
                assert.ok(errors.likes && errors.likes.kind === 'required');
            });
    });
});