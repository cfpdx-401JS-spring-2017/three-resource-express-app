const assert = require('chai').assert;
const Plant = require('../../lib/models/plant');

describe('plants model', () => {

  it('ensures invalid documents are not accepted', () => {
    const invalidPlant = new Plant();

    return invalidPlant.validate()
      .then(
        () => { throw new Error('Expected validation to fail'); },
        err => {
          const errors = err.errors;
          assert.ok(errors.type && errors.leafy.kind === 'required');
          assert.ok(errors.leafy && errors.leafy.kind === 'required');
        }
      );
  });

  it('accepts valid documents', () => {
    const maranta = new Plant({ type: 'Maranta', variety: 'prayer plant', leafy: true });

    return maranta.validate();
  });

});