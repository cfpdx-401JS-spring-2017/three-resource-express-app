const Router = require('express').Router;
const router = Router();
const Cousin = require('../models/cousin');

router
    .get('/', (req, res, next) => {
        Cousin.find()
            .then(cousin => res.send(cousin))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const id = req.params.id;
        Cousin.findById(id)
            .then(cousin => {
                if (!cousin) res.status(404).statusMessage(`${id} not found`);
                else res.send(cousin);
            })
            .catch(next);
    })

    .post('/', (req, res, next) => {
        new Cousin(req.body)
            .save()
            .then(cousin => res.send(cousin))
            .catch(next);
    })

    .put('/:id', (req, res, next) => {
        Cousin.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(cousin => res.send(cousin))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Cousin.findByIdAndRemove(req.params.id)
            .then(response => {
                res.send({ removed: response ? true : false });
            })
            .catch(next);
    });

module.exports = router;