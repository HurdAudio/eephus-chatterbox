'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require('knex');
const request = require('request');
const app = express();
const teams = require('./routes/teams.js');
const users = require('./routes/users.js');
const players = require('./routes/players.js');
const fantasyteams = require('./routes/fantasyteams.js');
const headtoheadmatchups = require('./routes/headtoheadmatchups.js');
const rotisseriematchups = require('./routes/rotisseriematchups.js');

// const messages = require('./routes/classifieds');
const port = process.env.PORT || 3007;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/../', 'node_modules')));

// app.use('/classifieds',messages);

app.use('/teams', teams);
app.use('/users', users);
app.use('/players', players);
app.use('/fantasyteams', fantasyteams);
app.use('/headtoheadmatchups', headtoheadmatchups);
app.use('/rotisseriematchups', rotisseriematchups);
app.get('/baseballipsum', (req, res) => {


  //TODO: Do we need to get the useragent dynamically from the browser for the search string below? -- CDH

  const newUrl = "http://baseballipsum.apphb.com/api/?paras=1";

  return request(newUrl).pipe(res);
});

app.use('*', function(req, res, next) {
  res.sendFile('index.html', {root: path.join(__dirname, 'public')});
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



app.listen(port, () => {
  console.log('Listening on port', port);
  console.log('postgreSQL is lit.');
});

module.exports = app;
