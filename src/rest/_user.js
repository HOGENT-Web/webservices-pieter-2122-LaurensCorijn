const Router = require('@koa/router');
const userService = require('../service/user');
const { requireAuthentication, makeRequireRole } = require('../core/auth');
const Role = require('../core/roles');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Represents a user 
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       allOf:
 *         - $ref: "#/components/schemas/Base"
 *         - type: object
 *           required:
 *             - firstname
 *             - lastname
 *             - email
 *           properties:
 *             firstname:
 *               type: "string"
 *             lastname:
 *               type: "string"
 *             email:
 *               type: "string"
 *           example:
 *             $ref: "#/components/examples/User"
 *     UsersList:
 *       allOf:
 *         - $ref: "#/components/schemas/ListResponse"
 *         - type: object
 *           required:
 *             - data
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/User"
 *   examples:
 *     User:
 *       id: "7f28c5f9-d711-4cd6-ac15-d13d71abff02"
 *       firstname: "Jan"
 *       lastname: "Bergmans"
 *       email: "jan.bergmans@email.be"
 *   requestBodies:
 *     Login:
 *       description: The login info
 *       requered: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: 
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     Register:
 *       description: The user info to save.
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
 *               email:
 *                 type: string  
 *               password:
 *                 type: string 
 *     User:
 *       description: The user info to be edited
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
 */


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (paginated)
 *     security:
 *      - bearerAuth: []
 *     tags:
 *       - Users
 *     parameters:
 *       - $ref: "#/components/parameters/limitParam"
 *       - $ref: "#/components/parameters/offsetParam"
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UsersList"
 */
const getAllUsers = async(ctx) => {
    const users = await userService.getAll(
        ctx.query.limit && Number(ctx.query.limit),
        ctx.query.offset && Number(ctx.query.offset),
    );
    ctx.body = users;
};

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by a given id
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Users
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       200:
 *         description: User
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 */
const getUserById = async(ctx) => {
    const user = await userService.getById(ctx.params.id);
    ctx.body = user;
};

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a existing user
 *     security:
 *      - bearerAuth: []
 *     description: Updates a user.
 *     tags:
 *      - Users
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     requestBody:
 *       $ref: "#/components/requestBodies/User"
 *     responses:
 *       201:
 *         description: The edited user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 */
const updateUserById = async (ctx) => {
    const user = await userService.updateById(ctx.params.id,ctx.request.body);
    ctx.body = user;
    ctx.status = 201;
}

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by a given id
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Users
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       204:
 *         description: deleted user
 */
const deleteUserById = async (ctx) => {
    await userService.deleteById(ctx.params.id);
    ctx.status = 204;
};

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login in on account
 *     description: Logs in
 *     tags:
 *      - Users
 *     requestBody:
 *       $ref: "#/components/requestBodies/Login"
 *     responses:
 *       201:
 *         description: The jwt token and user
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 -$ref: "#/components/schemas/User"
 *                 -type : string   
 */
const login = async (ctx) => {
    const {email, password} = ctx.request.body;
    const session = await userService.login(email,password);
    ctx.body = session;
}

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a account
 *     description: Register a new account
 *     tags:
 *      - Users
 *     requestBody:
 *       $ref: "#/components/requestBodies/Register"
 *     responses:
 *       201:
 *         description: The jwt token and user
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 -$ref: "#/components/schemas/User"
 *                 -type : string 
 */
const register = async (ctx) => {
	const session = await userService.register(ctx.request.body);
	ctx.body = session;
};

module.exports = function installUsersRoutes(app) {
    const router = new Router({
        prefix: '/users',
    });

    const requireAdmin = makeRequireRole(Role.ADMIN);

    router.get('/', requireAuthentication, requireAdmin, getAllUsers);
    router.get('/:id', requireAuthentication,getUserById);
    router.put('/:id', requireAuthentication,updateUserById);
    router.delete('/:id', requireAuthentication, deleteUserById);
    router.post('/login', login);
    router.post('/register', register);
    
    app.use(router.routes())
        .use(router.allowedMethods());
};