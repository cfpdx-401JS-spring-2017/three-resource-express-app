const assert = require('chai').assert;
const Cookie = require('../../lib/models/cookies');

const expectedValidation = () => { throw new Error('expected validation errors'); };

describe('cookie model', () => {

  describe('validates successes', () => {
    
    it.only('validates model', () => {
      const testCookie = new Cookie({
        name: 'Jumbo Cookie',
        flavor: 'frosted animal',
        amount: '67'
      });
      return testCookie.validate();
    });
  });

  describe('validates failures', () => {
    it('has wrong amount', () => {

    });
  });

});