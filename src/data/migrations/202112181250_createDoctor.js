const { tables } = require('..');

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.doctor, (table) => {
            table.uuid('id')
                .primary();
            table.string('firstname', 255)
                .notNullable();
            table.string('lastname',255)
                .notNullable();  
            table.uuid('department_id')
                .notNullable();

            table.foreign('department_id', 'fk_doctor_department')
                .references(`${tables.department}.id`)
                .onDelete('CASCADE');

        });
    },
    down: (knex) => {
        return knex.schema.dropTableIfExists(tables.department);
    },
};