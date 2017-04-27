const Router = require('express').Router;
const router = Router();
const Coffee = require('../models/coffee');

router.get('/', (req, res, next) => {
  Coffee.find()
    .then(coffees => res.send(coffees))
    .catch(next);
})

  .get('/:id', (req, res, next) => {
    const id = req.params.id;
    Coffee.findById(id)
      .then(coffee => {
        if (!coffee) res.status(404).statusMessage(`${id} not found`);
        else res.send(coffee);
      })
      .catch(next);
  })

  .post('/', (req, res, next) => {
    new Coffee(req.body)
      .save()
      .then(coffee => res.send(coffee))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    delete req.body._id;
    Coffee.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(coffee => res.send(coffee))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Coffee.findByIdAndRemove(req.params.id)
      .then(response => {
        res.send({ removed: response ? true : false });
      })
      .catch(next);
  });

module.exports = router;