const Router = require('express').Router;
const router = Router();
const Pet = require('../models/pets');

router
  .get('/', (req, res, next) => {
    Pet.find()
      .then(pets => res.send(pets))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const id = req.params.id;
    Pet.findById(id)
      .then(pet => {
        if (!pet) res.status(404).statusMessage(`${id} not found`);
      })
      .catch(next);
  })

.post('/', (req, res, next) => {
  new Pet(req.body)
    .save()
    .then(pet => res.send(pet))
    .catch(next);
})
  
  .put('/:id', (req, res, next) => {
    Pet.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(pet => res.send(pet))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Pet.findByIdAndRemove(req.params.id)
    .then(response => {
      res.send({remove: response ? true : false});
    })
    .catch(next);
  });

module.exports = router;
