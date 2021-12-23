const Router = require('@koa/router');
const consultationService = require('../service/consultation');

const getAllConsultations = async (ctx) => {
    const limit = ctx.query.limit && Number(ctx.query.limit);
    const offset = ctx.query.offset && Number(ctx.query.offset);
    ctx.body = await consultationService.getAll(limit, offset);
};

const getConsultationById = async (ctx) => {
    ctx.body = await consultationService.getById(ctx.params.id);
};

const createConsultation = async (ctx) => {
    const newConsultation = await consultationService.create(ctx.request.body);
    ctx.body = newConsultation;
    ctx.status = 201;
};

const updateConsultation = async (ctx) => {
    ctx.body = await consultationService.updateById(ctx.params.id,ctx.request.body);
};

const deleteConsultation = async (ctx) => {
    await consultationService.deleteById(ctx.params.id);
    ctx.status = 204;
};

module.exports = (app) => {
    const router = new Router({
        prefix: '/consultations',
    });

    router.get('/',getAllConsultations);
    router.get('/:id',getConsultationById);
    router.post('/', createConsultation);
    router.put('/:id',updateConsultation);
    router.delete('/:id',deleteConsultation);
};