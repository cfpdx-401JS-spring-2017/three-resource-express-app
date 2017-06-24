const assert = require('chai').assert;
const Actor = require('../../lib/models/actor');

const expectedValidation = () => { throw new Error('expected validation errors'); };

describe('Actor model', () => {

    it('validates good model', () => {
        const actor = new Actor({
            name: 'Will Farrel',
            age: 38,
        });

        return actor.validate();
    });

    describe('validation failures', () => {

        it('name and age are required', () => {
            const actor = new Actor();
            return actor.validate()
                .then(expectedValidation,
                err => {
                    const errors = err.errors;
                    assert.ok(errors.age && errors.age.kind === 'required');
                    assert.ok(errors.name && errors.name.kind === 'required');
                });
        });

        it('they are at least 12 years old', () => {
            const actor = new Actor({
                name: 'Billy Bob',
                age: 10,
            });

            return actor.validate()
                .then(expectedValidation,
                err => {
                    const errors = err.errors;
                    assert.ok(errors.age && errors.age.kind === 'min');
                }
                );
        });

        it('they have a name no bigger than 20 characters', () => {
            const actor2 = new Actor({
                name: 'banannananafefifofanah',
                age: 15,
            }); 
            return actor2.validate()
                .then(expectedValidation,
                err => {
                    const errors = err.errors;
                    assert.ok(errors.name && errors.name.kind === 'maxlength');
                }
                );
        });
    });
});