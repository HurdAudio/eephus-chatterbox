'use strict';

const express = require('express');
const knex = require('../../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router();


router.get('/', (req, res, next) => {
  console.log('teams GET request route');
  knex('teams')
  .select('*')
  .orderBy('id')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next (err);
  });
});

router.get('/:id', (req, res, next) => {
  console.log('teams GET by ID route');
  knex('teams')
    .select()
    .where('id', req.params.id)
    .first()
    .then((team) => {
      if (!team) {
        return next();
      }

      res.send(team);
    })
    .catch((err) => {
      next(err);
    });
});




router.patch('/:id', (req, res, next) => {
  console.log('We are re-naming a stadium.');
  console.log(req.body.stadium_name);
  knex('teams')
  .update({
      stadium_name: req.body.stadium_name
    }, '*')
    .where('id', req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next(err);
    });
});




module.exports = router;
