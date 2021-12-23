const Router = require('@koa/router');
const doctorService = require('../service/doctor');

const getAllDoctors = async (ctx) => {
    const limit = ctx.query.limit && Number(ctx.query.limit);
    const offset = ctx.query.offset && Number(ctx.query.offset);
    ctx.body = await doctorService.getAll(limit, offset);
};

const getDoctorById = async (ctx) => {
    ctx.body = await doctorService.getById(ctx.params.id);
};

const createDoctor = async (ctx) => {
    const newDoctor = await doctorService.create(ctx.request.body);
    ctx.body = newDoctor;
    ctx.status = 201;
};

const updateDoctor = async (ctx) => {
    ctx.body = await doctorService.updateById(ctx.params.id,ctx.request.body);
};

const deleteDoctor = async (ctx) => {
    await doctorService.deleteById(ctx.params.id);
    ctx.status = 204;
};

module.exports = (app) => {
    const router = new Router({
        prefix: '/doctors',
    });

    router.get('/',getAllDoctors);
    router.get('/:id',getDoctorById);
    router.post('/',createDoctor);
    router.put('/:id',updateDoctor);
    router.delete('/:id',deleteDoctor);

    app.use(router.routes()).use(router.allowedMethods());
}