// importando a configuração

const config = require("../knexfile.js")
// de dentro do knex chamei o método, e passei minha configuração como parametro

const knex = require("knex")(config);


// exportando a variável
module.exports = knex;