const Router = require('express').Router;
const router = Router();
const Bluth = require('../models/bluth');

router
  .get('/', (req, res, next) => {
    Bluth.find()
      .then(bluths => res.send(bluths))
      .catch(next);
  });

  // .post('/', (req, res, next) => {
  //   new Bluth(req.body)
  //     .save()
  //     .then(bluth => res.send(bluth))
  //     .catch(next);
  // });

module.exports = router;