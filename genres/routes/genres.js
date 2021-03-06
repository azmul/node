const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const { Genre } = require('../models/genre');

  router.get('/',async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
  })

  router.post('/', auth, async (req, res) => {
      const schema = {
          name: Joi.string().alphanum().min(3).max(30).required(),
      }
      const {error, value} = Joi.validate(req.body, schema);
      if (error) return res.status(400).send(error.details[0].message);
      let genre = new Genre({name: req.body.name});
      genre = await genre.save()
      res.send(genre);
  })

  router.put('/:id', auth, async (req, res) => {
    const schema = {
        name: Joi.string().alphanum().min(3).max(30).required(),
    }
    const {error, value} = Joi.validate(req.body, schema);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name})
    if (!genre) res.status(404).send('The genre with the given id was not found');

    res.send(genre);
  })
  
  router.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given id was not found');

    res.send(genre);
  })

  router.get('/:id', auth, async (req, res) => {
    const genre = await Genre.findById(req.params.id)
    if (!genre) return res.status(404).send('The genre with the given id was not found');
    
    res.send(genre);
  })

  module.exports = router;