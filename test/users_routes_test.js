'use strict';

process.env.NODE_ENV = 'test';


const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../app/server');
// const teams = require('../app/routes/teams');


suite('Client side should serve up index.html.', () => {

  test('GET /index.html', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done);

      /* eslint-enable max-len */
  });

});

suite('Test routes for routes/users.js', () => {

  before((done) => {
  knex.migrate.latest()
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
  });

  beforeEach((done) => {
    knex.seed.run()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('GET /users should return the id, name, email, hashed_password, is_admin, first_favorite_team, second_favorite_team, third_favorite_team, division, manager, general_manager, stadium_name, stadium_image_url, fourth_favorite_team, fifth_favorite_team, first_least_favorite_team, second_least_favorite_team, third_least_favorite_team, fourth_least_favorite_team, fifth_least_favorite_team, created_at, and updated_at of all users.', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [{
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
        created_at: '2017-02-19T14:42:16.000Z',
        updated_at: '2016-02-19T14:42:16.000Z'
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
        created_at: '2017-02-19T14:47:16.000Z',
        updated_at: '2016-02-19T14:47:16.000Z'
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
        created_at: '2017-02-19T14:55:16.000Z',
        updated_at: '2016-02-19T14:55:16.000Z'
      }], done);

      /* eslint-enable max-len */
  });

  test('GET /users/:id should return the id, name, email, hashed_password, is_admin, first_favorite_team, second_favorite_team, third_favorite_team, division, manager, general_manager, stadium_name, stadium_image_url, fourth_favorite_team, fifth_favorite_team, first_least_favorite_team, second_least_favorite_team, third_least_favorite_team, fourth_least_favorite_team, fifth_least_favorite_team, created_at, and updated_at of a single user.', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/users/3')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
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
        created_at: '2017-02-19T14:55:16.000Z',
        updated_at: '2016-02-19T14:55:16.000Z'
      }, done);

      /* eslint-enable max-len */
  });

  test('POST /users should create a new user and return the id, name, email, hashed_password, is_admin, first_favorite_team, second_favorite_team, third_favorite_team, fourth_favorite_team, fifth_favorite_team, first_least_favorite_team, second_least_favorite_team, third_least_favorite_team, fourth_least_favorite_team, and fifth_least_favorite_team that were created.', (done) => {
  /* eslint-disable max-len */
  request(server)
    .post('/users')
    .set('Accept', 'application/json')
    .send({
      name:'Mordicai Three-finger Brown',
      email: 'splitfinger@hof.com',
      hashed_password: '$2a$12$LWCzHk6ewBXX7MrxXGdRMOhV2S8vkBinIv3rTNyItp1nRAznxEp7W',
      is_admin: false,
      first_favorite_team: 1,
      second_favorite_team: 21,
      third_favorite_team: 19,
      fourth_favorite_team: 3,
      fifth_favorite_team: 28,
      first_least_favorite_team: 8,
      second_least_favorite_team: 7,
      third_least_favorite_team: 9,
      fourth_least_favorite_team: 16,
      fifth_least_favorite_team: 2
    })
    .expect('Content-Type', /json/)
    .expect((res) => {
      delete res.body.createdAt;
      delete res.body.updatedAt;
    })
    .expect(200, [{
      id: 4,
      name:'Mordicai Three-finger Brown',
      email: 'splitfinger@hof.com',
      hashed_password: '$2a$12$LWCzHk6ewBXX7MrxXGdRMOhV2S8vkBinIv3rTNyItp1nRAznxEp7W',
      is_admin: false,
      first_favorite_team: 1,
      second_favorite_team: 21,
      third_favorite_team: 19,
      fourth_favorite_team: 3,
      fifth_favorite_team: 28,
      first_least_favorite_team: 8,
      second_least_favorite_team: 7,
      third_least_favorite_team: 9,
      fourth_least_favorite_team: 16,
      fifth_least_favorite_team: 2
    }], done);

    /* eslint-enable max-len */
  });

  // test('PATCH /users/:id should update a user and return the user that was updated.', (done) => {
  // /* eslint-disable max-len */
  // request(server)
  //   .patch('/users/4')
  //   .set('Accept', 'application/json')
  //   .send({
  //     name:'Mordicai Three-finger Brown',
  //     email: 'splitfinger@hof.com',
  //     hashed_password: '$2a$12$LWCzHk6ewBXX7MrxXGdRMOhV2S8vkBinIv3rTNyItp1nRAznxEp7W',
  //     is_admin: false,
  //     first_favorite_team: 1,
  //     second_favorite_team: 21,
  //     third_favorite_team: 14,
  //     fourth_favorite_team: 3,
  //     fifth_favorite_team: 28,
  //     first_least_favorite_team: 11,
  //     second_least_favorite_team: 7,
  //     third_least_favorite_team: 9,
  //     fourth_least_favorite_team: 16,
  //     fifth_least_favorite_team: 2
  //   })
  //   .expect('Content-Type', /json/)
  //   .expect((res) => {
  //     delete res.body.createdAt;
  //     delete res.body.updatedAt;
  //   })
  //   .expect(200, {
  //     id: 4,
  //     name:'Mordicai Three-finger Brown',
  //     email: 'splitfinger@hof.com',
  //     hashed_password: '$2a$12$LWCzHk6ewBXX7MrxXGdRMOhV2S8vkBinIv3rTNyItp1nRAznxEp7W',
  //     is_admin: false,
  //     first_favorite_team: 1,
  //     second_favorite_team: 21,
  //     third_favorite_team: 14,
  //     fourth_favorite_team: 3,
  //     fifth_favorite_team: 28,
  //     first_least_favorite_team: 11,
  //     second_least_favorite_team: 7,
  //     third_least_favorite_team: 9,
  //     fourth_least_favorite_team: 16,
  //     fifth_least_favorite_team: 2
  //   }, done);
  //
  //   /* eslint-enable max-len */
  // });
  //
  // test('DELETE /users/:id should delete a user and return the id, name, email, hashed_password, is_admin, first_favorite_team, second_favorite_team, third_favorite_team, fourth_favorite_team, fifth_favorite_team, first_least_favorite_team, second_least_favorite_team, third_least_favorite_team, fourth_least_favorite_team and fifth_least_favorite_team that were deleted.', (done) => {
  //   /* eslint-disable max-len */
  //   request(server)
  //     .del('/users/4')
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect((res) => {
  //       delete res.body.createdAt;
  //       delete res.body.updatedAt;
  //     })
  //     .expect(200, {
  //       id: 4,
  //       name:'Mordicai Three-finger Brown',
  //       email: 'splitfinger@hof.com',
  //       hashed_password: '$2a$12$LWCzHk6ewBXX7MrxXGdRMOhV2S8vkBinIv3rTNyItp1nRAznxEp7W',
  //       is_admin: false,
  //       first_favorite_team: 1,
  //       second_favorite_team: 21,
  //       third_favorite_team: 14,
  //       fourth_favorite_team: 3,
  //       fifth_favorite_team: 28,
  //       first_least_favorite_team: 11,
  //       second_least_favorite_team: 7,
  //       third_least_favorite_team: 9,
  //       fourth_least_favorite_team: 16,
  //       fifth_least_favorite_team: 2
  //     }, done);
  //
  //     /* eslint-enable max-len */
  // });

      /* eslint-enable max-len */
});
