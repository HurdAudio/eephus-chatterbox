'use strict';

const express = require('express');
const knex = require('../../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router();


router.get('/', (req, res, next) => {
  console.log('rotisseriematchups GET request route');
  knex('rotisseriematchups')
  .select('*')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next (err);
  });
});

router.get('/:id', (req, res, next) => {
  console.log('rotisseriematchups GET by ID route');
  knex('rotisseriematchups')
    .select()
    .where('id', req.params.id)
    .first()
    .then((matchup) => {
      if (!matchup) {
        return next();
      }

      res.send(matchup);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/', (req, res, next) => {
  console.log('We are POSTing to rotisseriematchups');
  knex('rotisseriematchups')
  .insert({
    match_name: req.body.match_name,
    team01: req.body.team01,
    team02: req.body.team02,
    team03: req.body.team03,
    team04: req.body.team04,
    team05: req.body.team05,
    team06: req.body.team06,
    team07: req.body.team07,
    team08: req.body.team08,
    team09: req.body.team09,
    team10: req.body.team10,
    team11: req.body.team11,
    team12: req.body.team12,
    stats: req.body.stats
  }, '*')
  .then((result) => {
    res.status(200).send(result);
  })
  .catch((err) => {
    next(err);
  });
});




router.patch('/:id', (req, res, next) => {
  console.log('PATCH rotisseriematchups.');
  knex('rotisseriematchups')
  .where('id', req.params.id)
  .update({
    match_name: req.body.match_name,
    team01: req.body.team01,
    team02: req.body.team02,
    team03: req.body.team03,
    team04: req.body.team04,
    team05: req.body.team05,
    team06: req.body.team06,
    team07: req.body.team07,
    team08: req.body.team08,
    team09: req.body.team09,
    team10: req.body.team10,
    team11: req.body.team11,
    team12: req.body.team12,
    stats: req.body.stats
  }, '*')
    .then((results)=>{
       res.status(200).send(results[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/:id', (req, res, next) => {
    let record;

      knex('rotisseriematchups')
        .where('id', req.params.id)
        .first()
        .then((row) => {
          if (!row) {
            return next();
          }

          record = row;


          return knex('rotisseriematchups')
            .del()
            .where('id', req.params.id);
        })
        .then(() => {
          var holder = record.id;
          delete record.id;

          var obj = {
            id: holder,
            match_name: record.match_name,
            team01: record.team01,
            team02: record.team02,
            team03: record.team03,
            team04: record.team04,
            team05: record.team05,
            team06: record.team06,
            team07: record.team07,
            team08: record.team08,
            team09: record.team09,
            team10: record.team10,
            team11: record.team11,
            team12: record.team12,
            stats: record.stats
          };

          res.send(obj);
        })
        .catch((err) => {
          next(err);
        });
    });




module.exports = router;
