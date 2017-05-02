const Router = require('express').Router;
const router = Router();
const Banana = require('../models/banana');

router
  .get('/', (req, res, next) => {
    Banana.find()
      .then(bananas => res.send(bananas))
      .catch(next);
  })
  
  .get('/:id', (req, res, next) => {
    const id = req.params.id;
    Banana.findById(id)
      .then(banana => {
        if (!banana) res.status(404).statusMessage(`${id} not found`);
        else res.send(banana);
      })
      .catch(next);
  })
  
  .post('/', (req, res, next) => {
    new Banana(req.body)
      .save()
      .then(banana => res.send(banana))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Banana.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(banana => res.send(banana))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Banana.findByIdAndRemove(req.params.id)
      .then(response => {
        res.send({removed: response ? true : false });
      })
      .catch(next);
  });


module.exports = router;