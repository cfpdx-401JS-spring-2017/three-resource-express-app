const assert = require('chai').assert;
const Cousin = require('../../lib/models/cousin');

const expectedValidation = () => { throw new Error('expected validation errors'); };

describe('cousins model', () => {
    const cousin = new Cousin({
        name: 'fakeCousin1',
        likes: 'candy'
    });
    return cousin.validate(); //Q: where does validate come from? express? mongoose?
});

describe('validation failures', () => {

    it('requires name and likes', () => {
        const cousin = new Cousin();
        return cousin.validate()
            .then(expectedValidation,
            err => {
                const errors = err.errors;
                assert.ok(errors.name && errors.name.kind === 'required');
                assert.ok(errors.likes && errors.likes.kind === 'required');
            });
    });



});