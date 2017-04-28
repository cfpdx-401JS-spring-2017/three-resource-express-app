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

    it.skip('has food is a boolean', () => {
      const cafe = new Cafe({
        name: 'Kenny & Zukes',
        address: {
          city: 'Akron',
          state: 'OH',
          country: 'USA'
        },
        food: 'yes'
      });

      return cafe.validate()
      .then(expectedValidation,
      err => {
        const errors = err.errors;
        console.log(errors.food.kind);
        assert.ok(errors.food && errors.food.kind === 'boolean');
      });
    });

  });

});