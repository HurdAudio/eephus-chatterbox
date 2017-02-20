'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('players', function(table) {
    table.increments().primary();
    table.string('first_name').notNullable().defaultTo('');
    table.string('last_name').notNullable().defaultTo('');
    table.string('nickname').defaultTo(null);
    table.integer('jersey_number').notNullable().defaultTo(99);
    table.text('headshot_url').notNullable().defaultTo('');
    table.date('date_of_birth').notNullable().defaultTo('1970-01-01');
    table.string('place_of_birth').notNullable().defaultTo('Los Angeles, California');
    table.integer('team_id').defaultTo(null).references('id').inTable('teams').onDelete('CASCADE').index();
    table.boolean('is_rookie').notNullable().defaultTo(false);
    table.string('bats_LR').notNullable().defaultTo('Switch');
    table.string('throws_LR').notNullable().defaultTo('R');
    table.integer('salary').notNullable().defaultTo(100000);
    table.decimal('wpa_2016', 2, 2).notNullable().defaultTo(0.00);
    table.boolean('eligible_C').notNullable().defaultTo(false);
    table.boolean('eligible_1B').notNullable().defaultTo(false);
    table.boolean('eligible_2B').notNullable().defaultTo(false);
    table.boolean('eligible_3B').notNullable().defaultTo(false);
    table.boolean('eligible_SS').notNullable().defaultTo(false);
    table.boolean('eligible_OF').notNullable().defaultTo(false);
    table.boolean('eligible_util').notNullable().defaultTo(false);
    table.boolean('eligible_SP').notNullable().defaultTo(false);
    table.boolean('eligible_RP').notNullable().defaultTo(false);
    table.boolean('eligible_P').notNullable().defaultTo(false);
    table.boolean('eligible_bench').notNullable().defaultTo(true);
    table.integer('projected_2017_AB').defaultTo(null);
    table.integer('projected_2017_R').defaultTo(null);
    table.integer('projected_2017_HR').defaultTo(null);
    table.integer('projected_2017_RBI').defaultTo(null);
    table.integer('projected_2017_SB').defaulatTo(null);
    table.decimal('projected_2017_AVG', 1, 3).defaultTo(null);
    table.decimal('projected_2017_OBP', 1, 3).defaultTo(null);
    table.integer('projected_2017_H').defaultTo(null);
    table.integer('projected_2017_2B').defaultTo(null);
    table.integer('projected_2017_3B').defaultTo(null);
    table.integer('projected_2017_walk').defaultTo(null);
    table.integer('projected_2017_SO').defaultTo(null);
    table.decimal('projected_2017_SLG', 1, 3).defaultTo(null);
    table.decimal('projected_2017_OPS', 1, 3).defaultTo(null);
    table.decimal('projected_2017_IP', 3, 1).defaultTo(null);
    table.integer('projected_2017_K').defaultTo(null);
    table.integer('projected_2017_W').defaultTo(null);
    table.integer('projected_2017_L').defaultTo(null);
    table.decimal('projected_2017_ERA', 4, 2).defaultTo(null);
    table.decimal('projected_2017_WHIP', 3, 2).defaultTo(null);
    table.integer('projected_2017_ER').defaultTo(null);
    table.integer('projected_2017_HAllowed').defaultTo(null);
    table.integer('projected_2017_BB').defaultTo(null);
    table.integer('projected_2017_HRAllowed').defaultTo(null);
    table.integer('projected_2017_G').defaultTo(null);
    table.integer('projected_2017_GS').defaultTo(null);
    table.integer('projected_2017_CG').defaultTo(null);
    table.integer('projected_2017_SV').defaultTo(null);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('players');
};
