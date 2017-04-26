const Router = require('express').Router;
const router = Router();
const Cookie = require('../models/cookies');

router.get('/', (req, res) => {
  Cookie.find()
  .then(cookies => res.send(cookies));
});

module.exports = router;