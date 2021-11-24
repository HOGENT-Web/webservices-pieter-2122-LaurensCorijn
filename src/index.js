const config = require('config');
const Koa = require('koa');
const koaCors = require('@koa/cors');
const getLogger = require('./core/logging');
const bodyParser = require('koa-bodyparser');
const Router = require('@koa/router');
const doctorService = require('./service/doctors');

const NODE_ENV = config.get('env');
const CORS_ORIGINS = config.get('cors.origins');
const CORS_MAX_AGE = config.get('cors.maxAge');
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');

console.log(`log level ${LOG_LEVEL}, logs enabled: ${LOG_DISABLED !== true}`)

const app = new Koa();

app.use(
	koaCors({
		origin: (ctx) => {
			if (CORS_ORIGINS.indexOf(ctx.request.header.origin) !== -1) {
				return ctx.request.header.origin;
			}
			// Not a valid domain at this point, let's return the first valid as we should return a string
			return CORS_ORIGINS[0];
		},
		allowHeaders: ['Accept', 'Content-Type', 'Authorization'],
		maxAge: CORS_MAX_AGE,
	})
);

const logger = getLogger();

app.use(bodyParser());

const router = new Router();

router.get('/api/doctors', async (ctx) => {
	logger.info(JSON.stringify(ctx.request));
	ctx.body = doctorService.getAll();
})

app
		.use(router.routes())
		.use(router.allowedMethods());
 

const port = 9000;
app.listen(port);
logger.info(`Server listening on http://localhost:${port}`);