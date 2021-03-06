'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('headtoheadmatchups', function(table) {
    table.increments().primary();
    table.string('match_name').notNullable().defaultTo('');
    table.integer('away_team').notNullable().references('id').inTable('fantasyteams').onDelete('CASCADE').index();
    table.integer('home_team').notNullable().references('id').inTable('fantasyteams').onDelete('CASCADE').index();
    table.string('stats').notNullable().defaultTo('R H HR SB AVG W SV K ERA WHIP');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('headtoheadmatchups');
};
