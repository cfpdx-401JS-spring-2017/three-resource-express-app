const Router = require('express').Router;
const router = Router();
const Cafe = require('../models/cafe');

router.get('/', (req, res, next) => {
  Cafe.find()
    .then(cafes => res.send(cafes))
    .catch(next);
})

  .post('/', (req, res, next) => {
    new Cafe(req.body)
      .save()
      .then(cafe => res.send(cafe))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const id = req.params.id;
    Cafe.findById(id)
    .then(cafe => {
      if (!cafe) res.status(404).statusMessage(`${id} not found`);
      else res.send(cafe);
    })
    .catch(next);
  })

  .put('/:id', (req, res, next) => {
    // delete req.body._id;
    Cafe.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(cafe => res.send(cafe))
      .catch(next);
  });

module.exports = router;