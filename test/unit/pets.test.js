const assert  = require('assert');
const Pet = require('../../lib/models/pets');

const expectedValidation = () => {throw new Error('expected errors but recieved none');};

describe('validates pets', () => {
  it('validates model', () => {
    const pet = new Pet({
      name: 'bob',
      legs: 4,

    });
    return pet.validate();

  });

  describe('validation falures', () => {
    it('name and legs are required', () => {
      const pet = new Pet();
      return pet.validate()
      .then(expectedValidation,
      err => {
        const errors = err.errors;
        console.log(errors);
        assert.ok(errors.legs && errors.legs.kind === 'required');
        assert.ok(errors.name && errors.name.kind === 'required');
      });
    });

    it('pet has at least dos legs', () => {
      const pet = new Pet({
        name:'bob',
        legs: 0,
      });
      return pet.validate()
      .then(expectedValidation,
      err => {
        const errors = err.errors;
        assert.ok(errors.legs && errors.legs.kind === 'min');
      });
    });
  });


});


