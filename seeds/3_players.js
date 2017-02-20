'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('players').del()
    .then(function () {
      // Inserts seed entries
      return knex('players').insert([
        {
          id: 1,
          first_name: 'Mike',
          last_name: 'Trout',
          nickname: 'Millville Meteor',
          jersey_number: 27,
          headshot_url: 'http://d3k2oh6evki4b7.cloudfront.net/req/201604090/images/headshots/f/f322d40f_mlbam.jpg',
          date_of_birth: '1991-08-07',
          place_of_birth: 'Vineland, New Jersey',
          team_id: 12,
          bats_LR: 'R',
          throws_LR: 'R',
          salary: 6083000,
          wpa_2016: 6.64,
          eligible_OF: true,
          eligible_util: true,
          projected_2017_AB: 557,
          projected_2017_R: 113,
          projected_2017_HR: 34,
          projected_2017_RBI: 97,
          projected_2017_SB: 21,
          projected_2017_AVG: 0.307,
          projected_2017_OBP: 0.404,
          projected_2017_H: 171,
          projected_2017_2B: 0,
          projected_2017_3B: 0,
          projected_2017_walk: 83,
          projected_2017_SO: 123,
          projected_2017_SLG: 0.571,
          projected_2017_OPS: 0.975,
          created_at: new Date('2017-02-19 16:09:16 UTC'),
          updated_at: new Date('2016-02-19 16:09:16 UTC')
        },
        {
          id: 2,
          first_name: 'Mookie',
          last_name: 'Betts',
          jersey_number: 50,
          headshot_url: 'http://d3k2oh6evki4b7.cloudfront.net/req/201604090/images/headshots/f/f3a0cc68_mlbam.jpg',
          date_of_birth: '1992-10-07',
          place_of_birth: 'Nashville, Tennessee',
          team_id: 7,
          bats_LR: 'R',
          throws_LR: 'R',
          salary: 514500,
          wpa_2016: 3.07,
          eligible_OF: true,
          eligible_util: true,
          projected_2017_AB: 605,
          projected_2017_R: 104,
          projected_2017_HR: 24,
          projected_2017_RBI: 91,
          projected_2017_SB: 23,
          projected_2017_AVG: 0.309,
          projected_2017_OBP: 0.354,
          projected_2017_H: 187,
          projected_2017_2B: 0,
          projected_2017_3B: 0,
          projected_2017_walk: 42,
          projected_2017_SO: 71,
          projected_2017_SLG: 0.514,
          projected_2017_OPS: 0.868,
          created_at: new Date('2017-02-19 16:22:16 UTC'),
          updated_at: new Date('2016-02-19 16:22:16 UTC')
        },
        {
          id: 3,
          first_name: 'Kris',
          last_name: 'Bryant',
          nickname: 'Sparkles',
          jersey_number: 17,
          headshot_url: 'http://d3k2oh6evki4b7.cloudfront.net/req/201604090/images/headshots/1/1d358f93_mlbam.jpg',
          date_of_birth: '1992-01-04',
          place_of_birth: 'Las Vegas, Nevada',
          team_id: 16,
          bats_LR: 'R',
          throws_LR: 'R',
          wpa_2016: '2.26',
          eligible_1B: true,
          eligible_3B: true,
          eligible_OF: true,
          eligible_util: true,
          projected_2017_AB: 569,
          projected_2017_R: 104,
          projected_2017_HR: 33,
          projected_2017_RBI: 98,
          projected_2017_SB: 10,
          projected_2017_AVG: 0.285,
          projected_2017_OBP: 0.368,
          projected_2017_H: 162,
          projected_2017_2B: 0,
          projected_2017_3B: 0,
          projected_2017_walk: 64,
          projected_2017_SO: 144,
          projected_2017_SLG: 0.529,
          projected_2017_OPS: 0.897,
          created_at: new Date('2017-02-19 16:29:16 UTC'),
          updated_at: new Date('2016-02-19 16:29:16 UTC')
        },
        {
          id: 4,
          first_name: 'Nolan',
          last_name: 'Arenado',
          jersey_number: 28,
          headshot_url: 'http://d3k2oh6evki4b7.cloudfront.net/req/201604090/images/headshots/4/4009314f_mlbam.jpg',
          date_of_birth: '1991-04-16',
          place_of_birth: 'Newport Beach, California',
          team_id: 27,
          bats_LR: 'R',
          throws_LR: 'R',
          salary: 512500,
          wpa_2016: 3.02,
          eligible_3B: true,
          eligible_util: true,
          projected_2017_AB: 602,
          projected_2017_R: 103,
          projected_2017_HR: 39,
          projected_2017_RBI: 123,
          projected_2017_SB: 2,
          projected_2017_AVG: 0.292,
          projected_2017_OBP: 0.344,
          projected_2017_H: 176,
          projected_2017_2B: 0,
          projected_2017_3B: 0,
          projected_2017_walk: 46,
          projected_2017_SO: 91,
          projected_2017_SLG: 0.568,
          projected_2017_OPS: 0.912,
          created_at: new Date('2017-02-19 16:35:16 UTC'),
          updated_at: new Date('2016-02-19 16:35:16 UTC')
        },
        {
          id: 5,
          first_name: 'Clayton',
          last_name: 'Kershaw',
          nickname: 'The Claw',
          jersey_number: 22,
          headshot_url: 'http://d3k2oh6evki4b7.cloudfront.net/req/201604090/images/headshots/0/0caa3053_mlbam.jpg',
          date_of_birth: '1988-03-19',
          place_of_birth: 'Dallas, Texas',
          team_id: 28,
          bats_LR: 'L',
          throws_LR: 'L',
          salary: 32571000,
          wpa_2016: 4.57,
          eligible_SP: true,
          eligible_P: true,
          projected_2017_IP: 204.0,
          projected_2017_K: 250,
          projected_2017_W: 17,
          projected_2017_L: 6,
          projected_2017_ERA: 1.85,
          projected_2017_WHIP: 0.81,
          projected_2017_ER: 42,
          projected_2017_HAllowed: 138,
          projected_2017_BB: 27,
          projected_2017_HRAllowed: 0,
          projected_2017_G: 0,
          projected_2017_GS: 0,
          projected_2017_CG: 0,
          created_at: new Date('2017-02-19 16:44:16 UTC'),
          updated_at: new Date('2016-02-19 16:44:16 UTC')
        },
        {
          id: 6,
          first_name: 'Paul',
          last_name: 'Goldschmidt',
          nickname: 'Goldy',
          jersey_number: 44,
          headshot_url: 'http://d3k2oh6evki4b7.cloudfront.net/req/201604090/images/headshots/6/6b37a7f2_mlbam.jpg',
          date_of_birth: '1987-09-10',
          place_of_birth: 'Wilmington, Delaware',
          team_id: 26,
          bats_LR: 'R',
          throws_LR: 'R',
          salary: 3100000,
          wpa_2016: 3.98,
          eligible_1B: true,
          eligible_util: true,
          projected_2017_AB: 554,
          projected_2017_R: 101,
          projected_2017_HR: 27,
          projected_2017_RBI: 97,
          projected_2017_SB: 25,
          projected_2017_AVG: 0.305,
          projected_2017_OBP: 0.402,
          projected_2017_H: 169,
          projected_2017_2B: 0,
          projected_2017_3B: 0,
          projected_2017_walk: 88,
          projected_2017_SO: 120,
          projected_2017_SLG: 0.523,
          projected_2017_OPS: 0.925,
          created_at: new Date('2017-02-19 16:49:16 UTC'),
          updated_at: new Date('2016-02-19 16:49:16 UTC')
        },
        {
          id: 7,
          first_name: 'Jose',
          last_name: 'Altuve',
          nickname: 'Gigante',
          jersey_number: 27,
          headshot_url: 'http://d3k2oh6evki4b7.cloudfront.net/req/201604090/images/headshots/f/f0e8fd62_mlbam.jpg',
          date_of_birth: '1990-05-06',
          place_of_birth: 'Maracay, Aragua, Venezuela',
          team_id: 11,
          bats_LR: 'R',
          throws_LR: 'R',
          salary: 2500000,
          wpa_2016: 3.00,
          eligible_2B: true,
          eligible_util: true,
          projected_2017_AB: 609,
          projected_2017_R: 92,
          projected_2017_HR: 17,
          projected_2017_RBI: 76,
          projected_2017_SB: 35,
          projected_2017_AVG: 0.319,
          projected_2017_OBP: 0.366,
          projected_2017_H: 194,
          projected_2017_2B: 0,
          projected_2017_3B: 0,
          projected_2017_walk: 41,
          projected_2017_SO: 57,
          projected_2017_SLG: 0.481,
          projected_2017_OPS: 0.847,
          created_at: new Date('2017-02-19 16:53:16 UTC'),
          updated_at: new Date('2016-02-19 16:53:16 UTC')
        },
        {
          id: 8,
          first_name: 'Manny',
          last_name: 'Machado',
          nickname: 'Hakuna Machado',
          jersey_number: 13,
          headshot_url: 'http://d3k2oh6evki4b7.cloudfront.net/req/201604090/images/headshots/4/45d62ce6_mlbam.jpg',
          date_of_birth: '1992-07-06',
          place_of_birth: 'Hialeah, Florida',
          team_id: 6,
          bats_LR: 'R',
          throws_LR: 'R',
          salary: 548000,
          wpa_2016: 1.72,
          eligible_3B: true,
          eligible_SS: true,
          eligible_util: true,
          projected_2017_AB: 595,
          projected_2017_R: 94,
          projected_2017_HR: 33,
          projected_2017_RBI: 83,
          projected_2017_SB: 7,
          projected_2017_AVG: 0.291,
          projected_2017_OBP: 0.345,
          projected_2017_H: 173,
          projected_2017_2B: 0,
          projected_2017_3B: 0,
          projected_2017_walk: 47,
          projected_2017_SO: 100,
          projected_2017_SLG: 0.516,
          projected_2017_OPS: 0.861,
          created_at: new Date('2017-02-19 16:57:16 UTC'),
          updated_at: new Date('2016-02-19 16:57:16 UTC')
        },
        {
          id: 9,
          first_name: 'Josh',
          last_name: 'Donaldson',
          nickname: 'Bringer of Rain',
          jersey_number: 20,
          headshot_url: 'http://d3k2oh6evki4b7.cloudfront.net/req/201604090/images/headshots/3/3af4cc98_mlbam.jpg',
          date_of_birth: '1985-12-08',
          place_of_birth: 'Pensacola, Florida',
          team_id: 10,
          bats_LR: 'R',
          throws_LR: 'R',
          salary: 4300000,
          wpa_2016: 4.29,
          eligible_3B: true,
          eligible_util: true,
          projected_2017_AB: 580,
          projected_2017_R: 114,
          projected_2017_HR: 36,
          projected_2017_RBI: 104,
          projected_2017_SB: 7,
          projected_2017_AVG: 0.283,
          projected_2017_OBP: 0.371,
          projected_2017_H: 164,
          projected_2017_2B: 0,
          projected_2017_3B: 0,
          projected_2017_walk: 76,
          projected_2017_SO: 104,
          projected_2017_SLG: 0.538,
          projected_2017_OPS: 0.909,
          created_at: new Date('2017-02-19 17:01:16 UTC'),
          updated_at: new Date('2016-02-19 17:01:16 UTC')
        },
        {
          id: 10,
          first_name: 'Bryce',
          last_name: 'Harper',
          nickname: 'Bam-Bam',
          jersey_number: 34,
          headshot_url: 'http://d3k2oh6evki4b7.cloudfront.net/req/201604090/images/headshots/c/c61e922e_mlbam.jpg',
          date_of_birth: '1992-10-16',
          place_of_birth: 'Las Vegas, Nevada',
          team_id: 25,
          bats_LR: 'L',
          throws_LR: 'R',
          salary: 2500000,
          wpa_2016: 3.27,
          eligible_OF: true,
          eligible_util: true,
          projected_2017_AB: 520,
          projected_2017_R: 99,
          projected_2017_HR: 32,
          projected_2017_RBI: 96,
          projected_2017_SB: 14,
          projected_2017_AVG: 0.288,
          projected_2017_OBP: 0.401,
          projected_2017_H: 150,
          projected_2017_2B: 0,
          projected_2017_3B: 0,
          projected_2017_walk: 97,
          projected_2017_SO: 104,
          projected_2017_SLG: 0.542,
          projected_2017_OPS: 0.943,
          created_at: new Date('2017-02-19 17:06:16 UTC'),
          updated_at: new Date('2016-02-19 17:06:16 UTC')
        },
        {
          id: 11,
          first_name: 'Anthony',
          last_name: 'Rizzo',
          jersey_number: 44,
          headshot_url: 'http://d3k2oh6evki4b7.cloudfront.net/req/201604090/images/headshots/1/1162de81_mlbam.jpg',
          date_of_birth: '1989-08-08',
          place_of_birth: 'Fort Lauderdale, Florida',
          team_id: 16,
          bats_LR: 'L',
          throws_LR: 'L',
          salary: 5000000,
          wpa_2016: 3.89,
          eligible_1B: true,
          eligible_util: true,
          projected_2017_AB: 552,
          projected_2017_R: 90,
          projected_2017_HR: 30,
          projected_2017_RBI: 97,
          projected_2017_SB: 8,
          projected_2017_AVG: 0.284,
          projected_2017_OBP: 0.373,
          projected_2017_H: 157,
          projected_2017_2B: 0,
          projected_2017_3B: 0,
          projected_2017_walk: 62,
          projected_2017_SO: 89,
          projected_2017_SLG: 0.525,
          projected_2017_OPS: 0.898,
          created_at: new Date('2017-02-19 17:09:16 UTC'),
          updated_at: new Date('2016-02-19 17:09:16 UTC')
        },
        {
          id: 12,
          first_name: 'Charlie',
          last_name: 'Blackmon',
          jersey_number: 19,
          headshot_url: 'http://d3k2oh6evki4b7.cloudfront.net/req/201604090/images/headshots/1/12154e57_mlbam.jpg',
          date_of_birth: '1986-07-01',
          place_of_birth: 'Dallas, Texas',
          team_id: 27,
          bats_LR: 'L',
          throws_LR: 'L',
          salary: 517500,
          wpa_2016: 2.19,
          eligible_OF: true,
          eligible_util: true,
          projected_2017_AB: 572,
          projected_2017_R: 97,
          projected_2017_HR: 23,
          projected_2017_RBI: 70,
          projected_2017_SB: 27,
          projected_2017_AVG: 0.306,
          projected_2017_OBP: 0.359,
          projected_2017_H: 175,
          projected_2017_2B: 0,
          projected_2017_3B: 0,
          projected_2017_walk: 37,
          projected_2017_SO: 91,
          projected_2017_SLG: 0.502,
          projected_2017_OPS: 0.861,
          created_at: new Date('2017-02-19 17:13:16 UTC'),
          updated_at: new Date('2016-02-19 17:13:16 UTC')
        },
        {
          id: 13,
          first_name: '',
          last_name: '',
          nickname: '',
          jersey_number: '',
          headshot_url: '',
          date_of_birth: '-08-07',
          place_of_birth: '',
          team_id: '',
          bats_LR: '',
          throws_LR: '',
          salary: '',
          wpa_2016: '',
          eligible_OF: true,
          eligible_util: true,
          projected_2017_AB: '',
          projected_2017_R: '',
          projected_2017_HR: '',
          projected_2017_RBI: '',
          projected_2017_SB: '',
          projected_2017_AVG: '',
          projected_2017_OBP: '',
          projected_2017_H: '',
          projected_2017_2B: '',
          projected_2017_3B: '',
          projected_2017_walk: '',
          projected_2017_SO: '',
          projected_2017_SLG: '',
          projected_2017_OPS: '',
          created_at: new Date('2017-02-19 16:09:16 UTC'),
          updated_at: new Date('2016-02-19 16:09:16 UTC')
        },
        {
          id: 14,
          first_name: '',
          last_name: '',
          nickname: '',
          jersey_number: '',
          headshot_url: '',
          date_of_birth: '-08-07',
          place_of_birth: '',
          team_id: '',
          bats_LR: '',
          throws_LR: '',
          salary: '',
          wpa_2016: '',
          eligible_OF: true,
          eligible_util: true,
          projected_2017_AB: '',
          projected_2017_R: '',
          projected_2017_HR: '',
          projected_2017_RBI: '',
          projected_2017_SB: '',
          projected_2017_AVG: '',
          projected_2017_OBP: '',
          projected_2017_H: '',
          projected_2017_2B: '',
          projected_2017_3B: '',
          projected_2017_walk: '',
          projected_2017_SO: '',
          projected_2017_SLG: '',
          projected_2017_OPS: '',
          created_at: new Date('2017-02-19 16:09:16 UTC'),
          updated_at: new Date('2016-02-19 16:09:16 UTC')
        }
      ]);
    });
};
