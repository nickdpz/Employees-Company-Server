const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');
const passport = require('passport');
require('../../utils/auth/jwt');
const {
    deleteUserSchema,
    updateUserSchema,
    createUserSchema,
    listUsersSchema,
    searchUsersSchema,
    getUserSchema
} = require('../../utils/schemas/users');


const validationHandler = require('../../utils/middleware/validationHandler');
const usersValidationHandler = require('../../utils/middleware/usersValidationHandler');


//------ Nuevo usuario
router.post('/',
    passport.authenticate('jwt', { session: false }),
    usersValidationHandler('create:users'),
    validationHandler(createUserSchema),
    async (req, res) => {
        const { userName, name, lastName, email, password, phone, role } = req.body;
        try {
            console.log(req.user);
            const { companyId } = req.user;
            const info = await controller.addUser(userName, name, lastName, email, password, phone, role, companyId);
            response.success(req, res, info, 201);
        } catch (e) {
            if (e.code === 11000) {
                response.error(req, res, `${Object.keys(e.keyPattern)[0]} ya esta registrado`, e, 300);
            } else {
                response.error(req, res, 'Bad Request', e, 300);
            }
        }
    }
);

//------------Search User
router.get('/search',
    passport.authenticate('jwt', { session: false }),
    usersValidationHandler('get:users'),
    validationHandler(searchUsersSchema, 'query'),
    async (req, res) => {
        const { keyword, role } = req.query;
        try {
            const info = await controller.searchUsers(keyword, role);
            response.success(req, res, info, 200);
        } catch (e) {
            response.error(req, res, 'Internal error', e);
        }
    }
);

//-----Obtener los usuario
router.get('/get',
    passport.authenticate('jwt', { session: false }),
    usersValidationHandler('get:user'),
    async (req, res) => {
        //Aplica Query
        const filterUser = { _id: req.user._id };
        try {
            const userList = await controller.getUser(filterUser);
            response.success(req, res, userList, 200);
        } catch (e) {
            response.error(req, res, 'Internal error', e);
        }
    }
);

//-----Obtener los usuarios
router.get('/',
    validationHandler(listUsersSchema, 'query'),
    async (req, res) => {
        const filterUser = req.query || null;
        try {
            const userList = await controller.listUsers(filterUser);
            response.success(req, res, userList, 200);
        } catch (e) {
            response.error(req, res, 'Internal error', e);
        }
    }
);

router.get('/:_id',
    validationHandler(getUserSchema, 'params'),
    async (req, res) => {
        try {
            const user = await controller.getUser({ _id: req.params._id });
            response.success(req, res, user, 200);
        } catch (e) {
            response.error(req, res, 'Internal error', e);
        }
    }
);

//-----Eliminar los usuario
router.delete('/',
    passport.authenticate('jwt', { session: false }),
    usersValidationHandler('delete:user'),
    async (req, res) => {
        try {
            const id = req.user._id;
            await controller.deleteUser(id);
            response.success(req, res, `Usuario ${id} eliminado`, 200);
        } catch (e) {
            response.error(req, res, 'Internal error', e);
        }
    }
);

//-----Eliminar los usuario diferente
router.delete('/delete',
    passport.authenticate('jwt', { session: false }),
    usersValidationHandler('delete:users'),
    validationHandler(deleteUserSchema),
    async (req, res) => {
        try {
            const id = req.body._id;
            await controller.deleteUser(id);
            response.success(req, res, `Usuario ${id} eliminado`, 200);
        } catch (e) {
            response.error(req, res, 'Internal error', e);
        }
    }
);

//-----Actualizar un usuario
router.patch('/',
    passport.authenticate('jwt', { session: false }),
    usersValidationHandler('update:user'),
    validationHandler(updateUserSchema),
    async (req, res) => {
        try {
            const id = req.user._id;
            const { email, phone } = req.body;
            const info = await controller.updateUser(id, email, phone);
            response.success(req, res, info, 201);
        } catch (e) {
            response.error(req, res, e.message || 'Bad Request', e, e.code);
        }
    }
);

//-----Actualizar un usuarios
router.patch('/update',
    passport.authenticate('jwt', { session: false }),
    usersValidationHandler('update:users'),
    validationHandler(updateUserSchema),
    async (req, res) => {
        try {
            const { _id, email, phone } = req.body;
            const info = await controller.updateUser(_id, email, phone);
            response.success(req, res, info, 201);
        } catch (e) {
            response.error(req, res, 'Bad Request', e, 300);
        }
    }
);


module.exports = router;