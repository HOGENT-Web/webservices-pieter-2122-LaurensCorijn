const { tables } = require('..');
const Role = require('../../core/roles');

module.exports = {
  seed: async (knex) => {
    // first delete all entries
    await knex(tables.user).delete();

    await knex(tables.user).insert([
      {
        id: '7f28c5f9-d711-4cd6-ac15-d13d71abff00',
        firstname: 'Piere',
        lastname: 'Geens',
        email: 'piere.geens@email.be',
        password_hash: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
        roles: JSON.stringify([Role.USER]),
      },
      {
        id: '7f28c5f9-d711-4cd6-ac15-d13d71abff01',
        firstname: 'Piet',
        lastname: 'Pieters',
        email: 'piet.pieters@email.be',
        password_hash: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
        roles: JSON.stringify([Role.USER]),
      },
      {
        id: '7f28c5f9-d711-4cd6-ac15-d13d71abff02',
        firstname: 'Jan',
        lastname: 'Bergmans',
        email: 'jan.bergmans@email.be',
        password_hash: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
        roles: JSON.stringify([Role.USER]),
      },
    ]);
  },
};