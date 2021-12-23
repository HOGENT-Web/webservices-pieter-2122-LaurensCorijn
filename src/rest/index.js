const Router = require('@koa/router');
const installHealthRouter = require('./_health');
const installDepartmentRouter = require('./_department');
const installUserRouter = require('./_user');
const installDoctorRouter = require('./_doctor');
const installConsultationRouter = require('./_consultation');


module.exports = (app) => {
    const router = new Router({
        prefix: '/api',
    });

    installHealthRouter(router);
    installDepartmentRouter(router);
    installUserRouter(router);
    installDoctorRouter(router);
    installConsultationRouter(router);

    app.use(router.routes()).use(router.allowedMethods());
}