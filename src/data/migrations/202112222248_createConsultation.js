const { tables } = require('..');

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.consultation, (table) => {
            table.uuid('id')
                .primary();
            table.dateTime('startingTime')
                .notNullable();
            table.dateTime('endTime')
                .notNullable();        
            table.uuid('user_id')
                .notNullable();
            table.uuid('doctor_id')
                .notNullable();

            table.foreign('user_id', 'fk_consultation_user')
                .references(`${tables.user}.id`)
                .onDelete('CASCADE');
            table.foreign('doctor_id','fk_consultation_doctor')
                .references(`${tables.doctor}.id`)    
                .onDelete('CASCADE');

        });
    },
    down: (knex) => {
        return knex.schema.dropTableIfExists(tables.consultation);
    },
};