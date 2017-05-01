const assert = require('chai').assert;
const Cafe = require('../../lib/models/cafe');

const expectedValidation = () => { throw new Error('expected validation errors'); };

describe('cafe model', () => {

  it('validates success', () => {
    const cafe = new Cafe({
      name: 'Dragonfly Cafe',
      location: {
        city: 'Portland',
        state: 'OR',
        country: 'USA',
      },
      food: true
    });
    return cafe.validate();
  });

  describe('validates failures', () => {

    it('name is required', () => {
      const closedCafe = new Cafe({});
      return closedCafe.validate()
      .then(expectedValidation,
      err =>{
        const errors = err.errors;
        assert.ok(errors.name && errors.name.kind === 'required');
      });
    });

  });

});