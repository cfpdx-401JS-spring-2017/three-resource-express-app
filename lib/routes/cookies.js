const Router = require('express').Router;
const router = Router();
const Cookie = require('../models/cookies');

router.get('/', (req, res, next) => {
  Cookie.find()
    .then(cookies => res.send(cookies))
    .catch(next);
})

  .get('/:id', (req, res, next) => {
    const id = req.params.id;
    Cookie.findById(id)
      .then(cookie => {
        if (!cookie) res.status(404).statusMessage(`${id} not found`);
        else res.send(cookie);
      })
      .catch(next);
  })

  .post('/', (req, res, next) => {
    new Cookie(req.body)
      .save()
      .then(cookie => res.send(cookie))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Cookie.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(cookie => res.send(cookie))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Cookie.findByIdAndRemove(req.params.id)
      .then(response => {
        res.send({ removed: response ? true : false });
      })
      .catch(next);
  });

module.exports = router;