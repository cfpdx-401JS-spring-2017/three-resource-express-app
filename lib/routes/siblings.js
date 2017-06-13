const Router = require('express').Router;
const router = Router();
const Sibling = require('../models/sibling');

router
    .get('/', (req, res, next) => {
        Sibling.find()
            .then(siblings => res.send(siblings))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const id = req.params.id;
        Sibling.findById(id)
            .then(sibling => {
                if (!sibling) res.status(404).statusMessage(`${id} not found`);
                else res.send(sibling);
            })
            .catch(next);
    })

    .post('/', (req, res, next) => {
        new Sibling(req.body)
            .save()
            .then(sibling => res.send(sibling))
            .catch(next);
    })

    .put('/:id', (req, res, next) => {
        Sibling.findByIdAndUpdate(req.params.id, req.body, { new: true }) //findByIDAndUpdate requires new:true
            .then(sibling => res.send(sibling))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Sibling.findByIdAndRemove(req.params.id)
            .then(response => {
                res.send({ removed: response ? true : false });
            })
            .catch(next);
    });

module.exports = router;