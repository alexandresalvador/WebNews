/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("autores", (table) => {
    table.increments("id").primary();
    table.string("nome").notNull();
    table.string("email").notNull();
    table.string("gravatar").notNull();
    table.string("perfil").notNull();
    table.string("categoria").notNull();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("autores");
};
