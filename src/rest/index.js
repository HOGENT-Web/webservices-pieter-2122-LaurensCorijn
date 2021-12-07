const Router = require('@koa/router');
const installHealthRouter = require('./_health');
const installDepartmentRouter = require('./_department');


module.exports = (app) => {
    const router = new Router({
        prefix: '/api',
    });

    installHealthRouter(router);
    installDepartmentRouter(router);

    app.use(router.routes()).use(router.allowedMethods());
}