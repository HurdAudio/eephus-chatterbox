'use strict';

const express = require('express');
const knex = require('../../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router();


router.get('/', (req, res, next) => {
  console.log('headtoheadmatchups GET request route');
  knex('headtoheadmatchups')
  .select('*')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next (err);
  });
});

router.get('/:id', (req, res, next) => {
  console.log('headtoheadmatchups GET by ID route');
  knex('headtoheadmatchups')
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
  console.log('We are POSTing to headtoheadmatchups');
  knex('headtoheadmatchups')
  .insert({
    match_name: req.body.match_name,
    away_team:req.body.away_team,
    home_team: req.body.home_team,
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
  console.log('PATCH headtoheadmatchups.');
  knex('headtoheadmatchups')
  .where('id', req.params.id)
  .update({
    match_name: req.body.match_name,
    away_team:req.body.away_team,
    home_team: req.body.home_team,
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

      knex('headtoheadmatchups')
        .where('id', req.params.id)
        .first()
        .then((row) => {
          if (!row) {
            return next();
          }

          record = row;


          return knex('headtoheadmatchups')
            .del()
            .where('id', req.params.id);
        })
        .then(() => {
          var holder = record.id;
          delete record.id;

          var obj = {
            id: holder,
            match_name: record.match_name,
            away_team:record.away_team,
            home_team: record.home_team,
            stats: record.stats
          };

          res.send(obj);
        })
        .catch((err) => {
          next(err);
        });
    });




module.exports = router;
