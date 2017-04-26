const Router = require('express').Router;
const router = Router();
const Homie = require('../models/homie');

router
    .get('/', (req, res, next) => {
        Homie.find()
            .then(homies => res.send(homies))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const id = req.params.id;
        Homie.findById(id)
            .then(homie => {
                if (!homie) res.status(404).statusMessage(`${id} not found`);
                else res.send(homie);
            })
            .catch(next);
    })

    .post('/', (req, res, next) => {
        new Homie(req.body)
            .save()
            .then(homie => res.send(homie))
            .catch(next);
    })

    .put('/:id', (req, res, next) => {
        Homie.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(homie => res.send(homie))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Homie.findByIdAndRemove(req.params.id)
            .then(response => {
                res.send({ removed: response ? true : false });
            })
            .catch(next);
    });

module.exports = router;