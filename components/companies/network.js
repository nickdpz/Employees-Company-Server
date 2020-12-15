const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');
const passport = require('passport');

const {
    deleteCompanySchema,
    updateCompanySchema,
    createCompanySchema,
    getCompanySchema,
    listCompaniesSchema
} = require('../../utils/schemas/companies');


const validationHandler = require('../../utils/middleware/validationHandler');
const usersValidationHandler = require('../../utils/middleware/usersValidationHandler');

//------ Nuevo usuario
router.post('/',
    passport.authenticate('jwt', { session: false }),
    usersValidationHandler('create:company'),
    validationHandler(createCompanySchema),
    async (req, res) => {
        const { name, description, nit } = req.body;
        try {
            const info = await controller.addCompany(name, description, nit);
            response.success(req, res, info, 201);
        } catch (e) {
            response.error(req, res, 'Bad Request', e, 300);
        }
    }
);

//-----Obtener los usuario
router.get('/get',
    passport.authenticate('jwt', { session: false }),
    usersValidationHandler('get:company'),
    async (req, res) => {
        //Aplica Query
        const filterCompany = { _id: req.company._id };
        try {
            const companyList = await controller.getCompany(filterCompany);
            response.success(req, res, companyList, 200);
        } catch (e) {
            response.error(req, res, 'Internal error', e);
        }
    }
);

//-----Obtener los usuarios
router.get('/',
    passport.authenticate('jwt', { session: false }),
    usersValidationHandler('list:companies'),
    validationHandler(listCompaniesSchema, 'query'),
    async (req, res) => {
        //Aplica Query
        const filterCompany = req.query || null;
        try {
            const companyList = await controller.listCompanies(filterCompany);
            response.success(req, res, companyList, 200);
        } catch (e) {
            response.error(req, res, 'Internal error', e);
        }
    }
);

router.get('/:_id',
    passport.authenticate('jwt', { session: false }),
    usersValidationHandler('get:companies'),
    validationHandler(getCompanySchema, 'params'),
    async (req, res) => {
        try {
            const company = await controller.getCompany(req.params._id);
            response.success(req, res, company, 200);
        } catch (e) {
            response.error(req, res, 'Internal error', e);
        }
    }
);


//-----Eliminar los usuario diferente
router.delete('/delete',
    passport.authenticate('jwt', { session: false }),
    usersValidationHandler('delete:companies'),
    validationHandler(deleteCompanySchema),
    async (req, res) => {
        try {
            const id = req.body._id;
            await controller.deleteCompany(id);
            response.success(req, res, `Company ${id} delete`, 200);
        } catch (e) {
            response.error(req, res, 'Internal error', e);
        }
    }
);

//-----Actualizar un usuarios
router.patch('/update',
    passport.authenticate('jwt', { session: false }),
    usersValidationHandler('update:companies'),
    validationHandler(updateCompanySchema),
    async (req, res) => {
        try {
            const { _id, email, phone } = req.body;
            const info = await controller.updateCompany(_id, email, phone);
            response.success(req, res, info, 201);
        } catch (e) {
            response.error(req, res, e.message || 'Bad Request', e, e.code);
        }
    }
);


module.exports = router;