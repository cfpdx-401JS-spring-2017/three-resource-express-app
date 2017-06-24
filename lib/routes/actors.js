const Router = require('express').Router;
const router = Router();
const Actor = require('../models/actor');

router
    .get('/', (req, res, next) => {
        Actor.find()
            .then(actor => res.send(actor))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const id = req.params.id;
        Actor.findById(id)
            .then(actor => {
                if (!actor) res.status(404).statusMessage(`${id} not found`);
                else res.send(actor);
            })
            .catch(next);
    })

    .post('/', (req, res, next) => {
        new Actor(req.body)
            .save()
            .then(actor => res.send(actor))
            .catch(next);
    })

    .put('/:id', (req, res, next) => {
        Actor.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(actor => res.send(actor))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => { 
        Actor.findByIdAndRemove(req.params.id)
            .then(response => {
                res.send({ removed: response ? true : false });
            })
            .catch(next);
    });


module.exports = router;