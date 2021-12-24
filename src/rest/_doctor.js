const Router = require('@koa/router');
const doctorService = require('../service/doctor');
const { requireAuthentication, makeRequireRole } = require('../core/auth');
const Role = require('../core/roles');
const Joi = require('joi');

/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: Represents a doctor 
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Doctor:
 *       allOf:
 *         - $ref: "#/components/schemas/Base"
 *         - type: object
 *           required:
 *             - firstname
 *             - lastname
 *             - department
 *           properties:
 *             firstname:
 *               type: "string"
 *             lastname:
 *               type: "string"
 *             department:
 *               $ref: "#/components/schemas/Department"   
 *           example:
 *             $ref: "#/components/examples/Doctor"
 *     DoctorsList:
 *       allOf:
 *         - $ref: "#/components/schemas/ListResponse"
 *         - type: object
 *           required:
 *             - data
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Doctor"
 *   examples:
 *     Doctor:
 *       id: "7b25d1fc-a15c-49bd-8d3f-6365bfa1ca04"
 *       firstname: "Jef"
 *       lastname: "Something"
 *       department:
 *         $ref: "#/components/examples/Department"
 *   requestBodies:
 *     Doctor:
 *       description: The doctor info to save.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               departmentId:
 *                 type: string   
 *                 format: uuid                    
 */

/**
 * @swagger
 * /api/doctors:
 *   get:
 *     summary: Get all doctors (paginated)
 *     tags:
 *       - Doctors
 *     parameters:
 *       - $ref: "#/components/parameters/limitParam"
 *       - $ref: "#/components/parameters/offsetParam"
 *     responses:
 *       200:
 *         description: List of doctors
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/DoctorsList"
 */
const getAllDoctors = async (ctx) => {
    const limit = ctx.query.limit && Number(ctx.query.limit);
    const offset = ctx.query.offset && Number(ctx.query.offset);
    ctx.body = await doctorService.getAll(limit, offset);
};
getAllDoctors.validationScheme = {
	query: Joi.object({
		limit: Joi.number().integer().positive().max(1000).optional(),
		offset: Joi.number().min(0).optional(),
	}).and('limit', 'offset'),
 };

/**
 * @swagger
 * /api/doctors/{id}:
 *   get:
 *     summary: Get a doctor by a given id
 *     tags:
 *      - Doctors
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       200:
 *         description: Doctor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Doctor"
 */
const getDoctorById = async (ctx) => {
    ctx.body = await doctorService.getById(ctx.params.id);
};

/**
 * @swagger
 * /api/doctors:
 *   post:
 *     summary: Create a new doctor
 *     security:
 *      - bearerAuth: []
 *     description: Creates a new doctor.
 *     tags:
 *      - Doctors
 *     requestBody:
 *       $ref: "#/components/requestBodies/Doctor"
 *     responses:
 *       201:
 *         description: The created doctor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Doctor"
 */
const createDoctor = async (ctx) => {
    const newDoctor = await doctorService.create(ctx.request.body);
    ctx.body = newDoctor;
    ctx.status = 201;
};

/**
 * @swagger
 * /api/doctors/{id}:
 *   put:
 *     summary: Update a existing doctor
 *     security:
 *      - bearerAuth: []
 *     description: Updates a doctor.
 *     tags:
 *      - Doctors
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     requestBody:
 *       $ref: "#/components/requestBodies/Doctor"
 *     responses:
 *       201:
 *         description: The edited doctor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Doctor"
 */
const updateDoctor = async (ctx) => {
    ctx.body = await doctorService.updateById(ctx.params.id,ctx.request.body);
    ctx.status = 201;
};


/**
 * @swagger
 * /api/doctors/{id}:
 *   delete:
 *     summary: Delete a doctor by a given id
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Doctors
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       204:
 *         description: deleted doctor
 */
const deleteDoctor = async (ctx) => {
    await doctorService.deleteById(ctx.params.id);
    ctx.status = 204;
};

module.exports = (app) => {
    const router = new Router({
        prefix: '/doctors',
    });

    const requireAdmin = makeRequireRole(Role.ADMIN);

    router.get('/',getAllDoctors);
    router.get('/:id',getDoctorById);
    router.post('/',requireAuthentication,requireAdmin,createDoctor);
    router.put('/:id',requireAuthentication,requireAdmin,updateDoctor);
    router.delete('/:id',requireAuthentication,requireAdmin,deleteDoctor);

    app.use(router.routes()).use(router.allowedMethods());
}