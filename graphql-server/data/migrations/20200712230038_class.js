exports.up = knex =>
  knex.schema.createTable("class", tbl => {
    tbl.text("courseName", 40).notNullable();
    tbl.text("profName", 40).notNullable();
    tbl.text("time", 12).notNullable();
    tbl.text("id", 128).notNullable();
  });

exports.down = knex => knex.schema.dropTableIfExists("class");
// Migrations allow for you to define sets of schema changes so upgrading a database is a breeze.