const Router = require('express').Router;
const router = Router();
const Film = require('../models/film');

router
    .get('/', (req, res, next) => {
        Film.find()
            .then(film => res.send(film))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const id = req.params.id;
        Film.findById(id)
            .then(film => {
                if (!film) res.status(404).statusMessage(`${id} not found`);
                else res.send(film);
            })
            .catch(next);
    })

    .post('/', (req, res, next) => {
        new Film(req.body)
            .save()
            .then(film => res.send(film))
            .catch(next);
    })

    .put('/:id', (req, res, next) => {
        Film.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(film => res.send(film))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => { 
        Film.findByIdAndRemove(req.params.id)
            .then(response => {
                res.send({ removed: response ? true : false });
            })
            .catch(next);
    });


module.exports = router;