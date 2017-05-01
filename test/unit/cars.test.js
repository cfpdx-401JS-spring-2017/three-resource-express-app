const assert = require('chai').assert;
const Car = require('../../lib/models/car');

describe('cars model', () => {

  it('ensures invalid documents are not accepted', () => {
    const invalidCar = new Car();
    
    return invalidCar.validate()
      .then(() => { throw new Error('Expected validation to fail'); },
      err => {
        const errors = err.errors;

        assert.ok(errors.make && errors.make.kind === 'required');
        assert.ok(errors.model && errors.model.kind === 'required');
      });
  });

  it('accepts valid documents', () => {
    const validCar = new Car({ make: 'Ford', model: 'Mustang' });
    
    return validCar.validate();
  });
});