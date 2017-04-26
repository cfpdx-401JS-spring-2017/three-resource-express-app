const assert = require('chai').assert;
const Musician = require('../lib/models/musician');

const expectedValidation = () => { throw new Error('expected validation errors'); };

describe('Musician model', () => {

    it('validates good model', () => {
        const musician = new Musician({
            name: 'DJ Khaled',
            age: 38,
            songs: ['High Up', 'Fly UP', 'I know you']
        });
        return musician.validate();
    });

    describe('validation failures', () => {

        it('name and age and songs are required', () => {
            const musician = new Musician();
            return musician.validate()
                .then(expectedValidation,
                err => {
                    const errors = err.errors;
                    assert.ok(errors.age && errors.age.kind === 'required');
                    assert.ok(errors.name && errors.name.kind === 'required');
                    assert.ok(errors.songs && errors.songs.kind === 'required');
                });
        });
    });
});