const assert = require('chai').assert;
const Cat = require('../../lib/models/cat.js');

describe('cat model', () => {

  it('ensures invalid documents are not accepted', () => {
    const invalidCat = new Cat({});

    return invalidCat.validate()
      .then(() => { throw new Error('Expected validation to fail'); },
      err => {
        const error = err.errors;

        assert.ok(error.name && error.name.kind === 'required');
      });
  });

  it('accepts valid documents', () => {
    const validCat = new Cat({ name: 'Arthur' });

    return validCat.validate();
  });

});