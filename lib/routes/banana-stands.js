const Router = require('express').Router;
const router = Router();
const BananaStand = require('../models/banana-stand');


router
  .get('/', (req, res, next) => {
    BananaStand.find()
      .then(bananaStands => res.send(bananaStands))
      .catch(next);
  });
  
  // .post('/', (req, res) => {
  //   res.send({post: 'banana-stand'});
  // });


module.exports = router;