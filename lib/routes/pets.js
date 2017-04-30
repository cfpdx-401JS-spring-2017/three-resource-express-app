const Router = require('express').Router;
const router = Router();
const Pet = require('../models/pet');

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
        else res.send(pet);
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
        res.send({removed: response ? true : false });
      })
      .catch(next);
  });


module.exports = router;