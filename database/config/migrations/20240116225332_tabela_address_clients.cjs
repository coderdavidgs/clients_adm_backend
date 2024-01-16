/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('address_clients', function(table) {
    table.increments('id').primary();
    table.string('neighborhood').notNullable();
    table.string('street').notNullable();
    table.integer('number').notNullable();
    table.string('city').notNullable();
    table.string('uf').notNullable();
    table.integer('client_id').notNullable().unsigned().references('id').inTable('clients');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('address_clients').dropTableIfExists('clients');
};
