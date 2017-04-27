const assert = require('chai').assert;
const Sibling = require('../../lib/models/sibling');

const expectedValidation = () => { throw new Error('expected validation errors'); };

describe('siblings model', () => { //Q:why no assert in this describe?

    it('validates good model', () => {
        const sibling = new Sibling({
            name: 'fakeSibling',
            likes: ['fake stuff', 'lame stuff']
        });
        return sibling.validate(); //validate is a method included in mongoose
    });
});

describe('validation failures', () => {

    it('requires name', () => {
        const sibling = new Sibling();
        return sibling.validate()
            .then(expectedValidation,
            err => {
                const errors = err.errors; //Q: not following this
                assert.ok(errors.name && errors.name.kind === 'required');
            });
    });



});