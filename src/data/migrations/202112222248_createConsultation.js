const { tables } = require('..');

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.consultation, (table) => {
            table.uuid('id')
                .primary();
       
            table.dateTime('startingtime')
                .notNullable();

            table.dateTime('endtime')
                .notNullable(); 
            
            table.uuid('doctor_id')
                .notNullable();

            table.foreign('user_id', 'fk_consultation_user')
                .references(`${tables.user}.id`)
                .onDelete('CASCADE');
            
            table.uuid('user_id')
                .notNullable();
            
            table.foreign('doctor_id','fk_consultation_doctor')
                .references(`${tables.doctor}.id`)    
                .onDelete('CASCADE');

        });
        
    },
    down: (knex) => {
        return knex.schema.dropTableIfExists(tables.consultation);
    },
};