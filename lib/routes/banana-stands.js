const Router = require('express').Router;
const router = Router();


router
  .get('/', (req, res) => {
    res.send([{bananaStand: true}]);
  })
  
  .post('/', (req, res) => {
    res.send({post: 'banana-stand'});
  });


module.exports = router;