'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rotisseriematchups').del()
    .then(function () {
      // Inserts seed entries
      return knex('rotisseriematchups').insert([
        {
          id: 1,
          match_name: 'Forkballers League',
          team01: 3,
          team02: 4,
          team03: 5,
          team04: 6,
          team05: 7,
          team06: 8,
          team07: 9,
          team08: 10,
          team09: 11,
          team10: 12,
          team11: 13,
          team12: 14,
          created_at: new Date('2017-02-20 19:41:16 UTC'),
          updated_at: new Date('2017-02-20 19:41:16 UTC')
        }
      ]);
    }).then(() => {
      return knex.raw("SELECT setval('rotisseriematchups_id_seq', (SELECT MAX(id) FROM rotisseriematchups));");
    });
};
