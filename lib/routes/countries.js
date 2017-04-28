const Router = require('express').Router;
const router = Router();
const Country = require('../models/country');

router
    .get('/', (req, res, next) => {
        Country.find()
            .then(countries => res.send(countries))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const id = req.params.id;
        Country.findById(id)
            .then(country => {
                if (!country) res.status(404).statusMessage(`${id} not found`);
                else res.send(country);
            })
            .catch(next);
    })

    .post('/', (req, res, next) => {
        new Country(req.body)
            .save()
            .then(country => res.send(country))
            .catch(next);
    })

    .put('/:id', (req, res, next) => {
        delete req.body._id;
        Country.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(country => res.send(country))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Country.findByIdAndRemove(req.params.id)
            .then(response => {
                res.send({ removed: !!response });
            })
            .catch(next);
    });

module.exports = router;