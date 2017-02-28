'use strict';

const express = require('express');
const knex = require('../../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router();


router.get('/', (req, res, next) => {
  console.log('users GET request route');
  knex('users')
  .select('*')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next (err);
  });
});

router.get('/:id', (req, res, next) => {
  console.log('users GET by ID route');
  knex('users')
    .select()
    .where('id', req.params.id)
    .first()
    .then((user) => {
      if (!user) {
        return next();
      }

      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/', (req, res, next) => {
  console.log('We are POSTing to users');
  knex('users')
  .insert({
    name: req.body.name,
    email: req.body.email,
    hashed_password: req.body.hashed_password,
    is_admin: req.body.is_admin,
    first_favorite_team: req.body.first_favorite_team,
    second_favorite_team: req.body.second_favorite_team,
    third_favorite_team: req.body.third_favorite_team,
    fourth_favorite_team: req.body.fourth_favorite_team,
    fifth_favorite_team: req.body.fifth_favorite_team,
    first_least_favorite_team: req.body.first_least_favorite_team,
    second_least_favorite_team: req.body.second_least_favorite_team,
    third_least_favorite_team: req.body.third_least_favorite_team,
    fourth_least_favorite_team: req.body.fourth_least_favorite_team,
    fifth_least_favorite_team: req.body.fifth_least_favorite_team
  }, ['id', 'name', 'email', 'hashed_password', 'is_admin', 'first_favorite_team', 'second_favorite_team', 'third_favorite_team', 'fourth_favorite_team', 'fifth_favorite_team', 'first_least_favorite_team', 'second_least_favorite_team', 'third_least_favorite_team', 'fourth_least_favorite_team', 'fifth_least_favorite_team'])
  .then((result) => {
    res.status(200).send(result);
  })
  .catch((err) => {
    next(err);
  });
});




router.patch('/:id', (req, res, next) => {
  console.log('PATCH user.');
  knex('users')
  .where('id', req.params.id)
  .update({
    name: req.body.name,
    email: req.body.email,
    hashed_password: req.body.hashed_password,
    is_admin: req.body.is_admin,
    first_favorite_team: req.body.first_favorite_team,
    second_favorite_team: req.body.second_favorite_team,
    third_favorite_team: req.body.third_favorite_team,
    fourth_favorite_team: req.body.fourth_favorite_team,
    fifth_favorite_team: req.body.fifth_favorite_team,
    first_least_favorite_team: req.body.first_least_favorite_team,
    second_least_favorite_team: req.body.second_least_favorite_team,
    third_least_favorite_team: req.body.third_least_favorite_team,
    fourth_least_favorite_team: req.body.fourth_least_favorite_team,
    fifth_least_favorite_team: req.body.fifth_least_favorite_team
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

      knex('users')
        .where('id', req.params.id)
        .first()
        .then((row) => {
          if (!row) {
            return next();
          }

          record = row;


          return knex('users')
            .del()
            .where('id', req.params.id);
        })
        .then(() => {
          var holder = record.id;
          delete record.id;

          var obj = {
            id: holder,
            name: record.name,
            email: record.email,
            hashed_password: record.hashed_password,
            first_favorite_team: record.first_favorite_team,
            second_favorite_team: record.second_favorite_team,
            third_favorite_team: record.third_favorite_team,
            fourth_favorite_team: record.fourth_favorite_team,
            fifth_favorite_team: record.fifth_favorite_team,
            first_least_favorite_team: record.first_least_favorite_team,
            second_least_favorite_team: record.second_least_favorite_team,
            third_least_favorite_team: record.third_least_favorite_team,
            fourth_least_favorite_team: record.fourth_least_favorite_team,
            fifth_least_favorite_team: record.fifth_least_favorite_team
          };

          res.send(obj);
        })
        .catch((err) => {
          next(err);
        });
    });




module.exports = router;
