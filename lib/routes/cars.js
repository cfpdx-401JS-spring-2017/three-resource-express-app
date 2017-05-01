const Router = require('express').Router;
const router = Router();
const Car = require('../models/car');

router
  .get('/', (req, res, next) => {
    Car.find()
      .then(cars => res.send(cars))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const id = req.params.id;

    Car.findById(id)
      .then(car => {
        if (!car) res.status(404).send(`${id} not found`);
        else res.send(car);
      })
      .catch(next);
  })

  .post('/', (req, res, next) => {
    new Car(req.body)
      .save()
      .then(car => res.send(car))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Car.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(car => res.send(car))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Car.findByIdAndRemove(req.params.id)
      .then(response => res.send({ removed: !!response }))
      .catch(next);
  });

module.exports = router;