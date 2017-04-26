const assert = require('chai').assert;
const Cookie = require('../../lib/models/cookies');

const expectedValidation = () => { throw new Error('expected validation errors'); };

describe('cookie model', () => {

  describe('validates successes', () => {
    
    it('validates model', () => {
      const testCookie = new Cookie({
        name: 'Jumbo Cookie',
        flavor: 'frosted animal',
        amount: '67'
      });
      return testCookie.validate();
    });
  });

  describe('validates failures', () => {
    it('name and flavor are required', () => {
      const badCookie = new Cookie();
      
      return badCookie.validate()
      .then(expectedValidation, 
      err => {
        const errors = err.errors;
        assert.ok(errors.name && errors.name.kind === 'required');
        assert.ok(errors.flavor && errors.flavor.kind === 'required');
      });
    });
    
    it.skip('has at least zero cookies', () => {

    });
  });

});