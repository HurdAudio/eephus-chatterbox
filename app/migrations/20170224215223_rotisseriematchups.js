'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('rotisseriematchups', function(table) {
    table.increments().primary();
    table.string('match_name').notNullable().defaultTo('');
    table.integer('team01').defaultTo(null).references('id').inTable('fantasyteams').onDelete('CASCADE').index();
    table.integer('team02').defaultTo(null).references('id').inTable('fantasyteams').onDelete('CASCADE').index();
    table.integer('team03').defaultTo(null).references('id').inTable('fantasyteams').onDelete('CASCADE').index();
    table.integer('team04').defaultTo(null).references('id').inTable('fantasyteams').onDelete('CASCADE').index();
    table.integer('team05').defaultTo(null).references('id').inTable('fantasyteams').onDelete('CASCADE').index();
    table.integer('team06').defaultTo(null).references('id').inTable('fantasyteams').onDelete('CASCADE').index();
    table.integer('team07').defaultTo(null).references('id').inTable('fantasyteams').onDelete('CASCADE').index();
    table.integer('team08').defaultTo(null).references('id').inTable('fantasyteams').onDelete('CASCADE').index();
    table.integer('team09').defaultTo(null).references('id').inTable('fantasyteams').onDelete('CASCADE').index();
    table.integer('team10').defaultTo(null).references('id').inTable('fantasyteams').onDelete('CASCADE').index();
    table.integer('team11').defaultTo(null).references('id').inTable('fantasyteams').onDelete('CASCADE').index();
    table.integer('team12').defaultTo(null).references('id').inTable('fantasyteams').onDelete('CASCADE').index();
    table.string('stats').notNullable().defaultTo('R H HR SB AVG W SV K ERA WHIP');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('rotisseriematchups');
};
