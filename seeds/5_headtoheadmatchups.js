'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('headtoheadmatchups').del()
    .then(function () {
      // Inserts seed entries
      // Maintains list of fantasy matchups in head-to-head format
      return knex('headtoheadmatchups').insert([
        {
          id: 1,
          match_name: 'Revenge of the Corkball',
          away_team: 1,
          home_team: 2,
          created_at: new Date('2017-02-20 19:41:16 UTC'),
          updated_at: new Date('2017-02-20 19:41:16 UTC')
        }
      ]);
    }).then(() => {
      return knex.raw("SELECT setval('headtoheadmatchups_id_seq', (SELECT MAX(id) FROM headtoheadmatchups));");
    });
};
