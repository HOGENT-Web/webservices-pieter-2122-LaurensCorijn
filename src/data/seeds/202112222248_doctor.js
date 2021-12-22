const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    // first delete all entries
    await knex(tables.doctor).delete();

    await knex(tables.doctor).insert([
      {
        id: '7f28c5f9-d711-4cd6-ac15-d13d71abff00',
        firstname: 'Piere',
        lastname: 'Geens',
        department_id: '7f28c5f9-d711-4cd6-ac15-d13d71abff01'
      },
      {
        id: '7f28c5f9-d711-4cd6-ac15-d13d71abff01',
        firstname: 'Piet',
        lastname: 'Pieters',
        department_id: '7f28c5f9-d711-4cd6-ac15-d13d71abff02'
      },
      {
        id: '7f28c5f9-d711-4cd6-ac15-d13d71abff02',
        firstname: 'Jan',
        lastname: 'Bergmans',
        department_id: '7f28c5f9-d711-4cd6-ac15-d13d71abff03'
      },
    ]);
  },
};