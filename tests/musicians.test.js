const assert = require('chai').assert;
const Musicians = require('../../lib/models/musicians');

const expectedValidation = () => { throw new Error('expected validation errors'); };