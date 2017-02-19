'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('teams', function(table) {
    table.increments().primary();
    table.string('city').notNullable().defaultTo('');
    table.string('name').notNullable().defaultTo('');
    table.string('nickname').defaultTo(null);
    table.string('abbreviation').notNullable().defaultTo('');
    table.text('logo_url').notNullable().defaultTo('');
    table.text('throwback_logo_url').notNullable().defaultTo('');
    table.string('league').notNullable().defaultTo('');
    table.string('division').notNullable().defaultTo('');
    table.string('manager').notNullable().defaultTo('');
    table.string('general_manager').notNullable().defaultTo('');
    table.string('stadium_name').notNullable().defaultTo('');
    table.text('stadium_image_url').notNullable().defaultTo('');
    table.string('mascot_name').notNullable().defaultTo('');
    table.text('mascot_image_url').notNullable().defaultTo('');
    table.integer('last_won_world_series').defaultTo(null);
    table.string('team_color_1').defaultTo(null);
    table.string('team_color_2').defaultTo(null);
    table.string('team_color_3').defaultTo(null);
    table.text('home_uniform_url').notNullable().defaultTo('');
    table.text('away_uniform_url').notNullable().defaultTo('');
    table.text('alternate_uniform_url').notNullable().defaultTo('');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('teams');
};
