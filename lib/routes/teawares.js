const Router = require('express').Router;
const router = Router();
const Teaware = require('../models/teaware');

router
    .get('/', (req, res, next) => {
        Teaware.find()
            .then(teawares => res.send(teawares))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const id = req.params.id;
        Teaware.findById(id)
            .then(teaware => {
                if (!teaware) res.status(404).statusMessage(`${id} not found`);
                else res.send(teaware);
            })
            .catch(next);
    })

    .post('/', (req, res, next) => {
        new Teaware(req.body)
            .save()
            .then(teaware => res.send(teaware))
            .catch(next);
    })

    .put('/:id', (req, res, next) => {
        delete req.body._id;
        Teaware.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(teaware => res.send(teaware))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Teaware.findByIdAndRemove(req.params.id)
            .then(response => {
                res.send({ removed: !!response });
            })
            .catch(next);
    });

module.exports = router;