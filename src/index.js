const config = require('config');
const Koa = require('koa');
const getLogger = require('./core/logging');

const NODE_ENV = config.get('env');
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');

console.log(`log level ${LOG_LEVEL}, logs enabled: ${LOG_DISABLED !== true}`)

const app = new Koa();
const logger = getLogger();

app.use(async ctx => {
	ctx.body = 'Hello World';
});

const port = 9000;
app.listen(port);
logger.info(`Server listening on http://localhost:${port}`);