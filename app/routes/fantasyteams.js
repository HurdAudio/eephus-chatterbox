'use strict';

const express = require('express');
const knex = require('../../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router();


router.get('/', (req, res, next) => {
  console.log('fantasyteams GET request route');
  knex('fantasyteams')
  .select('*')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next (err);
  });
});

router.get('/:id', (req, res, next) => {
  console.log('fantasyteams GET by ID route');
  knex('fantasyteams')
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
  console.log('We are POSTing to fantasyteams');
  knex('fantasyteams')
  .insert({
    team_name: req.body.team_name,
    owner: req.body.owner,
    catcher: req.body.catcher,
    first_base: req.body.first_base,
    second_base: req.body.second_base,
    third_base: req.body.third_base,
    short_stop: req.body.short_stop,
    outfield_1: req.body.outfield_1,
    outfield_2: req.body.outfield_2,
    outfield_3: req.body.outfield_3,
    util_1: req.body.util_1,
    util_2: req.body.util_2,
    sp_1: req.body.sp_1,
    sp_2: req.body.sp_2,
    rp_1: req.body.rp_1,
    rp_2: req.body.rp_2,
    p_1: req.body.p_1,
    p_2: req.body.p_2,
    p_3: req.body.p_3,
    p_4: req.body.p_4,
    bench_1: req.body.bench_1,
    bench_2: req.body.bench_2,
    bench_3: req.body.bench_3,
    bench_4: req.body.bench_4,
    bench_5: req.body.bench_5,
    dl_1: req.body.dl_1,
    dl_2: req.body.dl_2,
    logo_1: req.body.logo_1,
    logo_2: req.body.logo_2,
    team_color_1: req.body.team_color_1,
    team_color_2: req.body.team_color_2,
    team_color_3: req.body.team_color_3
  }, '*')
  .then((result) => {
    res.status(200).send(result);
  })
  .catch((err) => {
    next(err);
  });
});




router.patch('/:id', (req, res, next) => {
  console.log('PATCH fantasyteam.');
  knex('fantasyteams')
  .where('id', req.params.id)
  .update({
    team_name: req.body.team_name,
    owner: req.body.owner,
    catcher: req.body.catcher,
    first_base: req.body.first_base,
    second_base: req.body.second_base,
    third_base: req.body.third_base,
    short_stop: req.body.short_stop,
    outfield_1: req.body.outfield_1,
    outfield_2: req.body.outfield_2,
    outfield_3: req.body.outfield_3,
    util_1: req.body.util_1,
    util_2: req.body.util_2,
    sp_1: req.body.sp_1,
    sp_2: req.body.sp_2,
    rp_1: req.body.rp_1,
    rp_2: req.body.rp_2,
    p_1: req.body.p_1,
    p_2: req.body.p_2,
    p_3: req.body.p_3,
    p_4: req.body.p_4,
    bench_1: req.body.bench_1,
    bench_2: req.body.bench_2,
    bench_3: req.body.bench_3,
    bench_4: req.body.bench_4,
    bench_5: req.body.bench_5,
    dl_1: req.body.dl_1,
    dl_2: req.body.dl_2,
    logo_1: req.body.logo_1,
    logo_2: req.body.logo_2,
    team_color_1: req.body.team_color_1,
    team_color_2: req.body.team_color_2,
    team_color_3: req.body.team_color_3
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

      knex('fantasyteams')
        .where('id', req.params.id)
        .first()
        .then((row) => {
          if (!row) {
            return next();
          }

          record = row;


          return knex('fantasyteams')
            .del()
            .where('id', req.params.id);
        })
        .then(() => {
          var holder = record.id;
          delete record.id;

          var obj = {
            id: holder,
            team_name: record.team_name,
            owner: record.owner,
            catcher: record.catcher,
            first_base: record.first_base,
            second_base: record.second_base,
            third_base: record.third_base,
            short_stop: record.short_stop,
            outfield_1: record.outfield_1,
            outfield_2: record.outfield_2,
            outfield_3: record.outfield_3,
            util_1: record.util_1,
            util_2: record.util_2,
            sp_1: record.sp_1,
            sp_2: record.sp_2,
            rp_1: record.rp_1,
            rp_2: record.rp_2,
            p_1: record.p_1,
            p_2: record.p_2,
            p_3: record.p_3,
            p_4: record.p_4,
            bench_1: record.bench_1,
            bench_2: record.bench_2,
            bench_3: record.bench_3,
            bench_4: record.bench_4,
            bench_5: record.bench_5,
            dl_1: record.dl_1,
            dl_2: record.dl_2,
            logo_1: record.logo_1,
            logo_2: record.logo_2,
            team_color_1: record.team_color_1,
            team_color_2: record.team_color_2,
            team_color_3: record.team_color_3
          };

          res.send(obj);
        })
        .catch((err) => {
          next(err);
        });
    });




module.exports = router;
