const Router = require('@koa/router');
const installHealthRouter = require('./_health');
const installDepartmentRouter = require('./_department');
const installUserRouter = require('./_user');
const installDoctorRouter = require('./_doctor');
const installConsultationRouter = require('./_consultation');

/**
 * @swagger
 * components:
 *   schemas:
 *     Base:
 *       required:
 *         - id
  *       properties:
 *         id:
 *           type: string
 *           format: "uuid"
 *       example:
 *         id: "6d560fca-e7f9-4583-af2d-b05ccd1a0c58"
 *     ListResponse:
 *       required:
 *         - limit
 *         - offset
 *       properties:
 *         limit:
 *           type: integer
 *           description: Limit actually used
 *           example: 1
 *         offset:
 *           type: integer
 *           description: Offset actually used
 *           example: 1
 *   parameters:
 *     idParam:
 *       in: path
 *       name: id
 *       description: Id of item
 *       required: true
 *       schema:
 *         type: string
 *         format: "uuid"
 *     limitParam:
 *       in: query
 *       name: limit
 *       description: Maximum amount of items to return
 *       required: false
 *       schema:
 *         type: integer
 *         default: 100
 *     offsetParam:
 *       in: query
 *       name: offset
 *       description: Number of items to skip
 *       required: false
 *       schema:
 *         type: integer
 *         default: 0
  */

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