'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('fantasyteams', function(table) {
    table.increments().primary();
    table.string('team_name').notNullable().defaultTo('');
    table.integer('owner').notNullable().defaultTo(1).references('id').inTable('users').onDelete('CASCADE').index();
    table.integer('catcher').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('first_base').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('second_base').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('third_base').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('short_stop').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('outfield_1').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('outfield_2').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('outfield_3').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('util_1').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('util_2').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('sp_1').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integet('sp_2').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('rp_1').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('rp_2').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('p_1').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('p_2').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('p_3').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('p_4').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('bench_1').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('bench_2').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('bench_3').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('bench_4').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('bench_5').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('dl_1').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.integer('dl_2').defaultTo(null).references('id').inTable('players').onDelete('CASCADE').index();
    table.string('logo_1').defaultTo(null);
    table.string('logo_2').defaultTo(null);
    table.string('team_color_1').notNullable().defaultTo('#FFFFFF');
    table.string('team_color_2').notNullable().defaultTo('#000000');
    table.string('team_color_3').notNullable().defaultTo('#22256B');
    table.timestamps(true, true);

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('fantasyteams');
};
