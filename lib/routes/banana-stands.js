const Router = require('express').Router;
const router = Router();
const BananaStand = require('../models/banana-stand');


router
  .get('/', (req, res, next) => {
    BananaStand.find()
      .then(bananaStands => res.send(bananaStands))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const id = req.params.id;
    BananaStand.findById(id)
      .then(bananaStand => {
        if (!bananaStand) res.status(404).statusMessage(`${id} not found`);
        else res.send(bananaStand);
      })
      .catch(next);
  });


module.exports = router;