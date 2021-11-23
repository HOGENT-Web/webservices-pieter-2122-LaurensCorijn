const config = require('config');
const Koa = require('koa');
const getLogger = require('./core/logging');
const bodyParser = require('koa-bodyparser');
const Router = require('@koa/router');

const NODE_ENV = config.get('env');
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');

console.log(`log level ${LOG_LEVEL}, logs enabled: ${LOG_DISABLED !== true}`)

const app = new Koa();
const logger = getLogger();

app.use(bodyParser());

const router = new Router();

router.get('/api/doctors', async (ctx) => {
})

app
		.use(router.routes())
		.use(router.allowedMethods());
 

const port = 9000;
app.listen(port);
logger.info(`Server listening on http://localhost:${port}`);