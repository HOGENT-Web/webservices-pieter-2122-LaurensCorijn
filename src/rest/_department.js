const Router = require('@koa/router');
const departmentService = require('../service/department');

const getAllDepartments = async (ctx) => {
    const limit =  ctx.query.limit && Number(ctx.query.limit);
    const offset =  ctx.query.offset && Number(ctx.query.offset);
    ctx.body = await departmentService.getAll(limit, offset);
};

const getDepartmentById = async (ctx) => {
    ctx.body = await departmentService.getById(ctx.params.id);
};

const createDepartment = async (ctx) => {
    const newDepartment = await departmentService.create(ctx.request.body);
    ctx.body = newDepartment;
    ctx.status = 201;
};

const updateDepartment = async (ctx) => {
    ctx.body = await departmentService.updateById(ctx.params.id,ctx.request.body);
};

const deleteDepartment = async (ctx) => {
    await departmentService.deleteById(ctx.params.id);
    ctx.status = 204;
};

module.exports = (app) => {
    const router = new Router({
        prefix: '/departments',
    });

    router.get('/',getAllDepartments);
    router.get('/:id',getDepartmentById);
    router.post('/',createDepartment);
    router.put('/:id',updateDepartment);
    router.delete('/:id',deleteDepartment);

    app.use(router.routes()).use(router.allowedMethods());
}