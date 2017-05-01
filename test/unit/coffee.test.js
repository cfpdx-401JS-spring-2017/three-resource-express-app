const assert = require('chai').assert;
const Coffee = require('../../lib/models/coffee');

const expectedValidation = () => { throw new Error('expected validation errors'); };

describe('coffee model', () => {

  describe('validates successes', () => {
    
    it('validates model', () => {
      const testCoffee = new Coffee({
        name: 'Lightly Sweet Chai Latte',
        roast: 'light roast',
        flavor: 'creamy'
      });
      return testCoffee.validate();
    });
  });

  describe('validates failures', () => {
    it('name and roast are required', () => {
      const emptyCup = new Coffee();
      
      return emptyCup.validate()
      .then(expectedValidation, 
      err => {
        const errors = err.errors;
        assert.ok(errors.name && errors.name.kind === 'required');
        assert.ok(errors.roast && errors.roast.kind === 'required');
      });
    });

    it('not a flavor', () => {
      const actuallyTea = new Coffee({
        name: 'Earl Grey',
        roast: 'full leaf',
        flavor: 'bergamont'
      });

      return actuallyTea.validate()
      .then(expectedValidation,
      err => {
        const errors = err.errors;
        assert.ok(errors.flavor && errors.flavor.kind === 'enum');
      });
    });

  });

});