const Router = require('@koa/router');
const consultationService = require('../service/consultation');
const { requireAuthentication, makeRequireRole } = require('../core/auth');
const Joi = require('joi');

/**
 * @swagger
 * tags:
 *   name: Consultations
 *   description: Represents a consultation 
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Consultation:
 *       allOf:
 *         - $ref: "#/components/schemas/Base"
 *         - type: object
 *           required:
 *             - startingtime
 *             - endtime
 *             - user
 *             - doctor
 *           properties:
 *             startingtime:
 *               type: "string"
 *               format: date-time
 *             endtime:
 *               type: "string"
 *               format: date-time
 *             user:
 *               $ref: "#/components/schemas/User"
 *             doctor:
 *               $ref: "#/components/schemas/Doctor"
 *           example:
 *             $ref: "#/components/examples/Consultation"
 *     ConsultationsList:
 *       allOf:
 *         - $ref: "#/components/schemas/ListResponse"
 *         - type: object
 *           required:
 *             - data
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Consultation"
 *   examples:
 *     Consultation:
 *       id: "7b25d1fc-a15c-49bd-8d3f-6365bfa1ca04"
 *       startingtime: "2021-12-23 15:52:17"
 *       endtime: "2021-12-24 15:52:17"
 *       user:
 *         $ref: "#/components/examples/User"
 *       doctor:
 *         $ref: "#/components/examples/Doctor"
 *   requestBodies:
 *     Consultation:
 *       description: The consultation info to save.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startingtime:
 *                 type: string
 *                 format: "date-time"
 *               endtime:
 *                 type: string
 *                 format: "date-time"
 *               userId:
 *                 type: string 
 *                 format: uuid
 *               doctorId:
 *                 type: string
 *                 format: uuid                      
 */


/**
 * @swagger
 * /api/consultations:
 *   get:
 *     summary: Get all consultations (paginated)
 *     security:
 *      - bearerAuth: []
 *     tags:
 *       - Consultations
 *     parameters:
 *       - $ref: "#/components/parameters/limitParam"
 *       - $ref: "#/components/parameters/offsetParam"
 *     responses:
 *       200:
 *         description: List of consultations
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ConsultationsList"
 */
const getAllConsultations = async (ctx) => {
    const limit = ctx.query.limit && Number(ctx.query.limit);
    const offset = ctx.query.offset && Number(ctx.query.offset);
    console.log('test');
    ctx.body = await consultationService.getAll(limit, offset);    
};
getAllConsultations.validationScheme = {
	query: Joi.object({
		limit: Joi.number().integer().positive().max(1000).optional(),
		offset: Joi.number().min(0).optional(),
	}).and('limit', 'offset'),
 };

/**
 * @swagger
 * /api/consultations/{id}:
 *   get:
 *     summary: Get a consultation by a given id
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Consultations
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       200:
 *         description: Consultation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Consultation"
 */
const getConsultationById = async (ctx) => {
    ctx.body = await consultationService.getById(ctx.params.id);
};

/**
 * @swagger
 * /api/consultations:
 *   post:
 *     summary: Create a new consultation
 *     security:
 *      - bearerAuth: []
 *     description: Creates a new consultation.
 *     tags:
 *      - Consultations
 *     requestBody:
 *       $ref: "#/components/requestBodies/Consultation"
 *     responses:
 *       201:
 *         description: The created consultation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Consultation"
 */
const createConsultation = async (ctx) => {
    const newConsultation = await consultationService.create(ctx.request.body);
    ctx.body = newConsultation;
    ctx.status = 201;
};


/**
 * @swagger
 * /api/consultations/{id}:
 *   put:
 *     summary: Update a existing consultation
 *     security:
 *      - bearerAuth: []
 *     description: Updates a consultation.
 *     tags:
 *      - Consultations
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     requestBody:
 *       $ref: "#/components/requestBodies/Consultation"
 *     responses:
 *       201:
 *         description: The edited consultation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Consultation"
 */
const updateConsultation = async (ctx) => {
    ctx.body = await consultationService.updateById(ctx.params.id,ctx.request.body);
    ctx.status = 201;
};

/**
 * @swagger
 * /api/consultations/{id}:
 *   delete:
 *     summary: Delete a consultation by a given id
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Consultations
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       204:
 *         description: deleted consultation
 */
const deleteConsultation = async (ctx) => {
    await consultationService.deleteById(ctx.params.id);
    ctx.status = 204;
};

module.exports = (app) => {
    const router = new Router({
        prefix: '/consultations',
    });

    router.get('/',requireAuthentication,getAllConsultations);
    router.get('/:id',requireAuthentication,getConsultationById);
    router.post('/', requireAuthentication,createConsultation);
    router.put('/:id',requireAuthentication,updateConsultation);
    router.delete('/:id',requireAuthentication,deleteConsultation);

    app.use(router.routes()).use(router.allowedMethods());
};