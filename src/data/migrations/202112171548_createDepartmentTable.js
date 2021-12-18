const { tables } = require('..');

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.department, (table) => {
            table.uuid('id')
                .primary();
            
            table.string('name',255)
                .notNullable();   
            
            table.string('location',255)
                .notNullable();
            
            table.string('hospital',255)
                .notNullable();
        });
    },
    down: (knex) => {
        return knex.schema.dropTableIfExists(tables.department);
    }
};