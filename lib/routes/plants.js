const Router = require('express').Router;
const router = Router();
const Plant = require('../models/plant');

router
  .get('/', (req, res, next) => {
    Plant.find()
      .then(plants => res.send(plants))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Plant.findById(req.params.id)
      .then(plant => {
        if (!plant) res.status(404).send(`${req.params.id} not found`);
        else res.send(plant);
      })
      .catch(next);
  })

  .post('/', (req, res, next) => {
    new Plant(req.body)
      .save()
      .then(plant => res.send(plant))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Plant.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(plant => res.send(plant))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Plant.findByIdAndRemove(req.params.id)
      .then(response => res.send({ removed: !!response }))
      .catch(next);
  });

module.exports = router;