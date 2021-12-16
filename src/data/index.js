const { Sequelize } = require('sequelize');
const config = require('config');
const models = require('./model');

const { getChildLogger } = require('../core/logging');

const NODE_ENV = config.get('env');

const DATABASE_CLIENT = config.get('database.client');
const DATABASE_NAME = config.get('database.name');
const DATABASE_HOST = config.get('database.host');
const DATABASE_PORT = config.get('database.port');
const DATABASE_USERNAME = config.get('database.username');
const DATABASE_PASSWORD = config.get('database.password');

async function initializeData() {

    const logger = getChildLogger('database');
    logger.info('Initializing connection to the database');

    const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
       // ...otherConfig,
        host: 'localhost',
        dialect: 'mysql'
    });

    logger.info('Gelukt1')

    try{
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }catch(error)
    {
        console.error('Unable to connect to the database:',error);
    }

    logger.info('Gelukt2');  

    Object.values(models)
        .forEach((model) => {
            if(model.initialize){
                model.initialize(sequelize);
                logger.info('Tabel aangemaakt')
            }
        });
    logger.info('Gelukt3');       
};

async function shutdownData(){
    const logger = getChildLogger('database');

    logger.info('Shutting down database connection');

    await sequelize.close();

    logger.info('Database connection closed');
}

module.exports = {
    initializeData,
    shutdownData
};