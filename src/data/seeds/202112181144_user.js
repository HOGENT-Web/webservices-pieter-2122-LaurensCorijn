const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    // first delete all entries
    await knex(tables.user).delete();

    await knex(tables.user).insert([
      {
        id: '7f28c5f9-d711-4cd6-ac15-d13d71abff00',
        firstname: 'Piere',
        lastname: 'Geens',
      },
      {
        id: '7f28c5f9-d711-4cd6-ac15-d13d71abff01',
        firstname: 'Piet',
        lastname: 'Pieters',
      },
      {
        id: '7f28c5f9-d711-4cd6-ac15-d13d71abff02',
        firstname: 'Jan',
        lastname: 'Bergmans',
      },
    ]);
  },
};