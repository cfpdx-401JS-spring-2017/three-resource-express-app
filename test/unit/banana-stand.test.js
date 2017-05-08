const assert = require('chai').assert;
const BananaStand = require('../../lib/models/banana-stand');

const expectedValidation = () => { throw new Error('expected validation errors'); };

describe('banana-stand model', () => {

  it('validates a good model', () => {
    const bananaStand = new BananaStand({
      name: 'Pop Pop\'s',
    });
    return bananaStand.validate();
  });
  describe('validation failures', () => {

    it('name required', () => {
      const bananaStand = new BananaStand();
      return bananaStand.validate()
        .then(expectedValidation,
        err => {
          const errors = err.errors;
          assert.ok(errors.name && errors.name.kind === 'required');
        });
    });
  });
});