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

suite('Test routes for routes/headtoheadmatchups.js', () => {

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

  test('GET /rotisseriematchups should return the associated data with rotisseriematchups.', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/rotisseriematchups')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [{
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
        stats: 'R H HR SB AVG W SV K ERA WHIP',
        created_at: '2017-02-20T19:41:16.000Z',
        updated_at: '2017-02-20T19:41:16.000Z'
    }], done);

      /* eslint-enable max-len */
  });

  test('GET /rotisseriematchups/:id should return the data of a single rotisserie league.', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/rotisseriematchups/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
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
        stats: 'R H HR SB AVG W SV K ERA WHIP',
        created_at: '2017-02-20T19:41:16.000Z',
        updated_at: '2017-02-20T19:41:16.000Z'
      }, done);

      /* eslint-enable max-len */
  });

  test('POST /rotisseriematchups should create a new rotisserie league and return the data associated with it.', (done) => {
  /* eslint-disable max-len */
  request(server)
    .post('/rotisseriematchups')
    .set('Accept', 'application/json')
    .send({
      match_name: 'Wiffleball Club',
      team01: 13,
      team02: 14,
      team03: 9,
      team04: 3,
      team05: 8,
      team06: 1,
      team07: 10,
      team08: 2,
      team09: 7,
      team10: 4,
      team11: 5,
      team12: 6,
      stats: 'R H HR SB AVG W SV K ERA WHIP'
    })
    .expect('Content-Type', /json/)
    .expect((res) => {
      delete res.body.createdAt;
      delete res.body.updatedAt;
    })
    .expect(200, [{
      id: 2,
      match_name: 'Wiffleball Club',
      team01: 13,
      team02: 14,
      team03: 9,
      team04: 3,
      team05: 8,
      team06: 1,
      team07: 10,
      team08: 2,
      team09: 7,
      team10: 4,
      team11: 5,
      team12: 6,
      stats: 'R H HR SB AVG W SV K ERA WHIP'
    }], done);

    /* eslint-enable max-len */
  });

  test('PATCH /rotisseriematchups/:id should update a matchup with new data and return it.', (done) => {
  /* eslint-disable max-len */
  request(server)
    .patch('/rotisseriematchups/2')
    .set('Accept', 'application/json')
    .send({
      match_name: 'Screwballers',
      team01: 13,
      team02: 14,
      team03: 9,
      team04: 3,
      team05: 8,
      team06: 1,
      team07: 10,
      team08: 2,
      team09: 7,
      team10: 4,
      team11: 5,
      team12: 6,
      stats: 'R H HR SB AVG W SV K ERA WHIP'
    })
    .expect('Content-Type', /json/)
    .expect((res) => {
      delete res.body.createdAt;
      delete res.body.updatedAt;
    })
    .expect(200, {
      id: 2,
      match_name: 'Screwballers',
      team01: 13,
      team02: 14,
      team03: 9,
      team04: 3,
      team05: 8,
      team06: 1,
      team07: 10,
      team08: 2,
      team09: 7,
      team10: 4,
      team11: 5,
      team12: 6,
      stats: 'R H HR SB AVG W SV K ERA WHIP'
    }, done);

    /* eslint-enable max-len */
  });

  test('DELETE /rotisseriematchups/:id should delete a rotisserie matchup and return it.', (done) => {
    /* eslint-disable max-len */
    request(server)
      .del('/rotisseriematchups/2')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.createdAt;
        delete res.body.updatedAt;
      })
      .expect(200, {
        id: 2,
        match_name: 'Screwballers',
        team01: 13,
        team02: 14,
        team03: 9,
        team04: 3,
        team05: 8,
        team06: 1,
        team07: 10,
        team08: 2,
        team09: 7,
        team10: 4,
        team11: 5,
        team12: 6,
        stats: 'R H HR SB AVG W SV K ERA WHIP'
      }, done);

      /* eslint-enable max-len */
  });

      /* eslint-enable max-len */
});
