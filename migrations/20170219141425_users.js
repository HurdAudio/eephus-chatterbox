'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments().primary();
    table.string('name').notNullable().defaultTo('');
    table.string('email').notNullable().defaultTo('');
    table.specificType('hashed_password', 'char(60)').notNullable();
    table.boolean('is_admin').notNullable().defaultTo(false);
    table.integer('first_favorite_team').notNullable().defaultTo(27).references('id').inTable('teams').onDelete('CASCADE').index();
    table.integer('second_favorite_team').defaultTo(null).references('id').inTable('teams').onDelete('CASCADE').index();
    table.integer('third_favorite_team').defaultTo(null).references('id').inTable('teams').onDelete('CASCADE').index();
    table.integer('fourth_favorite_team').defaultTo(null).references('id').inTable('teams').onDelete('CASCADE').index();
    table.integer('fifth_favorite_team').defaultTo(null).references('id').inTable('teams').onDelete('CASCADE').index();
    table.integer('first_least_favorite_team').notNullable().defaultTo(8).references('id').inTable('teams').onDelete('CASCADE').index();
    table.integer('second_least_favorite_team').defaultTo(null).references('id').inTable('teams').onDelete('CASCADE').index();
    table.integer('third_least_favorite_team').defaultTo(null).references('id').inTable('teams').onDelete('CASCADE').index();
    table.integer('fourth_least_favorite_team').defaultTo(null).references('id').inTable('teams').onDelete('CASCADE').index();
    table.integer('fifth_least_favorite_team').defaultTo(null).references('id').inTable('teams').onDelete('CASCADE').index();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
