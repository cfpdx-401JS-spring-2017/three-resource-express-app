const Router = require('express').Router;
const router = Router();
const Cat = require('../models/cat');

router
  .get('/', (req, res, next) => {
    Cat.find()
      .then(cats => res.send(cats))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Cat.findById(req.params.id)
      .then(cat => {
        if (!cat) res.status(404).send(`${req.params.id} not found`);
        else res.send(cat);
      })
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Cat.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(updated => res.send(updated))
      .catch(next);
  })

  .post('/', (req, res, next) => {
    new Cat(req.body)
      .save()
      .then(cat => res.send(cat))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Cat.findByIdAndRemove(req.params.id)
      .then(response => res.send({ removed: !!response }))
      .catch(next);
  });

module.exports = router;


