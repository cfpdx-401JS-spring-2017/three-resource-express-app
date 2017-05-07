const Router = require('express').Router;
const router = Router();
const Bluth = require('../models/bluth');

router
  .get('/', (req, res, next) => {
    Bluth.find()
      .then(bluths => res.send(bluths))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const id = req.params.id;
    Bluth.findById(id)
      .then(bluth => {
        if (!bluth) res.status(404).statusMessage(`${id} not found`);
        else res.send(bluth);
      })
      .catch(next);
  })

  .post('/', (req, res, next) => {
    new Bluth(req.body)
      .save()
      .then(bluth => res.send(bluth))
      .catch(next);
  });

module.exports = router;