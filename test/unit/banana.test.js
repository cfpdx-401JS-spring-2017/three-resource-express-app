const assert = require('chai').assert;
const Banana = require('../../lib/models/banana');

const expectedValidation = () => { throw new Error('expected validation errors'); };

describe('bananas model', () => {

  it('validates good model', () => {
    const banana = new Banana({
      name: 'Banana Split',
      toppings: 3
    });
    return banana.validate();
  });

  describe('validation failures', () => {

    it('name and toppings required', () => {
      const banana = new Banana();
      return banana.validate()
        .then(expectedValidation,
        err => {
          const errors = err.errors;
          assert.ok(errors.toppings && errors.toppings.kind === 'required');
          assert.ok(errors.name && errors.name.kind === 'required');

        });
    });

    it('has at least 0 toppings', () => {
      const banana = new Banana({
        name: 'banana',
        toppings: -1
      });

      return banana.validate()
        .then(expectedValidation,
        err => {
          const errors = err.errors;
          assert.ok(errors.toppings && errors.toppings.kind === 'min');
        }
        );
    });
    
    it('has no more than 5 toppings', () => {
      const banana = new Banana({
        name: 'banana',
        toppings: 6
      });

      return banana.validate()
        .then(expectedValidation,
        err => {
          const errors = err.errors;
          assert.ok(errors.toppings && errors.toppings.kind === 'max');
        }
        );
    });
  });
});