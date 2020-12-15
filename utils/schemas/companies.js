const joi = require('joi');

const companyIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const companyNitSchema = joi.string().max(30);
const companyNameSchema = joi.string().max(30);
const companyDescriptionSchema = joi.string().max(255);

const createCompanySchema = {
    name: companyNameSchema.required(),
    nit: companyNitSchema.required(),
    description: companyDescriptionSchema.required()
};

const listCompaniesSchema = {
    name: companyNameSchema,
    nit: companyNitSchema,
    _id: companyIdSchema
};

const updateCompanySchema = {
    nit: companyNitSchema,
    description: companyDescriptionSchema,
    _id: companyIdSchema.required()
};

const deleteCompanySchema = {
    _id: companyIdSchema.required()
};

const getCompanySchema = {
    _id: companyIdSchema.required()
};

module.exports = {
    deleteCompanySchema,
    updateCompanySchema,
    createCompanySchema,
    listCompaniesSchema,
    getCompanySchema
};