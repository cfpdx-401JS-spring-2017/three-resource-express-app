const assert = require('chai').assert;
const Film = require('../../lib/models/film');

const expectedValidation = () => { throw new Error('expected validation errors'); };

describe('Film model', () => {

    it('validates good model', () => {
        const film = new Film({
            title: 'Titantic',
            year: 1998,
            actors: []
        });

        return film.validate();
    });

    describe('validation failures', () => {

        it('title and year are required', () => {
            const film = new Film();
            return film.validate()
                .then(expectedValidation,
                err => {
                    const errors = err.errors;
                    assert.ok(errors.year && errors.year.kind === 'required');
                    assert.ok(errors.title && errors.title.kind === 'required');
                });
        });

        it('they are at least 67 years old', () => {
            const film = new Film({
                title: 'Billy Bob',
                year: 1000,
                actors: []
            });

            return film.validate()
                .then(expectedValidation,
                err => {
                    const errors = err.errors;
                    assert.ok(errors.year && errors.year.kind === 'min');
                }
                );
        });

        it('they have a title no bigger than 20 characters', () => {
            const film2 = new Film({
                title: 'banannananafefifofanah',
                year: 1990,
                actors: []
            }); 
            return film2.validate()
                .then(expectedValidation,
                err => {
                    const errors = err.errors;
                    assert.ok(errors.title && errors.title.kind === 'maxlength');
                }
                );
        });
    });
});