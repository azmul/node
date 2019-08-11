const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');

const courses = [
    {id:1, name: 'Courses1'},
    {id:2, name: 'Courses2'},
    {id:3, name: 'Courses3'},
]

router.get('/', (req, res) => {
    res.send(courses);
  })
  
  router.get('/:id', (req, res) => {
    const course = courses.find( course => course.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given id was not found');
    res.send(course);
  })
  
  router.get('/:year/:month', (req, res) => {
    res.send(req.params);
  })
  
  // IF user give query params
  // /api/posts/56/6?name=azmul&roll=1234&dep=cse
//   router.get('/api/posts/:year/:month', (req, res) => {
//       res.send(req.query);
//   })
  
  router.post('/', (req, res) => {
      const schema = {
          name: Joi.string().alphanum().min(3).max(30).required(),
      }
      const {error, value} = Joi.validate(req.body, schema);
      if (error) return res.status(400).send(error.details[0].message);
      const course = {
          id: courses.length + 1,
          name: req.body.name
      }
      courses.push(course);
      res.send(course);
  })
  
  router.put('/:id', (req, res) => {
      const course = courses.find(course => course.id === parseInt(req.params.id))
      if (!course) res.status(404).send('The course with the given id was not found');
  
      const schema = {
          name: Joi.string().alphanum().min(3).max(30).required(),
      }
      const {error, value} = Joi.validate(req.body, schema);
      if (error) return res.status(400).send(error.details[0].message);
          
      course.name = req.body.name;
      res.send(course);
  })
  
  router.delete('/:id', (req, res) => {
      const course = courses.find(course => course.id === parseInt(req.params.id))
      if (!course) return res.status(404).send('The course with the given id was not found');
  
      const index = courses.indexOf(course);
      courses.splice(index, 1);
  
      res.send(course);
  })

  module.exports = router;