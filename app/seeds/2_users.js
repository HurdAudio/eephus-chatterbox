'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      // User accounts
      return knex('users').insert([
        {
          id: 1,
          name: 'Eephus Chatterbox',
          email: 'cia_pope@yahoo.com',
          hashed_password: '$2a$12$tKEnQGr1Bi/jzSqYf59N4u8z.vy1usLr1ajySmkma4PorNe.0SlvW',
          is_admin: true,
          first_favorite_team: 27,
          second_favorite_team: 10,
          third_favorite_team: 1,
          fourth_favorite_team: 16,
          fifth_favorite_team: 30,
          first_least_favorite_team: 22,
          second_least_favorite_team: 8,
          third_least_favorite_team: 28,
          fourth_least_favorite_team: 7,
          fifth_least_favorite_team: 29,
          created_at: new Date('2017-02-19 14:42:16 UTC'),
          updated_at: new Date('2016-02-19 14:42:16 UTC')
        },
        {
          id: 2,
          name: 'Devin Hurd',
          email: 'hurdaudio@gmail.com',
          hashed_password: '$2a$12$tKEnQGr1Bi/jzSqYf59N4u8z.vy1usLr1ajySmkma4PorNe.0SlvW',
          is_admin: true,
          first_favorite_team: 14,
          second_favorite_team: 5,
          third_favorite_team: 24,
          fourth_favorite_team: 10,
          fifth_favorite_team: 12,
          first_least_favorite_team: 11,
          second_least_favorite_team: 21,
          third_least_favorite_team: 15,
          fourth_least_favorite_team: 8,
          fifth_least_favorite_team: 26,
          created_at: new Date('2017-02-19 14:47:16 UTC'),
          updated_at: new Date('2016-02-19 14:47:16 UTC')
        },
        {
          id: 3,
          name: 'Ty Cobb',
          email: 'ty.cobb@hof.com',
          hashed_password: '$2a$12$LWCzHk6ewBXX7MrxXGdRMOhV2S8vkBinIv3rTNyItp1nRAznxEp7W',
          is_admin: false,
          first_favorite_team: 19,
          second_favorite_team: null,
          third_favorite_team: null,
          fourth_favorite_team: null,
          fifth_favorite_team: null,
          first_least_favorite_team: 30,
          second_least_favorite_team: null,
          third_least_favorite_team: null,
          fourth_least_favorite_team: null,
          fifth_least_favorite_team: null,
          created_at: new Date('2017-02-19 14:55:16 UTC'),
          updated_at: new Date('2016-02-19 14:55:16 UTC')
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));");
    });
};
