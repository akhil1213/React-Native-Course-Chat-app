
exports.up = async function (knex) {
    await knex.schema.createTable('class', function (table) {
        table.increments();
        table.string('professor_name').notNullable();
        table.string('course_name').notNullable();
        table.string('college').notNullable();
        table.timestamp('time').notNullable();
    })
    await knex.schema.createTable('user_class', function (table) {
        table.integer('user_id').notNullable();
        table.integer('class_id').notNullable();
        table.foreign('user_id').references('id').inTable('users');
        table.foreign('class_id').references('id').inTable('class');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('class');
};
