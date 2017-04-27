const assert = require('chai').assert;
const Tea = require('../../lib/models/tea');

const expectedValidation = () => { throw new Error('expected validation error'); };

describe('teas model', () => {

    it('validates correct model', () => {
        const tea = new Tea({
            name: 'ruby18',
            style: {
                name: 'hong cha'
            }
        });
        return tea.validate();
    });

    it('checks that name and style.name is required', () => {
        const tea = new Tea();
        return tea.validate()
            .then(expectedValidation,
            err => {
                const errors = err.errors;
                assert.ok(errors.name && errors.name.kind === 'required');
            });
    });

});
