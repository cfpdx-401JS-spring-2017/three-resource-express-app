const assert = require('chai').assert;
const Bluth = require('../../lib/models/bluth');

const expectedValidation = () => { throw new Error('expected validation errors'); };

describe('bluths model', () => {

  it.only('validates a good model', () => {
    const bluth = new Bluth({
      name: 'Lucille'
    });
    return bluth.validate();
  });

  describe('validation failures', () => {

    it('name is required', () => {
      const bluth = new Bluth();
      return bluth.validate()
        .then(expectedValidation,
        err => {
          const errors = err.errors;
          assert.ok(errors.name && errors.name.kind === 'required');

        });
    });
  });
});