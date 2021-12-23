const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.consultation).delete();
    await knex(tables.doctor).delete();
    await knex(tables.user).delete();
    await knex(tables.department).delete();
    
  },
};