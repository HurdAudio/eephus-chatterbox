'use strict';

const express = require('express');
const knex = require('../../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router();


router.get('/', (req, res, next) => {
  console.log('players GET request route');
  knex('players')
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
  knex('players')
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
  console.log('We are POSTing to players');
  knex('players')
  .insert({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    nickname: req.body.nickname,
    jersey_number: req.body.jersey_number,
    headshot_url: req.body.headshot_url,
    date_of_birth: req.body.date_of_birth,
    place_of_birth: req.body.place_of_birth,
    team_id: req.body.team_id,
    is_rookie: req.body.is_rookie,
    bats_LR: req.body.bats_LR,
    throws_LR: req.body.throws_LR,
    salary: req.body.salary,
    wpa_2016: req.body.wpa_2016,
    eligible_C: req.body.eligible_C,
    eligible_1B: req.body.eligible_1B,
    eligible_2B: req.body.eligible_2B,
    eligible_3B: req.body.eligible_3B,
    eligible_SS: req.body.eligible_SS,
    eligible_OF: req.body.eligible_OF,
    eligible_util: req.body.eligible_util,
    eligible_SP: req.body.eligible_SP,
    eligible_RP: req.body.eligible_RP,
    eligible_P: req.body.eligible_P,
    eligible_bench: req.body.eligible_bench,
    projected_2017_AB: req.body.projected_2017_AB,
    projected_2017_R: req.body.projected_2017_R,
    projected_2017_HR: req.body.projected_2017_HR,
    projected_2017_RBI: req.body.projected_2017_RBI,
    projected_2017_SB: req.body.projected_2017_SB,
    projected_2017_AVG: req.body.projected_2017_AVG,
    projected_2017_OBP: req.body.projected_2017_OBP,
    projected_2017_H: req.body.projected_2017_H,
    projected_2017_2B: req.body.projected_2017_2B,
    projected_2017_3B: req.body.projected_2017_3B,
    projected_2017_walk: req.body.projected_2017_walk,
    projected_2017_SO: req.body.projected_2017_SO,
    projected_2017_SLG: req.body.projected_2017_SLG,
    projected_2017_OPS: req.body.projected_2017_OPS,
    projected_2017_IP: req.body.projected_2017_IP,
    projected_2017_K: req.body.projected_2017_K,
    projected_2017_W: req.body.projected_2017_W,
    projected_2017_L: req.body.projected_2017_L,
    projected_2017_ERA: req.body.projected_2017_ERA,
    projected_2017_WHIP: req.body.projected_2017_WHIP,
    projected_2017_ER: req.body.projected_2017_ER,
    projected_2017_HAllowed: req.body.projected_2017_HAllowed,
    projected_2017_BB: req.body.projected_2017_BB,
    projected_2017_HRAllowed: req.body.projected_2017_HRAllowed,
    projected_2017_G: req.body.projected_2017_G,
    projected_2017_GS: req.body.projected_2017_GS,
    projected_2017_CG: req.body.projected_2017_CG,
    projected_2017_SV: req.body.projected_2017_SV
  }, '*')
  .then((result) => {
    res.status(200).send(result);
  })
  .catch((err) => {
    next(err);
  });
});




router.patch('/:id', (req, res, next) => {
  console.log('PATCH player.');
  knex('players')
  .where('id', req.params.id)
  .update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    nickname: req.body.nickname,
    jersey_number: req.body.jersey_number,
    headshot_url: req.body.headshot_url,
    date_of_birth: req.body.date_of_birth,
    place_of_birth: req.body.place_of_birth,
    team_id: req.body.team_id,
    is_rookie: req.body.is_rookie,
    bats_LR: req.body.bats_LR,
    throws_LR: req.body.throws_LR,
    salary: req.body.salary,
    wpa_2016: req.body.wpa_2016,
    eligible_C: req.body.eligible_C,
    eligible_1B: req.body.eligible_1B,
    eligible_2B: req.body.eligible_2B,
    eligible_3B: req.body.eligible_3B,
    eligible_SS: req.body.eligible_SS,
    eligible_OF: req.body.eligible_OF,
    eligible_util: req.body.eligible_util,
    eligible_SP: req.body.eligible_SP,
    eligible_RP: req.body.eligible_RP,
    eligible_P: req.body.eligible_P,
    eligible_bench: req.body.eligible_bench,
    projected_2017_AB: req.body.projected_2017_AB,
    projected_2017_R: req.body.projected_2017_R,
    projected_2017_HR: req.body.projected_2017_HR,
    projected_2017_RBI: req.body.projected_2017_RBI,
    projected_2017_SB: req.body.projected_2017_SB,
    projected_2017_AVG: req.body.projected_2017_AVG,
    projected_2017_OBP: req.body.projected_2017_OBP,
    projected_2017_H: req.body.projected_2017_H,
    projected_2017_2B: req.body.projected_2017_2B,
    projected_2017_3B: req.body.projected_2017_3B,
    projected_2017_walk: req.body.projected_2017_walk,
    projected_2017_SO: req.body.projected_2017_SO,
    projected_2017_SLG: req.body.projected_2017_SLG,
    projected_2017_OPS: req.body.projected_2017_OPS,
    projected_2017_IP: req.body.projected_2017_IP,
    projected_2017_K: req.body.projected_2017_K,
    projected_2017_W: req.body.projected_2017_W,
    projected_2017_L: req.body.projected_2017_L,
    projected_2017_ERA: req.body.projected_2017_ERA,
    projected_2017_WHIP: req.body.projected_2017_WHIP,
    projected_2017_ER: req.body.projected_2017_ER,
    projected_2017_HAllowed: req.body.projected_2017_HAllowed,
    projected_2017_BB: req.body.projected_2017_BB,
    projected_2017_HRAllowed: req.body.projected_2017_HRAllowed,
    projected_2017_G: req.body.projected_2017_G,
    projected_2017_GS: req.body.projected_2017_GS,
    projected_2017_CG: req.body.projected_2017_CG,
    projected_2017_SV: req.body.projected_2017_SV
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

      knex('players')
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
            first_name: record.first_name,
            last_name: record.last_name,
            nickname: record.nickname,
            jersey_number: record.jersey_number,
            headshot_url: record.headshot_url,
            date_of_birth: record.date_of_birth,
            place_of_birth: record.place_of_birth,
            team_id: record.team_id,
            is_rookie: record.is_rookie,
            bats_LR: record.bats_LR,
            throws_LR: record.throws_LR,
            salary: record.salary,
            wpa_2016: record.wpa_2016,
            eligible_C: record.eligible_C,
            eligible_1B: record.eligible_1B,
            eligible_2B: record.eligible_2B,
            eligible_3B: record.eligible_3B,
            eligible_SS: record.eligible_SS,
            eligible_OF: record.eligible_OF,
            eligible_util: record.eligible_util,
            eligible_SP: record.eligible_SP,
            eligible_RP: record.eligible_RP,
            eligible_P: record.eligible_P,
            eligible_bench: record.eligible_bench,
            projected_2017_AB: record.projected_2017_AB,
            projected_2017_R: record.projected_2017_R,
            projected_2017_HR: record.projected_2017_HR,
            projected_2017_RBI: record.projected_2017_RBI,
            projected_2017_SB: record.projected_2017_SB,
            projected_2017_AVG: record.projected_2017_AVG,
            projected_2017_OBP: record.projected_2017_OBP,
            projected_2017_H: record.projected_2017_H,
            projected_2017_2B: record.projected_2017_2B,
            projected_2017_3B: record.projected_2017_3B,
            projected_2017_walk: record.projected_2017_walk,
            projected_2017_SO: record.projected_2017_SO,
            projected_2017_SLG: record.projected_2017_SLG,
            projected_2017_OPS: record.projected_2017_OPS,
            projected_2017_IP: record.projected_2017_IP,
            projected_2017_K: record.projected_2017_K,
            projected_2017_W: record.projected_2017_W,
            projected_2017_L: record.projected_2017_L,
            projected_2017_ERA: record.projected_2017_ERA,
            projected_2017_WHIP: record.projected_2017_WHIP,
            projected_2017_ER: record.projected_2017_ER,
            projected_2017_HAllowed: record.projected_2017_HAllowed,
            projected_2017_BB: record.projected_2017_BB,
            projected_2017_HRAllowed: record.projected_2017_HRAllowed,
            projected_2017_G: record.projected_2017_G,
            projected_2017_GS: record.projected_2017_GS,
            projected_2017_CG: record.projected_2017_CG,
            projected_2017_SV: record.projected_2017_SV
          };

          res.send(obj);
        })
        .catch((err) => {
          next(err);
        });
    });




module.exports = router;
