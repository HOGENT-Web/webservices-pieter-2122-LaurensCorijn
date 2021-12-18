const Router = require('@koa/router');
const departmentService = require('../service/department');

const getAllDepartments = async (ctx) => {
    ctx.body = await departmentService.getAll();
};

const getDepartmentById = async (ctx) => {
    ctx.body = await departmentService.getById(ctx.params.id);
};

const createDepartment = async (ctx) => {
    const newDepartment = departmentService.create(ctx.request.body);
};

const updateDepartment = async (ctx) => {
    ctx.body = departmentService.updateById(ctx.params.id,ctx.request.body);
};

const deleteDepartment = async (ctx) => {
    departmentService.deleteById(ctx.params.id);
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