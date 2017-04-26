const Router = require('express').Router;
const router = Router();
const Musician = require('../models/musician');

router
    .get('/', (req, res, next) => {
        Musician.find()
            .then(musician => res.send(musician))
            .catch(next);
    });

module.exports = router;