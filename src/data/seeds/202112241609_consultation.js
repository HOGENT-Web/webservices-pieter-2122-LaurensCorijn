const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.consultation).delete();

    await knex(tables.consultation).insert([
      { 
        id: '7f28c5f9-d711-4cd6-ac15-d13d71abff86',
        startingtime: new Date(2021, 12, 24, 16,30),
        endtime: new Date(2021,12,24,17,00),
        user_id: '7f28c5f9-d711-4cd6-ac15-d13d71abff01',
        doctor_id: '7f28c5f9-d711-4cd6-ac15-d13d71abff02',
      },
      {
        id: '7f28c5f9-d711-4cd6-ac15-d13d71abff87',
        startingtime : new Date(2021,12,25,15,00),
        endtime: new Date(2021,12,25,18,00),
        user_id: '7f28c5f9-d711-4cd6-ac15-d13d71abff02',
        doctor_id: '7f28c5f9-d711-4cd6-ac15-d13d71abff00'
      },
      {
          id: '7f28c5f9-d711-4cd6-ac15-d13d71abff88',
          startingtime: new Date(2021,12,27,12,00),
          endtime: new Date(2021,12,27,15,00),
          user_id: '7f28c5f9-d711-4cd6-ac15-d13d71abff02',
          doctor_id: '7f28c5f9-d711-4cd6-ac15-d13d71abff00'
      }

      
    ]);
  },
};