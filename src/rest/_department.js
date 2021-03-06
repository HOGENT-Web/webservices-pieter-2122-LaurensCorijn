const Router = require('@koa/router');
const departmentService = require('../service/department');
const { requireAuthentication, makeRequireRole } = require('../core/auth');
const Role = require('../core/roles');
const Joi = require('joi');
const validate = require('./_validation.js');

/**
 * @swagger
 * tags:
 *   name: Departments
 *   description: Represents department in a hospital
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Department:
 *       allOf:
 *         - $ref: "#/components/schemas/Base"
 *         - type: object
 *           required:
 *             - name
 *             - location
 *             - hospital
 *           properties:
 *             name:
 *               type: "string"
 *             location:
 *               type: "string"
 *             hospital:
 *               type: "string"
 *           example:
 *             $ref: "#/components/examples/Department"
 *     DepartmentsList:
 *       allOf:
 *         - $ref: "#/components/schemas/ListResponse"
 *         - type: object
 *           required:
 *             - data
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Department"
 *   examples:
 *     Department:
 *       id: "7b25d1fc-a15c-49bd-8d3f-6365bfa1ca04"
 *       name: "Oncologie"
 *       location: "Straat 6"
 *       hospital: "Ziekenhuis Gent"
 *   requestBodies:
 *     Department:
 *       description: The department info to save.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               hospital:
 *                 type: string                       
 */

/**
 * @swagger
 * /api/departments:
 *   get:
 *     summary: Get all departments (paginated)
 *     tags:
 *       - Departments
 *     parameters:
 *       - $ref: "#/components/parameters/limitParam"
 *       - $ref: "#/components/parameters/offsetParam"
 *     responses:
 *       200:
 *         description: List of departments
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/DepartmentsList"
 */
const getAllDepartments = async (ctx) => {
    const limit =  ctx.query.limit && Number(ctx.query.limit);
    const offset =  ctx.query.offset && Number(ctx.query.offset);
    ctx.body = await departmentService.getAll(limit, offset);
};
getAllDepartments.validationScheme = {
	query: Joi.object({
		limit: Joi.number().integer().positive().max(1000).optional(),
		offset: Joi.number().min(0).optional(),
	}).and('limit', 'offset'),
 };

/**
 * @swagger
 * /api/departments/{id}:
 *   get:
 *     summary: Get a department by a given id
 *     tags:
 *      - Departments
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       200:
 *         description: Department
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Department"
 */
const getDepartmentById = async (ctx) => {
    ctx.body = await departmentService.getById(ctx.params.id);
};
getDepartmentById.validationScheme = {
    params: {
      id: Joi.string().uuid(),
    },
  };

/**
 * @swagger
 * /api/departments:
 *   post:
 *     summary: Create a new department
 *     security:
 *      - bearerAuth: []
 *     description: Creates a new department.
 *     tags:
 *      - Departments
 *     requestBody:
 *       $ref: "#/components/requestBodies/Department"
 *     responses:
 *       201:
 *         description: The created department
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Department"
 */
const createDepartment = async (ctx) => {
    const newDepartment = await departmentService.create(ctx.request.body);
    ctx.body = newDepartment;
    ctx.status = 201;
};
createDepartment.validationScheme = {
	body: {
        name: Joi.string(),
        location: Joi.string(),
        hospital: Joi.string(),		
  },
};

/**
 * @swagger
 * /api/departments/{id}:
 *   put:
 *     summary: Update a existing department
 *     security:
 *      - bearerAuth: []
 *     description: Updates a department.
 *     tags:
 *      - Departments
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     requestBody:
 *       $ref: "#/components/requestBodies/Department"
 *     responses:
 *       201:
 *         description: The edited department
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Department"
 */
const updateDepartment = async (ctx) => {
    ctx.body = await departmentService.updateById(ctx.params.id,ctx.request.body);
    ctx.status = 201;
};
updateDepartment.validationScheme = {
    params: {
      id: Joi.string().uuid(),
    },
    body: {
        name: Joi.string().max(255),
        location: Joi.string().max(255),
        hospital: Joi.string().max(255),
    }
  };

/**
 * @swagger
 * /api/departments/{id}:
 *   delete:
 *     summary: Delete a department by a given id
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Departments
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       204:
 *         description: deleted department
 */
const deleteDepartment = async (ctx) => {
    await departmentService.deleteById(ctx.params.id);
    ctx.status = 204;
};
deleteDepartment.validationScheme = {
    params: {
      id: Joi.string().uuid(),
    },
  };

module.exports = (app) => {
    const router = new Router({
        prefix: '/departments',
    });

    const requireAdmin = makeRequireRole(Role.ADMIN);

    router.get('/', validate(getAllDepartments.validationScheme),getAllDepartments);
    router.get('/:id',validate(getDepartmentById.validationScheme),getDepartmentById);
    router.post('/',requireAuthentication,requireAdmin,validate(createDepartment.validationScheme),createDepartment);
    router.put('/:id',requireAuthentication,validate(updateDepartment.validationScheme),requireAdmin,updateDepartment);
    router.delete('/:id',requireAuthentication,validate(deleteDepartment.validationScheme),requireAdmin,deleteDepartment);

    app.use(router.routes()).use(router.allowedMethods());
}