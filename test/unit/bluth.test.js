// const assert = require('chai').assert;
const Bluth = require('../../lib/models/bluth');

// const expectedValidation = () => { throw new Error('expected validation errors');};

describe('bluths model', () => {

  it.only('validates a good model', () => {
    const bluth = new Bluth({
      name: 'Lucille'
    });
    return bluth.validate();
  });

});