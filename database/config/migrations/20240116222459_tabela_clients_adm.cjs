/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('clients', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').unique().notNullable();
    table.string('job').notNullable();
    table.string('phone_number').notNullable();
    table.boolean('active').defaultTo(true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('clients');
};
