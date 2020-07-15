
exports.up = function(knex) {
    knex.schema.table('users', table => {
          table.text("college", 40).notNullable();
    })
}

exports.down = function(knex) {
    knex.schema.dropTableIfExists("class");
}
