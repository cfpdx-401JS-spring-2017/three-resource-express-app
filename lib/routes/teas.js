const Router = require('express').Router;
const router = Router();
const Tea = require('../models/tea');

router
    .get('/', (req, res, next) => {
        Tea.find()
            .then(teas => res.send(teas))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const id = req.params.id;
        Tea.findById(id)
            .then(tea => {
                if (!tea) res.status(404).statusMessage(`${id} not found`);
                else res.send(tea);
            })
            .catch(next);
    })

    .post('/', (req, res, next) => {
        new Tea(req.body)
            .save()
            .then(tea => res.send(tea))
            .catch(next);
    })

    .put('/:id', (req, res, next) => {
        delete req.body._id;
        Tea.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(tea => res.send(tea))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Tea.findByIdAndRemove(req.params.id)
            .then(response => {
                res.send({ removed: !!response });
            })
            .catch(next);
    });

module.exports = router;