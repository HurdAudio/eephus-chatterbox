'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('fantasyteams', function(table) {
    table.increments().primary();
    table.string('team_name').notNullable().defaultTo('');
    table.integer('owner').notNullable().defaultTo(1).references('id').inTable('users').onDelete('CASCADE').index();
    table.integer('catcher').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('1b').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('2b').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('3b').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('ss').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('of1').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('of2').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('of3').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('util1').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('util2').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('sp1').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integet('sp2').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('rp1').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('rp2').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('p1').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('p2').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('p3').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('p4').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('bench1').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('bench2').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('bench3').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('bench4').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('bench5').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('dl1').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('dl2').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.timestamps(true, true);

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('fantasyteams');
};
