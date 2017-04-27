const Router = require('express').Router;
const router = Router();
const Cow = require('../models/cows');

router
  .get('/', (req, res, next) => {
    Cow.find()
      .then(cows => res.send(cows))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const id = req.params.id;
    Cow.findById(id)
      .then(cow => {
        if (!cow) res.status(404).statusMessage(`${id} not found`);
      })
      .catch(next);
  })

.post('/', (req, res, next) => {
  new Cow(req.body)
    .save()
    .then(cow => res.send(cow))
    .catch(next);
})
  
  .put('/:id', (req, res, next) => {
    Cow.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(cow => res.send(cow))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Cow.findByIdAndRemove(req.params.id)
    .then(response => {
      res.send({remove: response ? true : false});
    })
    .catch(next);
  });

module.exports = router;