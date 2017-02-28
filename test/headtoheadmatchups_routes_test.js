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

  test('GET /headtoheadmatchups should return the associated data with headtoheadmatchups.', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/headtoheadmatchups')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [{
        id: 1,
        match_name: 'Revenge of the Corkball',
        away_team: 1,
        home_team: 2,
        created_at: '2017-02-20T19:41:16.000Z',
        updated_at: '2017-02-20T19:41:16.000Z'
    }], done);

      /* eslint-enable max-len */
  });

  test('GET /headtoheadmatchups/:id should return the data of a single head to head matchup.', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/headtoheadmatchups/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        id: 1,
        match_name: 'Revenge of the Corkball',
        away_team: 1,
        home_team: 2,
        created_at: '2017-02-20T19:41:16.000Z',
        updated_at: '2017-02-20T19:41:16.000Z'
      }, done);

      /* eslint-enable max-len */
  });

  test('POST /headtoheadmatchups should create a new fantasy team and return the data associated with that match up.', (done) => {
  /* eslint-disable max-len */
  request(server)
    .post('/headtoheadmatchups')
    .set('Accept', 'application/json')
    .send({
      match_name: 'Can of Corn',
      away_team: 5,
      home_team: 7,
      stats: 'R H HR SB AVG W SV K ERA WHIP'
    })
    .expect('Content-Type', /json/)
    .expect((res) => {
      delete res.body.createdAt;
      delete res.body.updatedAt;
    })
    .expect(200, [{
      id: 2,
      match_name: 'Can of Corn',
      away_team: 5,
      home_team: 7,
      stats: 'R H HR SB AVG W SV K ERA WHIP'
    }], done);

    /* eslint-enable max-len */
  });

  test('PATCH /headtoheadmatchups/:id should update a matchup with new data and return it.', (done) => {
  /* eslint-disable max-len */
  request(server)
    .patch('/headtoheadmatchups/2')
    .set('Accept', 'application/json')
    .send({
      match_name: 'Spitballers of Galvanize',
      away_team: 5,
      home_team: 7,
      stats: 'R H HR SB AVG W SV K ERA WHIP'
    })
    .expect('Content-Type', /json/)
    .expect((res) => {
      delete res.body.createdAt;
      delete res.body.updatedAt;
    })
    .expect(200, {
      id: 2,
      match_name: 'Spitballers of Galvanize',
      away_team: 5,
      home_team: 7,
      stats: 'R H HR SB AVG W SV K ERA WHIP'
    }, done);

    /* eslint-enable max-len */
  });

  test('DELETE /headtoheadmatchups/:id should delete a head to head matchup and return it.', (done) => {
    /* eslint-disable max-len */
    request(server)
      .del('/headtoheadmatchups/2')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.createdAt;
        delete res.body.updatedAt;
      })
      .expect(200, {
        id: 2,
        match_name: 'Spitballers of Galvanize',
        away_team: 5,
        home_team: 7
      }, done);

      /* eslint-enable max-len */
  });

      /* eslint-enable max-len */
});
